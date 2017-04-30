'use strict';

import { Event } from './Event';

export interface LoggerInterface {
  /**
   *
   * @param {Event|*} event
   * 
   * @returns {Promise<T>}
   */
  log(event : Event) : Promise<any>;
}
