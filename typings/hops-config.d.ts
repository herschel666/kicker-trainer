declare module 'hops-config' {
  namespace config {
    export interface HopsConfig {
      /**
       * Whether to use https or not. Defaults to `false`
       */
      https: boolean;
      /**
       * Host name of your project. Defaults to `0.0.0.0`
       */
      host: string;
      /**
       * Port of your host. Defaults to `8080`
       */
      port: number;
      /**
       * One or more [application shell](https://developers.google.com/web/fundamentals/architecture/app-shell)
       * locations, e.g. `"/"` and/or `"/profile"`
       */
      locations: string[];
      /**
       * Root path of your application on the server. This is inserted as an
       * HTTP path prefix between `host` and `locations`. For example, if you
       * set e.g. `"basePath": "my-custom-basepath"` and `"location":
       * ["/profile"]`, then your application would be available at
       * `http://0.0.0.0:8080/my-custom-basepath/my-custom-location/`
       */
      basePath: string;
      /**
       * HTTP root path of your asset files on the server. It's not dependent on
       * `basePath`, you can define totally separate directories
       */
      assetPath: string;
      /**
       * [Browserslist](https://www.npmjs.com/package/browserslist) query.
       * Defaults to `"> 1%, last 2 versions, Firefox ESR"` (which is also the
       * Browserlist default query). It is used for Babel and PostCSS
       */
      browsers: string;
      /**
       * [Node target version](https://www.npmjs.com/package/babel-preset-env#targetsnode).
       * Defaults to current. It is used to specify the Node version which Babel should compile for
       */
      node: string;
      /**
       * Environment variables meant to be passed to
       * [webpack.EnvironmentPlugin](https://webpack.js.org/plugins/environment-plugin/),
       * i.e. made accessible to your app
       */
      envVars: { [key: string]: string };
      /**
       * One or more directories that Hops should use for module path
       * resolution. For example, you can specify a directory that holds a yet
       * unpublished Node.js package. It works similar to the
       * [resolve.modulesDirectories](http://webpack.github.io/docs/configuration.html#resolve-modulesdirectories)
       * field in Webpack, i.e. if you specify `moduleDirs: ["my-module-dir"]`,
       * it will look in `./my-module-dir`, `../my-module-dir`,
       * `../../my-module-dir` and so on
       */
      moduleDirs: string[];
      /**
       * Directory of your app. This way, you can put your app to a place other
       * than project root. Defaults to `"."`
       */
      appDir: string;
      /**
       * Directory where the build artifacts (i.e. your application/asset files)
       * will be saved to. Defaults to `"build"`. Hops always removes the
       * specified directory before starting a new build
       */
      buildDir: string;
      /**
       * Directory where internally used artifacts not meant to be served will
       * be output (e.g. the `manifest.json`/`manifest.js` files generated by
       * Webpack). Defaults to `"node_modules/.cache/hops"`
       */
      cacheDir: string;
      /**
       * Path to your Webpack build configuration file. Defaults to
       * `./node_modules/hops-config/configs/build.js`
       */
      buildConfig: string;
      /**
       * Path to your Webpack development configuration file. Defaults to
       * `./node_modules/hops-config/configs/develop.js`
       */
      developConfig: string;
      /**
       * Path to your Webpack node/server-side rendering configuration file.
       * Defaults to `./node_modules/hops-config/configs/node.js`
       */
      nodeConfig: string;
      /**
       * Path to a baseline configuration (could be for example a node module or
       * a project-specific file), allowing you join the current configuration
       * with that baseline
       */
      extends: string;
      /**
       * The application's `manifest.js` as a string. Defaults to a getter
       * function that returns the content of the automatically generated
       * `manifest.js`
       */
      manifest(): string;
      /**
       * The applications's `.js` and `.css` assets. Defaults to a getter
       * function that returns the assets contained in the automatically
       * generated `manifest.json`
       */
      assets(): {
        js: string[];
        css: string[];
      };
    }
  }

  const config: config.HopsConfig;
  export = config;
}
