import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Details } from './details/details';
import { Enquiry } from './enquiry/enquiry';

export const routes: Routes = [
    {
    path: '',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Home details',
  },
  {
    path:'contact',
    component:Enquiry,
    title:'Contact us'

  }
];
