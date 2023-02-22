import { Component, Input, OnInit, HostListener, ViewChild, ViewChildren, Renderer2, ElementRef } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CookieService } from "ngx-cookie-service";
import { menuItemsStruct } from "../interfaceStruct/interfaceStruct";

import { SanitizerElement } from "../Sanitizer/Sanitizer";

import { IconSvg } from "../Service/icon.service";
import { ProductsServices } from "../Service/products.service";

const MENU_ITEMS = [
    { title: "Inicio", path: "" },
    { title: "Productos", path: "/products" },
]

@Component({
    selector: "Menu",
    templateUrl: "./Menu.html",
    styleUrls: [
        "./Menu.css"
    ]
})

export class Menu implements OnInit {
    public iconEcommerce: any;
    public iconShoppingCart: any;
    public iconMenu: any;
    public menuItems: menuItemsStruct[] = MENU_ITEMS;
    public showMenuResponsive: boolean = false;

    public width!: number;
    
    @ViewChildren("idShoppingCartEffect") public shoppingCartEffect: any;
    @ViewChild("idMenuResponsive") public idMenuResponsive: any;

    @HostListener("window: resize", ["$event"]) public eventReize(event: any) {
        this.width = window.innerWidth;
    }

    public ngOnInit() {
        this.width = window.innerWidth;
    }

    constructor(private sanitizer: DomSanitizer, private response: IconSvg, private products: ProductsServices, private renderer2: Renderer2) {
        this.response.getIconSvg("Ecommerce").subscribe((res: any) => {
            this.iconEcommerce = new SanitizerElement(sanitizer).transformHTML(res);
        })

        this.response.getIconSvg("ShoppingCart").subscribe((res: any) => {
            this.iconShoppingCart = new SanitizerElement(sanitizer).transformHTML(res);
        })

        this.response.getIconSvg("Menu").subscribe((res) => {
            this.iconMenu = new SanitizerElement(sanitizer).transformHTML(res);
        })
    }

    public ngAfterViewInit() {
        this.products.productUpdated$.subscribe((products) => {
            const shoppingCartEffect = this.renderer2.selectRootElement(this.shoppingCartEffect);

            shoppingCartEffect.map((str: ElementRef) => {
                this.renderer2.setStyle(str.nativeElement, "opacity", (products.length) ? 1 : 0);
            })
        });
    }

    public handleOpenMenu() {
        const idMenuResponsive = this.renderer2.selectRootElement(this.idMenuResponsive).nativeElement;
        
        this.showMenuResponsive = !(this.showMenuResponsive);

        if (this.showMenuResponsive) {
            this.renderer2.addClass(idMenuResponsive, "class_menu_responsive_display")
        }
        else {
            this.renderer2.removeClass(idMenuResponsive, "class_menu_responsive_display")
        }

        // console.log(this.renderer2.);
        // if (this.renderer2.
        // this.renderer2.addClass(menuResponsive, "class_menu_responsive_display");
    }
}