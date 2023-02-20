import { Injectable, Input } from "@angular/core";

import { CookieService } from "ngx-cookie-service";
import { productsStruct } from "../interfaceStruct/interfaceStruct";

import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ProductsServices {
    private products = new BehaviorSubject<productsStruct[]>([]);
    public productUpdated$ = this.products.asObservable();

    public productsRandom: productsStruct[] = [];
    public productsOffer: number[] = [];

    public cookie: any;

    constructor(private cookies: CookieService) {
        if (Object.keys(cookies.getAll()).length < 3) {
            // console.log(cookies.getAll());
            return;
        }

        // console.log(JSON.parse(cookies.get("offer_products")));

        if (cookies.check("product")) {
            this.products.next(JSON.parse(cookies.get("product")));
        }
        
        this.productsRandom = JSON.parse(cookies.get("offer_products"));
        this.productsOffer = JSON.parse(cookies.get("offer_products_offer"));
    }

    public addProduct(item: productsStruct) {
        const exists = this.products.value.find((str: productsStruct) => str.id === item.id);

        if (exists) {
            return;
        }
        
        this.products.next([...this.products.value, item]);
        this.cookies.set("product", JSON.stringify(this.products.value));
    }

    public removeProduct(item: number) {
        const id = this.products.value[item].id;
        const element = this.products.value.filter((str) => str.id !== id);
        // console.log(element);
        
        this.products.next(element);
        this.cookies.set("product", JSON.stringify(this.products.value));
    }

    public removeAllProducts() {
        if (!this.products.value.length) {
            return;
        }

        this.products.next([]);
        this.cookies.set("product", JSON.stringify(this.products.value));
    }

    public checkItemOffert(item: productsStruct) {
        let filter = this.productsRandom.findIndex((str, index) => str.id === item.id);

        return {
            filter: filter,
            offer: this.productsOffer[filter]
        };
    }
}