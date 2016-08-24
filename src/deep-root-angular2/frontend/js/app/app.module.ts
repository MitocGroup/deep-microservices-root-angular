import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { RootAngular } from './index';

const imports = [BrowserModule].concat(DeepFramework.angularDependencies);

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