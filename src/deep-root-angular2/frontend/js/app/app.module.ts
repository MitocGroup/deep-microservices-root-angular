import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RootAngular, DefaultRootAngular, routing } from './index';

const imports = [BrowserModule, routing].concat(DeepFramework.angularDependencies);

let providers = [];

if (DeepFramework.Kernel.isLocalhost) {
  providers.push({provide: LocationStrategy, useClass: HashLocationStrategy});
}

@NgModule({
    declarations: [RootAngular, DefaultRootAngular],
    imports: imports,
    bootstrap: [RootAngular],
    providers: providers,
})
export class AppModule {}