import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RootAngular, DefaultRootAngular, routing } from './index';
import { DeepRouterService } from './services/deep-router.service';
import { DeepEventService } from './services/deep-event.service';
import { DeepNotifierService } from './services/deep-notifier.service';

const imports = [
  BrowserModule,
  SimpleNotificationsModule.forRoot(),
  routing
].concat(DeepFramework.angularDependencies);

let providers : Array<any> = [
  DeepRouterService,
  DeepNotifierService,
  DeepEventService,
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
