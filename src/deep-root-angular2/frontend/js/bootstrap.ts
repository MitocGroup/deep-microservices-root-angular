import { bootstrap } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RootAngular } from './app/index';

let deepKernel = DeepFramework.Kernel;

deepKernel.bootstrap(() => {
  let bootstrapScripts : Array<string> = deepKernel.get('deep_frontend_bootstrap_vector');
  let promises : Array<any> = [];
  let allProviders : Array<any>= [];

  for (let script of bootstrapScripts) {
    promises.push(System.import(script).then((providers) => {
      let finalProviders : Array<any> = [];
      for (let index in providers) {
        if (!providers.hasOwnProperty(index)) {
          continue;
        }

        finalProviders.push(providers[index]);
      }

      allProviders = allProviders.concat(finalProviders);
    }));
  }

  Promise.all(promises).then(() => {
    if (DeepFramework.Kernel.isLocalhost) {
      allProviders.push({
        provide: LocationStrategy,
        useClass: HashLocationStrategy
      });
    }

    bootstrap(RootAngular, allProviders)
  })
});
