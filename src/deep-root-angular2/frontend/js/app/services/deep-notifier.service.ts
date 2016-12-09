/**
 * Created by mgoria on 12/09/16.
 */

import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class DeepNotifierService {
  /**
   * @param {NotificationsService} notifier
   */
  constructor(private notifier: NotificationsService) {}

  /**
   * @param {String} title
   * @param {String} message
   * @param {*} options
   */
  info(title, message, options = null) {
    this.notifier.info(title, message, options);
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {*} options
   */
  error(title, message, options = null) {
    this.notifier.error(title, message, options);
  }
}