import { action, computed, observable, runInAction } from 'mobx';
import { Analytics } from './analytics';

interface PWAInstallPromptEvent extends Event {
  userChoice: Promise<{
    outcome: 'accepted';
  }>;
  prompt(): void;
}

const hasWindow = () => typeof window !== 'undefined';

export class PWAIntegration {
  @observable
  private installPrompt?: PWAInstallPromptEvent;

  private analytics: Analytics;

  constructor(analytics: Analytics) {
    this.analytics = analytics;
    if (hasWindow()) {
      // note: beforeinstallprompt not known in typescript
      (window as any).addEventListener(
        'beforeinstallprompt',
        (e: PWAInstallPromptEvent) => {
          e.preventDefault();
          this.analytics.track('allow installation', {
            event_category: 'install',
          });
          runInAction(() => {
            this.installPrompt = e;
          });
        }
      );
    }
  }

  @computed
  public get installable(): boolean {
    return Boolean(this.installPrompt);
  }

  @action
  public async install(): Promise<void> {
    if (this.installPrompt) {
      this.installPrompt.prompt();
      const choice = await this.installPrompt.userChoice;
      runInAction(() => {
        if (choice.outcome === 'accepted') {
          this.analytics.track('allow', {
            event_category: 'install',
          });

          window.addEventListener('appinstalled', () => {
            this.analytics.track('installed', {
              event_category: 'install',
            });
          });
        } else {
          this.analytics.track('reject', {
            event_category: 'install',
          });
        }
        this.installPrompt = undefined;
      });
    }
  }
}
