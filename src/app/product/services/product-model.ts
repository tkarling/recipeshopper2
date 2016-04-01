export const BOUGHT = 'bought';
export const NOT_BOUGHT = 'not-bought';

export const DAIRY = 'DAIRY';
export const GRAINS = 'GRAINS';
export const VEGGIES_FRUIT = 'VEGGIES&FRUIT';
export const EXTRAS = 'EXTRAS';

export class ProductModel{
    constructor(
        public name:string = '',
        public aisle:string = '',
        public status:string = NOT_BOUGHT
    ){

    }

    toggle():void{
        this.status =
            this.status == BOUGHT
                ? NOT_BOUGHT
                : BOUGHT;
    }
}

