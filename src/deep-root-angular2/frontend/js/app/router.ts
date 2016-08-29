import { Routes, RouterModule } from '@angular/router';
import { DefaultRootAngular } from './components/index';

const routers : Routes = [{
  path: 'default-root-angular-path', component: DefaultRootAngular,

}];

export const routing = RouterModule.forRoot(routers);