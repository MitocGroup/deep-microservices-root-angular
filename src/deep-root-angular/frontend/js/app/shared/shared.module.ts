import { NgModule } from '@angular/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { DeepRouterLinkDirective } from '../directives/deep-router-link.directive';
import { DeepNotificationsComponent } from '../components/deep-notifications/deep-notifications.component';

@NgModule({
  imports: [
    SimpleNotificationsModule
  ],
  exports: [
    DeepRouterLinkDirective,
    DeepNotificationsComponent
  ],
  declarations: [
    DeepRouterLinkDirective,
    DeepNotificationsComponent
  ]
})
export class RootSharedModule {}
