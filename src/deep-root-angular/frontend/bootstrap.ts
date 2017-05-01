const deepKernel = DeepFramework.Kernel;

deepKernel.bootstrap(() => {
  listApplicationModules().then(appModules => {
    DeepFramework.angularDependencies = appModules;

    System.import('./js/app/app.module').then(angularModule => {
      const angularCore = require('@angular/core');
      const platformBrowserDynamic = require('@angular/platform-browser-dynamic');

      if (deepKernel.env === 'stage' || deepKernel.env === 'prod') {
        angularCore.enableProdMode();
      }

      deepKernel.get('security').anonymousLogin(() => {
        platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(angularModule.AppModule);
      });
    });
  });
});

function listApplicationModules() {
  return System.import('./js/microservices').then(modulesObj => {
    const modulesArray = [];

    for (let key in modulesObj) {
      if (!modulesObj.hasOwnProperty(key)) {
        continue;
      }

      modulesArray.push(modulesObj[key]);
    }

    return modulesArray;
  });
}
