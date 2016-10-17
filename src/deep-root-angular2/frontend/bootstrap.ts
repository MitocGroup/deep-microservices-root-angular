const deepKernel = DeepFramework.Kernel;

deepKernel.bootstrap(() => {
  listApplicationModules().then(appModules => {
    DeepFramework.angularDependencies = appModules;

    require.ensure([], require => {
      const angularModule = require('./js/app/app.module');
      const angularCore = require('@angular/core');
      const platformBrowserDynamic = require('@angular/platform-browser-dynamic');

      if (deepKernel.env === 'stage' || deepKernel.env === 'prod') {
        angularCore.enableProdMode();
      }

      platformBrowserDynamic.platformBrowserDynamic().bootstrapModule(angularModule.AppModule);
    });
  });
});

function listApplicationModules() {
  return new Promise(resolve => {
    require.ensure([], require => {
      const modulesObj = require('./js/microservices');
      const modulesArray = [];

      for (let key in modulesObj) {
        if (!modulesObj.hasOwnProperty(key)) {
          continue;
        }

        modulesArray.push(modulesObj[key]);
      }

      resolve(modulesArray);
    });
  });
}
