
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './js/app/app.module';

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);


/**
let deepKernel = DeepFramework.Kernel;

interface Config {
  map: {},
  packages: {},
  meta: {},
  defaultJSExtensions?: string
}

class BootstrapHelper {
  _deepKernel: any = DeepFramework.Kernel;
  _deepAsset: any = this._deepKernel.get('asset');


  getBootstrapScripts(links) {
    let promises : Array<any> = [];
    let allProviders : Array<any> = [];
    let promise : any;

    for (let script of links) {
      promise = System.import(script)
        .then((modules) => {
          let finalProviders : Array<any> = [];

          for (let index in modules) {
            if (!modules.hasOwnProperty(index)) {
              continue;
            }

            finalProviders.push(modules[index]);
          }

          allProviders = allProviders.concat(finalProviders);
        });

      promises.push(promise);
    }

    return Promise.all(promises).then(() => {
      return allProviders;
    });
  }

  getSystemConfigs() {
    let promises : Array<any> = [];
    let promise : any;
    let links : any = this._getConfigLinks;
    let finalConfig : Config = {
      map: {},
      packages: {},
      meta: {},
      defaultJSExtensions: this._defaultJSExtensions,
    };

    for (let index in links) {
      if (!links.hasOwnProperty(index)) {
        continue;
      }

      promise = this._getConfig(index, links[index]).then((config : Config) => {

        Object.assign(finalConfig.map, config.map);
        Object.assign(finalConfig.packages, config.packages);
        Object.assign(finalConfig.meta, config.meta);
      });

      promises.push(promise);
    }

    return Promise.all(promises).then(() => {
      return finalConfig;
    });
  }


  _getConfig(microservice, configPath) {
    return System.import(configPath).then((exportData) => {
      let config : Config = exportData.config;

      for (let index in config.map) {
        if (!config.map.hasOwnProperty(index)) {
          continue;
        }
        
        config.map[index] = this._deepAsset.locate(`@${microservice}:${config.map[index]}`, '', true);
      }

      return config;
    }).catch((error) => {
      return error;
    });
  }

  get _getConfigLinks() {
    let links : any = {};
    let microservices : Array<string> = Object.keys(DeepFramework.Kernel.config.microservices);

    for (let microservice of microservices) {
      links[microservice] = this._deepAsset.locate(`@${microservice}:js/systemjs.config.js`);
    }

    return links;
  }


  get _defaultJSExtensions() {
    return 'js';
  }
}

deepKernel.bootstrap((kernel) => {
  let bootstrapScripts : Array<string> = deepKernel.get('deep_frontend_bootstrap_vector');
  let bootstrapHelper : BootstrapHelper = new BootstrapHelper();

  bootstrapHelper.getSystemConfigs().then((config) => {

    System.config(config);

    bootstrapHelper.getBootstrapScripts(bootstrapScripts).then((allProviders) => {
      let module;
      DeepFramework.angularDependencies = allProviders;

      System.import('js/app/app.module.js').then((angularModule) => {
        module = angularModule;

        return System.import('@angular/core');
      }).then((angularCore) => {
        if (deepKernel.env === 'stage' || deepKernel.env === 'prod') {
          angularCore.enableProdMode();
        }

        return System.import('@angular/platform-browser-dynamic');
      }).then((content) => {
        kernel.get('security').anonymousLogin(() => {
          content.platformBrowserDynamic().bootstrapModule(module.RootAngularModule);
        });
      });
    });
  });
});
 */