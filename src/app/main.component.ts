import { Component, OnInit, Input } from "@angular/core";

import { CookieService } from "ngx-cookie-service";

import products from "src/products";
import { productsStruct } from "./Components/interfaceStruct/interfaceStruct";

@Component({
    selector: "main-selector",
    templateUrl: "main.component.html",
    styleUrls: [
        "./main.component.css"
    ]
})

export class Main implements OnInit {
    products:Array<any> = [];

    randomNumber: Number[] = [];
   
    constructor(private cookies: CookieService) {

    }

    public ngOnInit() {
        // const time = Date.now() + ((Math.floor(Math.random() * 86400) + 3600) * 1000);

        // let num = 0;

        // let productsRandom: productsStruct[] = [];
        // let offertRandom: Number[] = [];

        // let max = Math.floor(Math.random() * 15) + 1;

        // while (num < max) {
        //     const random = Math.floor(Math.random() * products.items.length);
        //     const offert = Math.floor(Math.random() * 70) + 5;
            
        //     productsRandom.push(products.items[random]);
        //     offertRandom.push(offert);
        //     num++;
        // }


        // if (!this.cookies.get("offer_time").length) {
        //     this.cookies.set("offer_time", `${time}`);
        // }

        // if (!this.cookies.get("offer_products").length) {
        //     this.cookies.set("offer_products", JSON.stringify(productsRandom));
        // }

        // if (!this.cookies.get("offer_products_offer").length) {
        //     this.cookies.set("offer_products_offer", JSON.stringify(offertRandom));
        // }
    }


}