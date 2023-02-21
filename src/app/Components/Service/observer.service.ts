import { ElementRef, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { distinctUntilChanged, Observable, map, mergeMap } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class ObserverService {
    public observer!: IntersectionObserver;
    public renderer2: Renderer2;

    constructor(private renderFactory: RendererFactory2) {
        this.renderer2 = renderFactory.createRenderer(null, null);
    }

    public createObserver(element: ElementRef[], effect_type: string = "") {
        // console.log(element.length);
        // console.log("Llegó acá");

        const observable = new Observable((observer) => {
            observer.next([]);
            // setTimeout(() => {
            // }, 5000);

            const intersection = new IntersectionObserver((entries: any) => {
                observer.next(entries);
            }, {
                threshold: 0
            })
            
            element.map((str) => {
                if (effect_type === "FADE") {

                    this.renderer2.setStyle(str.nativeElement, "opacity", "0");
                }
                else {

                    this.renderer2.setStyle(str.nativeElement, "transform", "scale(0)");
                }
                this.renderer2.setStyle(str.nativeElement, "transition", "0s");
                intersection.observe(str.nativeElement);
            })
        })

        observable.subscribe((res: any) => {
            res.map((str: any, num: number) => {
                
                if (str.isIntersecting) {
                    setTimeout(() => {
                        switch(effect_type) {
                            case "FADE": {
                                this.renderer2.setStyle(str.target, "opacity", "1");
                                // this.renderer2.setStyle(str.target, "transform", "scale(1)");
                                break;
                            }
                            case "SCALE": {
                                // this.renderer2.setStyle(str.target, "opacity", "1");
                                this.renderer2.setStyle(str.target, "transform", "scale(1)");
                                break;
                            }

                        }
                        this.renderer2.setStyle(str.target, "transition", "0.7s");
                        // this.renderer2.setStyle(str.target, "transform", "scale(1)");
                    }, 200 * (num + 1))
                }
            })
        })

        return observable;
    }
}