import { Component, Input, OnChanges, SimpleChanges, enableProdMode, OnInit } from "@angular/core";

import axios from "axios";

// enableProdMode();

@Component({
    selector: "SectionNumber",
    templateUrl: "./SectionNumber.html",
    styleUrls: [
        "./SectionNumber.css"
    ]
})

export class SectionNumber {
    @Input() title:string = "";
    @Input() page:string = "";
}