/**
 * Created by mgoria on 10/31/16.
 */

import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class DeepRouterService {
  /**
   * @param {Router} router
   */
  constructor(private router: Router) {}

  /**
   * @param {string[]} msIdentifier
   * @param {string[]} commands
   * @param {any} extras
   * @returns {Promise<boolean>}
   */
  navigate(msIdentifier: string, commands: string[], extras?: any): Promise<boolean> {
    if (!this.isValidMs(msIdentifier)) {
      throw new Error(`Invalid microservice identifier "${msIdentifier}".`);
    }

    return this.router.navigate(
      [
        DeepRouterService.getAppBasePath(),
        DeepRouterService.getRoutePrefix(msIdentifier)
      ].concat(commands),
      extras
    );
  }

  /**
   * @param {String} url
   * @returns {Promise<boolean>}
   */
  navigateByUrl(url: string): Promise<boolean> {
    // @todo - check if we have to change smth.
    return this.router.navigateByUrl(url);
  }

  /**
   * @param {String} msIdentifier
   * @returns {String}
   */
  static getRoutePrefix(msIdentifier: string): string {
    return DeepFramework.Kernel.config.microservices[msIdentifier].parameters.moduleRoutePrefix;
  }

  /**
   * @returns {String}
   */
  static getAppBasePath(): string {
    return DeepFramework.Kernel.config.globals.basePath || '/';
  }

  /**
   * @param {string} msIdentifier
   * @returns {boolean}
   */
  private isValidMs(msIdentifier: string): boolean {
    return DeepFramework.Kernel.config.microservices.hasOwnProperty(msIdentifier);
  }
}