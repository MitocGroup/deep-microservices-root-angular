/**
 * Created by mgoria on 12/09/16.
 */

import { Injectable, EventEmitter } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

interface MsgLayout {
  type: string,
  title: string,
  message: string,
  options: any,
}

@Injectable()
export class DeepNotifierService {
  private deepLogger: any = null;
  private notifications: any[] = [];
  private ready: boolean = false;

  /**
   * @param {NotificationsService} notifier
   */
  constructor(private notifier: NotificationsService) {
    this.deepLogger = DeepFramework.Kernel.has('log') ?
      DeepFramework.Kernel.get('log') :
      null;
  }

  setAsReady() {
    this.ready = true;
    this.showDelayedNotifications();
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {*} options
   */
  success(title, message, options = null) {
    this.notifications.push({
      type: 'success',
      title: title,
      message: message,
      options: options,
    });

    if (this.ready) {
      this.showDelayedNotifications();
    }
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {*} options
   */
  error(title, message, options = null) {
    this.notifications.push({
      type: 'error',
      title: title,
      message: message,
      options: options,
    });

    if (this.ready) {
      this.showDelayedNotifications();
    }
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {*} options
   */
  alert(title, message, options = null) {
    this.notifications.push({
      type: 'alert',
      title: title,
      message: message,
      options: options,
    });

    if (this.ready) {
      this.showDelayedNotifications();
    }
  }

  /**
   * @param {String} title
   * @param {String} message
   * @param {*} options
   */
  info(title, message, options = null) {
    this.notifications.push({
      type: 'info',
      title: title,
      message: message,
      options: options,
    });

    if (this.ready) {
      this.showDelayedNotifications();
    }
  }

  private showDelayedNotifications() {
    this.notifications
      .forEach((msg: MsgLayout, index, object) => {
        msg.options = msg.options || [];

        this.callRightMethod(msg);
        object.splice(index, 1);
      });
  }

  private callRightMethod(msg: MsgLayout) {
    if (!msg) {
      return;
    }

    if (msg.type === 'error' || msg.type === 'alert') {
      if (this.deepLogger) {
        this.deepLogger.err(`${msg.title}. ${msg.message}`);
      }
    }

    this.notifier[msg.type](
      msg.title, 
      msg.message, 
      msg.options
    );
  }

}


