'use strict';

import { Injectable } from '@angular/core';
import { Event } from './deep-event/Event';
import { LoggerInterface } from './deep-event/LoggerInterface';

@Injectable()
export class DeepEventService implements LoggerInterface {
  readonly deepEvent: any = DeepFramework.Kernel.get('event');
  
  constructor () {
    if (!this.deepEvent) {
      console.warn('DeepFramework missing or misconfigured event service');
    }
  }
  
  /**
   *
   * @returns {Event|*}
   */
  event(name, data : any = {}, context : any = {}) : Event {
    return new Event(name, data, context).setLogger(this);
  }
  
  /**
   *
   * @param {Event|*} event
   * 
   * @returns {Promise<T>}
   */
  log(event : Event) : Promise<any> {
    { name, data, context } = event.toObject();
    
    return this._log(name, data, context);
  }
  
  /**
   *
   * @param {String} name 
   * @param {*} data 
   * @param {*} context 
   * 
   * @returns {Promise<T>}
   */
  _log(name : string, data : any, context : any) : Promise<any> {
    return this.deepEvent 
      ? this.deepEvent.log(name, data, context) 
      : Promise.resolve();
  }
}
  