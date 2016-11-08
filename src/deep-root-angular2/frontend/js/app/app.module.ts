import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RootAngular, DefaultRootAngular, routing } from './index';
import { DeepRouterService } from './services/deep-router.service';

const imports = [BrowserModule, routing].concat(DeepFramework.angularDependencies);

let providers = [
  DeepRouterService
];

if (DeepFramework.Kernel.isLocalhost) {
  providers.push({provide: LocationStrategy, useClass: HashLocationStrategy});
}

@NgModule({
    declarations: [
      RootAngular,
      DefaultRootAngular
    ],
    imports: imports,
    bootstrap: [RootAngular],
    providers: providers,
})
export class AppModule {}
