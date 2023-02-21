import { Component, ViewChildren, OnInit, Renderer2, AfterViewInit, ElementRef,  } from "@angular/core";
import products from "src/products";
import { ObserverService } from "../Service/observer.service";

@Component({
    selector: "Section1",
    templateUrl: "./Section1.html",
    styleUrls: [
        "./Section1.css"
    ]
})

export class Section1 implements OnInit {
    public items:Array<any> = [];

    @ViewChildren("idImage") idImage!: ElementRef;
    @ViewChildren("idTitle") idTitle!: ElementRef;
    @ViewChildren("idObservable ") idObservable !: ElementRef;

    constructor(private renderer2: Renderer2, private observer: ObserverService) {
        // this.idImage = null;
        // console.log(products);
        // console.log(this.image);
    }

    public ngAfterViewInit() {
        // const image = this.idImage;
        
        const arrayImages:Array<any> = []; 
        const arrayTitles:Array<any> = [];

        const images = this.renderer2.selectRootElement(this.idImage);
        
        images.map((str: any) => {
            arrayImages.push(str.nativeElement);
        })

        const titles = this.renderer2.selectRootElement(this.idTitle);

        titles.map((str: any) => {
            arrayTitles.push(str.nativeElement);
            // console.log(a)
        })

        this.changePhoto(arrayImages, arrayTitles);

        const observable = this.renderer2.selectRootElement(this.idObservable);
        this.observer.createObserver(observable, "FADE");
    }
    

    public ngOnInit() {
        // if (this.items.length === 0) {
        //     return;
        // }

        const MAX_ITEMS:number = 6;
        let num:number = 0;

        let item: Number[] = [];

        while (num < MAX_ITEMS) {
            const rand = Math.floor(Math.random() * products.items.length);
            
            if (item.includes(rand)) {
                continue;
            }

            this.items.push(products.items[rand]);
            item.push(rand);
            
            num++;
        }

        // this.changePhoto();
    }

    public changePhoto(images: any, titles: any) {
        const timer = Math.floor(Math.random() * 3000) + 1500;
        const randomSquare = Math.floor(Math.random() * this.items.length);
        const randomItem = Math.floor(Math.random() * products.items.length);

        this.renderer2.setStyle(images[randomSquare], "opacity", 0);

        setTimeout(() => {
            this.renderer2.setStyle(images[randomSquare], "opacity", 1);
            this.renderer2.setAttribute(images[randomSquare], "src", products.items[randomItem].image);
            this.renderer2.setProperty(titles[randomSquare], "textContent", products.items[randomItem].title);
        }, 1000);

        setTimeout(() => {
            this.changePhoto(images, titles);
        }, timer);
    }

    public handleChange(event: any) {
        event.currentTarget.classList.add("class_section_1_image_effect");
    }
}