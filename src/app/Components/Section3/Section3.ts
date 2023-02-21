import { Component, ViewChildren, Renderer2, ElementRef, AfterViewInit } from "@angular/core";

import { ObserverService } from "../Service/observer.service";

@Component({
    selector: "Section3",
    templateUrl: "./Section3.html",
    styleUrls: [
        "./Section3.css"
    ]
})

export class Section3 implements AfterViewInit {
    @ViewChildren("idObsevable") public idObsevable!: ElementRef; 

    constructor(private renderer2: Renderer2, private observer: ObserverService) {
    }

    public ngAfterViewInit() {
        const observable = this.renderer2.selectRootElement(this.idObsevable);
        this.observer.createObserver(observable); 
    }
}