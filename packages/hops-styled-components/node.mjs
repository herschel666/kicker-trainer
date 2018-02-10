import React from 'react';
import { Helmet } from 'react-helmet';
import { combineContexts, ReactContext } from 'hops-react';
import defaultTemplate from 'hops-react/lib/template';
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from 'styled-components';

export class StyledComponentsContext {
  constructor(options = {}) {
    this.theme = options.theme || {};
    this.template = options.template || defaultTemplate;
    this.sheet = new ServerStyleSheet();
  }

  enhanceElement(reactElement) {
    return React.createElement(
      StyleSheetManager,
      { sheet: this.sheet.instance },
      React.createElement(ThemeProvider, { theme: this.theme }, reactElement),
    );
  }

  renderTemplate(templateData) {
    const styles = this.sheet.getStyleTags();
    const helmet = Helmet.renderStatic();
    const helmetStyles = helmet.style.toString();
    helmet.style.toString = () => helmetStyles + styles;
    return this.template(Object.assign({ helmet }, templateData));
  }
}

export const contextDefinition = StyledComponentsContext;
export const createContext = combineContexts(
  ReactContext,
  StyledComponentsContext,
);
