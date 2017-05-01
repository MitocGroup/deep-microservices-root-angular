import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({  
  template : '',
})
export class DefaultRootAngular {
  constructor(router : Router) {
    router.navigateByUrl('/');
  }
}
