import { NgModule } from '@angular/core';
import { DeepRouterLinkDirective } from '../directives/deep-router-link.directive';

@NgModule({
  declarations: [
    DeepRouterLinkDirective
  ],
  exports: [
    DeepRouterLinkDirective
  ]
})
export class RootSharedModule {}
