export interface StylerInterface {

    style( _selectedText: string ): Promise<string>;
    hasStyle( _selectedText: string ): boolean;
    hasUnselectedStyle( _selectedText: string ): boolean;
    hasHalfStyle( _selectedText: string ): boolean;
    removeStyle( _selectedText: string ): string;
    setElement( element: HTMLInputElement | HTMLTextAreaElement ): any;

}