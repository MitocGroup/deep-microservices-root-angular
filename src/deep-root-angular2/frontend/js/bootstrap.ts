import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

let deepKernel = DeepFramework.Kernel;

deepKernel.bootstrap(() => {
  let bootstrapScripts : Array<string> = deepKernel.get('deep_frontend_bootstrap_vector');
  let promises : Array<any> = [];
  let allProviders : Array<any> = [];
  let promise : any;

  for (let script of bootstrapScripts) {
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

  Promise.all(promises).then(() => {
    DeepFramework.angularDependencies = allProviders;

    System.import('app/app.module.js').then((module) => {
      platformBrowserDynamic().bootstrapModule(module.RootAngularModule);
    });
  })
});