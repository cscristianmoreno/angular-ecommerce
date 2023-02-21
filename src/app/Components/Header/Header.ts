import { Component, AfterViewInit, ViewChildren, ElementRef, Renderer2 } from "@angular/core";
import { ObserverService } from "../Service/observer.service";


import { of } from "rxjs";

@Component({
    selector: "Header",
    templateUrl: "./Header.html",
    styleUrls: [
        "./Header.css"
    ]
})

export class Header implements AfterViewInit { 
    @ViewChildren("idObservable") public idObservable!: ElementRef;

    constructor(private renderer2: Renderer2, private observer: ObserverService) {

    }

    public ngAfterViewInit() {
        const element = this.renderer2.selectRootElement(this.idObservable);

        this.observer.createObserver(element, "SCALE");
    }
}