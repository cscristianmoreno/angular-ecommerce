import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Menu } from './Components/Menu/Menu';

import { PageHome } from './Pages/Home/PageHome';
import { PageProducts } from './Pages/Products/PageProducts';
import { PageShopping } from './Pages/Shopping/PageShopping';


const routes: Routes = [
  { path: "", component: PageHome },
  { path: "products", component: PageProducts },
  { path: "shopping", component: PageShopping },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: "top"
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
