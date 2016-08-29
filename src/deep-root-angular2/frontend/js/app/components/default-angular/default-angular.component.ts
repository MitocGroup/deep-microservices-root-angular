import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  template : '',
})
export class DefaultRootAngular {
  constructor(router : Router) {
    router.navigateByUrl('/');
  }
}
