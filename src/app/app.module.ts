import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { Main } from './main.component';

import { Header } from './Components/Header/Header';
import { SectionNumber } from './Components/SectionNumber/SectionNumber';
import { Section1 } from './Components/Section1/Section1';
import { Section2 } from './Components/Section2/Section2';
import { HttpClientModule } from '@angular/common/http';
import { Products } from './Components/Products/Products';
import { Section4 } from './Components/Section4/Section4';
import { Section3 } from './Components/Section3/Section3';
import { Section5 } from './Components/Section5/Section5';
import { Footer } from './Components/Footer/Footer';
import { Menu } from './Components/Menu/Menu';
import { Shopping } from './Components/Shopping/Shopping';

import { PageHome } from './Pages/Home/PageHome';
import { PageProducts } from './Pages/Products/PageProducts';
import { CookieService } from 'ngx-cookie-service';
import { PageShopping } from './Pages/Shopping/PageShopping';

@NgModule({
  declarations: [
    Main,
    Menu,
    Header,
    SectionNumber,
    Section1,
    Section2,
    Products,
    Section3,
    Section4,
    Section5,
    Footer,
    PageHome,
    Shopping,
    PageProducts,
    PageShopping
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [Main]
})

export class AppModule { }
