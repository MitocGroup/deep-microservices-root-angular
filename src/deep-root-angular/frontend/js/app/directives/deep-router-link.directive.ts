/**
 * Created by mgoria on 10/31/16.
 */

import { Directive, Input, HostListener } from '@angular/core';
import { DeepRouterService } from '../services/index';

@Directive({
  selector: '[deepRouterLink]'
})
export class DeepRouterLinkDirective {
  @Input('deepRouterLink') routeParts: string[];

  /**
   * @param {DeepRouterService} deepRouter
   */
  constructor(private deepRouter: DeepRouterService) {}

  @HostListener('click') onClick() {
    if (this.routeParts.length < 2) {
      throw new Error('Invalid directive input value. Expected format is ["<ms_identifier>", "<route>"]');
    }

    let clonedParts = [].concat(this.routeParts);
    let msIdentifier = clonedParts.shift();

    this.deepRouter.navigate(msIdentifier, clonedParts);
  }
}