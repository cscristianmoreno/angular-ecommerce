import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

import { collectionStruct, productsStruct } from '../interfaceStruct/interfaceStruct';

import products from 'src/products';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  constructor(private http: HttpClient) { }

  public getCollection() {
    const images = [];
    let num:number = 0;

    let numbers:Array<any> = [];

    while (num < 25) {
      const random_num = Math.floor(Math.random() * 250);
      
      if (numbers.includes(random_num)) {
          continue;
      }
      
      const URL = "https://picsum.photos/200/300?random=" + random_num;
      images.push(URL);
      numbers.push(random_num);

      num++;
    }

    
    return images;
  }
}

@Injectable({providedIn: "root"})

export class PhotosService {
  constructor(private http: HttpClient) { }

  public getImages() {
    const URL = "https://dummyjson.com/products"

    const response = this.http.get(URL);

    return response;
  }

  public getProducts() {
    const productsShop: Array<productsStruct> = products.items;
    return productsShop;
  }
}

