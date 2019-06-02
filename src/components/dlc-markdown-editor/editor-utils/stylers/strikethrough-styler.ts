import { GenericSurroundingSymbolsStyler } from "./surrounding-symbols-styler";

export class StrikethroughStyler extends GenericSurroundingSymbolsStyler {

    _symbol: string = '~~';
    _styleRegExp: RegExp = /^\~\~(.*?)\~\~$/;
    _halfStyleRegexp: RegExp = /\~\~(.*?)/;

}