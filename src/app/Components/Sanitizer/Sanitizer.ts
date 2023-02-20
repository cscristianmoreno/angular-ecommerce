import { DomSanitizer } from "@angular/platform-browser";

export class SanitizerElement {
    constructor(private sanitizer: DomSanitizer) {

    }

    public transformHTML(element: any) {
        const elementSanitizer = this.sanitizer.bypassSecurityTrustHtml(element);
        return elementSanitizer;
    }
}