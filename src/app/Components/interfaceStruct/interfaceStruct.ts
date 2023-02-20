import { SafeHtml } from "@angular/platform-browser"

export interface collectionStruct {
    description?: string,
    id?: string,
    media_count?: number,
    photos_count?: number,
    private?: boolean,
    title?: string,
    videos_count?: number,
}

export interface productsStruct {
    id: number,
    title: string,
    price: number,
    image: string,
    category: string,
    offer?: string
}

export interface categoryStruct {
    title?: string,
    icon?: string,
    category?: string
    
}

export interface iconStruct {
    Whatsapp?: any,
    Facebook?: any,
    Linkedin?: any,
    Github?: any
}

export interface iconSection4Struct {
    title?: string,
    svg?: string
}

export interface menuItemsStruct {
    title?: string,
    path?: string
}