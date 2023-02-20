import { Component, Input, ViewChildren, AfterViewInit, Renderer2 } from "@angular/core";
import { IconSvg } from "../Service/icon.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { SanitizerElement } from "../Sanitizer/Sanitizer";


@Component({
    selector: "Section4",
    templateUrl: "./Section4.html",
    styleUrls: [
        "./Section4.css"
    ]
})

export class Section4 {
    public iconComfort: SafeHtml = "";
    public iconScope: SafeHtml = "";
    public iconDiscount: SafeHtml = "";
    public iconCosts: SafeHtml = "";
    public icon24Hours: SafeHtml = "";
    public iconPayment: SafeHtml = "";

    @ViewChildren("idSection4Svg") public idSection4Svg: any;

    constructor(private icon: IconSvg, private sanitizer: DomSanitizer, private renderer2: Renderer2) {
        this.icon.getIconSvg("Comfort").subscribe((res: any) => {
            this.iconComfort = new SanitizerElement(sanitizer).transformHTML(res);
        })

        this.icon.getIconSvg("Scope").subscribe((res: any) => {
            this.iconScope = new SanitizerElement(sanitizer).transformHTML(res);
        })

        this.icon.getIconSvg("Discount").subscribe((res: any) => {
            this.iconDiscount = new SanitizerElement(sanitizer).transformHTML(res);
        })

        this.icon.getIconSvg("Costs").subscribe((res: any) => {
            this.iconCosts = new SanitizerElement(sanitizer).transformHTML(res);
        })

        this.icon.getIconSvg("24Hours").subscribe((res: any) => {
            this.icon24Hours = new SanitizerElement(sanitizer).transformHTML(res);
        })

        this.icon.getIconSvg("Payment").subscribe((res: any) => {
            this.iconPayment = new SanitizerElement(sanitizer).transformHTML(res);
        })
    }

    public ngAfterViewInit() {
        // const element = this.renderer2.selectRootElement(this.idSection4Svg);
        // const newElement = this.renderer2.createElement("svg");

        // element.map((str: any) => {
        //     this.renderer2.appendChild(str.nativeElement, newElement);
        //     console.log(str.nativeElement);
        // })
    }
}