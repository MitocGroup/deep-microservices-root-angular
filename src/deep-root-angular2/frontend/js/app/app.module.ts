import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RootAngular, routing } from './index';

const imports = [BrowserModule, routing].concat(DeepFramework.angularDependencies);

let providers = [];

if (DeepFramework.Kernel.isLocalhost) {
  providers.push({provide: LocationStrategy, useClass: HashLocationStrategy});
}

@NgModule({
  declarations: [RootAngular],
  imports: imports,
  bootstrap: [RootAngular],
  providers: providers,
})
export class RootAngularModule {}