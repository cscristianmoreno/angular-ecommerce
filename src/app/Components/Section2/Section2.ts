import { Component } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

import products from "src/products";
import { productsStruct } from "../interfaceStruct/interfaceStruct";

@Component({
    selector: "Section2",
    templateUrl: "Section2.html",
    styleUrls: [
        "Section2.css"
    ]
})

export class Section2 {
    public collection: Array<any> = [];
    public positions: Array<any> = []; 
    
    public day: number = 0;
    public minute: number = 0;
    public hour: number = 0;
    public second: number = 0;
    
    constructor(private cookies: CookieService) {
        this.getTimer();
    }

    public getTimer() {
        
        const cookies = this.cookies;
        let seconds = parseInt(cookies.get("offer_time"));
        const time = seconds - Date.now() + 1000;

        if (time <= 0 || isNaN(time)) {
            seconds = this.getCookies();
            this.getTimer();
            return;
        }

        let day, hour, minute, second;


        day = ((time / (86400 * 1000)) % 7).toString();
        hour = ((time / (3600 * 1000)) % 24).toString();
        minute = ((time / (60 * 1000)) % 60).toString();
        second = ((time % (60 * 1000)) / 1000).toString();

        this.day = parseInt(day);
        this.hour = parseInt(hour);
        this.minute = parseInt(minute);
        this.second = parseInt(second);

        // console.log(time);

        // return `${parseInt(day.toString())}, ${parseInt(hour.toString())}, ${parseInt(minute.toString())} ${parseInt(second.toString())}`

        setTimeout(() => {
            this.getTimer();
        }, 1000);
    }

    public getCookies() {
        const time = Date.now() + ((Math.floor(Math.random() * 3600) + 3600) * 1000);
        // const time = Date.now() + 10000;

        let num = 0;

        let productsRandom: productsStruct[] = [];
        let offertRandom: Number[] = [];

        let max = Math.floor(Math.random() * 15) + 1;

        while (num < max) {
            const random = Math.floor(Math.random() * products.items.length);
            const offert = Math.floor(Math.random() * 85) + 5;

            products.items[random].category += "+";
            
            productsRandom.push(products.items[random]);
            offertRandom.push(offert);
            num++;
        }

        // console.log(productsRandom);
        
        this.cookies.set("offer_time", `${time}`);
        this.cookies.set("offer_products", JSON.stringify(productsRandom));

        this.cookies.set("offer_products_offer", JSON.stringify(offertRandom));

        location.reload();

        return time;
    }

}