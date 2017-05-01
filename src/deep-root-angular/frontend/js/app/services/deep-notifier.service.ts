/**
 * Created by mgoria on 12/09/16.
 */

import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class DeepNotifierService {
  private deepLogger : any = null;

  /**
   * @param {NotificationsService} notifier
   */
  constructor(private notifier: NotificationsService) {
    this.deepLogger = DeepFramework.Kernel.has('log') ?
      DeepFramework.Kernel.get('log') :
      null;
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {*} options
   */
  success(title, message, options = null) {
    this.notifier.success(title, message, options);
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {*} options
   */
  error(title, message, options = null) {
    this.notifier.error(title, message, options);

    if (this.deepLogger) {
      this.deepLogger.err(`${title}. ${message}`);
    }
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {*} options
   */
  alert(title, message, options = null) {
    this.notifier.error(title, message, options);

    if (this.deepLogger) {
      this.deepLogger.err(`${title}. ${message}`);
    }
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {*} options
   */
  info(title, message, options = null) {
    this.notifier.info(title, message, options);
  }
}