import { GenericSurroundingSymbolsStyler } from './surrounding-symbols-styler';

export class BoldStyler extends GenericSurroundingSymbolsStyler {

    _symbol: string = '**';
    _styleRegExp: RegExp = /^(\*\*|__)(.*?)(\*\*|__)$/;
    _halfStyleRegexp: RegExp = /(\*\*|__)(.*?)/;

}