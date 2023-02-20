import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { PhotosService, ServiceService } from "../Service/service.service";

import { categoryStruct, productsStruct } from "../interfaceStruct/interfaceStruct";

import { CookieService } from "ngx-cookie-service";

import { of } from "rxjs"

import products from "src/products";
import { ProductsServices } from "../Service/products.service";

const CATEGORY: Array<categoryStruct> = [
    { title: "Todo", icon: "fa-border-all", category: "" },
    { title: "Remeras", icon: "fa-tshirt", category: "shirt" },
    { title: "Pantalón", icon: "fa-bacon", category: "pant" },
    { title: "Mochilas", icon: "fa-toolbox", category: "backpack" },
    { title: "Zapatillas", icon: "fa-shoe-prints", category: "footwear" },
    { title: "Conjuntos", icon: "fa-vest", category: "set" },
    { title: "Gorras", icon: "fa-hat-cowboy", category: "cap" },
    { title: "Teléfonos", icon: "fa-mobile", category: "phone" },
    { title: "Valijas", icon: "fa-suitcase-rolling", category: "luggage" },
    { title: "Gafas", icon: "fa-glasses", category: "glasses" },
    { title: "Televisores", icon: "fa-tv", category: "tv" },
    { title: "Ofertas", icon: "fa-tag", category: "+" },
]

const FILTER_CATEGORY = 0;
const FILTER_ITEM = 1;

@Component({
    selector: "Products",
    templateUrl: "./Products.html",
    styleUrls: [
        "./Products.css"
    ],
    providers: [CookieService],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Products implements AfterViewInit {

    public products: productsStruct[] = [];
    public category: categoryStruct[] = [];
    public categoryCollection: Number[] = [];
    public categorySelected:number = 0;
    public productsSelected: productsStruct[] = [];

    constructor(private productsService: ProductsServices, private changes: ChangeDetectorRef) {
        // this.cookies.set("Prueba", "1SLDJKLDJ1231231283908SD90W");
    }

    public ngAfterViewInit() {
        this.category = CATEGORY;
        this.products = products.items;
        this.categoryCollection = this.categoryNumbers();

        this.productsService.productUpdated$.subscribe((products) => {
            this.productsSelected = products;
            // console.log(products);
        })

        this.changes.detectChanges();
    }

    public transformPrice(price: number) {
        return new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD"}).format(price);
    }

    public handleClickCategory(category: string, selected: number) {
        this.categorySelected = selected;
        this.itemFilter(category, FILTER_CATEGORY);
    }

    public handleChangeInput(event: any) {
        // if (event.target.value.length === 0) {
        //     return;
        // }

        this.itemFilter(event.target.value, FILTER_ITEM);
        // console.log(event.target.value);
    }

    public itemFilter(filter: string, type: number) {
        filter = filter.replace("/\s/g", "");
        this.products = products.items;
        let items!: productsStruct[];

        if (type == FILTER_CATEGORY) {
            items = this.products.filter((str) => str.category.includes(filter));
        }
        else {
            items = this.products.filter((str) => str.title.toLowerCase().includes(filter.toLowerCase()));
            this.categorySelected = 0;
        }

        this.products = items;
    }

    public categoryNumbers() {
        let numbers: Number[] = [];
            
        this.productsService.productsRandom.map((str) => {
            this.products[str.id - 1].category += "+";  
        })
        
        
        CATEGORY.map((str: any) => {
            numbers.push(this.products.filter((item) => item.category.includes(str.category)).length);
        })

        return numbers;
    }

    public handleButtonClick(item: productsStruct) {
        let product: productsStruct = {...item};

        const offert = this.productsService.checkItemOffert(product);

        if (offert.filter !== -1) {
            product.price = product.price - (product.price * (offert.offer / 100));
        }

        this.productsService.addProduct(product);
    }

    public checkItemExist(item: number) {
        const items = this.productsSelected.findIndex((str) => str.id === item);
        return items;
    }

    public checkItemOffert(item: productsStruct) {
        return this.productsService.checkItemOffert(item);
    }

}