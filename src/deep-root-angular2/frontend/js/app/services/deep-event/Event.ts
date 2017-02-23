'use strict';

import { LoggerInterface } from './LoggerInterface';

export class Event {
  private _name: string;
  private _data: any;
  private _context: any;
  private _logger: LoggerInterface;
  
  /**
   *
   * @param {String} name
   * @param {*} data
   * @param {*} context
   */
  constructor(name: string, data?: any = {}, context?: any = {}) {
    this._name = name;
    this._data = data;
    this._context = context;s
  }
  
  /**
   *
   * @param {LoggerInterface|*} logger
   *
   * @returns {Event|*}
   */
  setLogger(logger : LoggerInterface) : Event {
    this._logger = logger;
    
    return this;
  }
  
  /**
   *
   * @returns {*}
   */
  toObject() : any {
    { name, data, context } = this;
    
    return { name, data, context };
  }
  
  /**
   *
   * @returns {Promise<T>}
   */
  log() : Promise<any> {
    return this._logger 
      ? this._logger.log(this) 
      : Promise.reject(new Error('Event logger is not set up'));
  }
  
  /**
   *
   * @returns {LoggerInterface|*}
   */
  get logger() : LoggerInterface {
    return this._logger;
  }
  
  /**
   *
   * @returns {String}
   */
  get name() : string {
    return this._name;
  }
  
  /**
   *
   * @returns {*}
   */
  get data() : any {
    return this._data;
  }
  
  /**
   *
   * @returns {*}
   */
  get context() : any {
    return this._context;
  }
}
