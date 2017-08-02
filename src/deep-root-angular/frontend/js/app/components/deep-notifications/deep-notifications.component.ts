import { DeepNotifierService } from './../../services/deep-notifier.service';
import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'deep-notifications',
  template : '<simple-notifications [options]="options"></simple-notifications>',
})
export class DeepNotificationsComponent implements AfterViewInit {
  constructor(private notifierService: DeepNotifierService) {}
  @Input() protected options: any = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 7,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: 'scale',
    position: ['right', 'bottom']
  };

  ngAfterViewInit() {
    this.notifierService.setAsReady();
  }

}