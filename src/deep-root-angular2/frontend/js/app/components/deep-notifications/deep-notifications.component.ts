import { Component, Input } from '@angular/core';

@Component({
  template : '<simple-notifications [options]="options"></simple-notifications>',
})
export class DeepNotificationsComponent {
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
}