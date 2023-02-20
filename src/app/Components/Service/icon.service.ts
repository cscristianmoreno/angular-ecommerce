import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { map } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class IconSvg {
  constructor(private http: HttpClient) {

  }

  public getIconSvg(icon: string) {
    const response = this.http.get(`../assets/icons/${icon}.svg`, {
      responseType: "text"
    });

    
    return response;
  }
}