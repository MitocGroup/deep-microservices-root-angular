import { bootstrap } from '@angular/platform-browser-dynamic';
import { RootAngular } from './app/index';

declare let DeepFramework : any;
declare let System : any;

let deepKernel = DeepFramework.Kernel;

deepKernel.bootstrap(() => {
  let bootstrapScripts : Array<string> = deepKernel.get('deep_frontend_bootstrap_vector');
  let promises : Array<any> = [];
  let allProviders : Array<any>= [];

  for (let script of bootstrapScripts) {
    promises.push(Promise.resolve(System.import(script)).then((providers) => {
      let finalProviders : Array<string> = [];
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
    bootstrap(RootAngular, allProviders)
  })
});
