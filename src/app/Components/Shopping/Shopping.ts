import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { productsStruct } from "../interfaceStruct/interfaceStruct";

import { ProductsServices } from "../Service/products.service";

@Component({
    selector: "Shopping",
    templateUrl: "./Shopping.html",
    styleUrls: [
        "./Shopping.css"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Shopping {
    public productsSaved: productsStruct[] = [];
    public productsAmount: number[] = [];
    public productsPrice: number[] = [];

    constructor(private products: ProductsServices, private changes: ChangeDetectorRef) {
    }

    public transformPrice(value: number) {
        return new Intl.NumberFormat("de-DE", { style: "currency", currency: "USD"}).format(value);
    }

    public ngAfterViewInit() {
        this.products.productUpdated$.subscribe((products) => {
            this.productsSaved = products;

            if (!this.productsAmount.length) {
                this.productsAmount = [...Array(products.length)];
                this.productsAmount.fill(1);
            }

            products.map((str) => {
                this.productsPrice.push(str.price);
            })

            // console.log(this.productsPrice);

            // console.log(products);
            this.changes.detectChanges();
        })
    }

    public productAmount(i: number, type: string) {

        switch(type) {
            case '+': {
                this.productsAmount[i]++;
                break;
            }
            case '-': {
                if (this.productsAmount[i] <= 1) {
                    return;
                }

                this.productsAmount[i]--;
                break;
            }
        }

        // console.log(this.productsSaved[i]);
        // console.log(this.productAmount);
        this.productsPrice[i] = this.productsSaved[i].price * this.productsAmount[i];
    }

    public removeProduct(item: number) {
        // this.changes.detach();
        this.products.removeProduct(item);
        this.productsAmount.splice(item, 1);
        this.changes.detectChanges();
    }

    public productPrice() {
        let price = 0;

        this.productsSaved.map((str, num) => {
            price += str.price * this.productsAmount[num];
        })
        
        return this.transformPrice(price);
    }

    public productPayment() {

        let payment = 0;
         
        if (this.productsAmount.length) {
            payment = this.productsAmount.reduce((a, b) => a + b)
        }

        // this.changes.detectChanges();

        return payment;
    }

    public removeAllProducts() {
        this.productsAmount.length = 0;
        this.products.removeAllProducts();
    }
}