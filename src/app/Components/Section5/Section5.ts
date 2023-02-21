import { Component, OnInit, ViewChildren, AfterViewInit, ElementRef, Renderer2 } from "@angular/core";
import { ObserverService } from "../Service/observer.service";

@Component({
    selector: "Section5",
    templateUrl: "./Section5.html",
    styleUrls: [
        "./Section5.css"
    ]
})

export class Section5 implements AfterViewInit {
    @ViewChildren("idObservable") public idObservable!: ElementRef; 

    constructor(private renderer2: Renderer2, private observer: ObserverService) {

    }

    public ngAfterViewInit() {
        const observable = this.renderer2.selectRootElement(this.idObservable);
        this.observer.createObserver(observable);
    }

}