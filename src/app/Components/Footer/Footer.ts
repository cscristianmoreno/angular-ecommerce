import { Component, Input, OnInit } from "@angular/core";
import { IconSvg } from "../Service/icon.service";
import { DomSanitizer } from "@angular/platform-browser";
import { iconStruct } from "../interfaceStruct/interfaceStruct";

import { SanitizerElement } from "../Sanitizer/Sanitizer";

@Component({
    selector: "Footer",
    templateUrl: "./Footer.html",
    styleUrls: [
        "./Footer.css"
    ]
})  


export class Footer {
    public icons: iconStruct = {};

    constructor(private response: IconSvg, private sanitizer: DomSanitizer) {
        this.response.getIconSvg("Whatsapp").subscribe((res: any) => {
            this.icons.Whatsapp = new SanitizerElement(sanitizer).transformHTML(res);
        });

        this.response.getIconSvg("Facebook").subscribe((res: any) => {
            this.icons.Facebook = new SanitizerElement(sanitizer).transformHTML(res);
        });

        this.response.getIconSvg("Linkedin").subscribe((res: any) => {
            this.icons.Linkedin = new SanitizerElement(sanitizer).transformHTML(res);
        });

        this.response.getIconSvg("Github").subscribe((res: any) => {
            this.icons.Github = new SanitizerElement(sanitizer).transformHTML(res);
        });
    }
}