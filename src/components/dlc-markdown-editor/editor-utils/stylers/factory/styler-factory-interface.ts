import { StylerInterface } from "../styler-interface";

export interface StylerFactoryInterface {

    element: HTMLInputElement | HTMLTextAreaElement
    style( styler: StylerInterface ): any;

}