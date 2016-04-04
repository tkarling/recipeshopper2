export enum BoughtStatus {
    bought,
    not_bought
}

export const FAVORITES = 'FAVORITES';

export const DAIRY = 'DAIRY';
export const GRAINS = 'GRAINS';
export const VEGGIES_FRUIT = 'VEGGIES&FRUIT';
export const EXTRAS = 'EXTRAS';

export const aisles: string[] = [DAIRY, GRAINS, VEGGIES_FRUIT, EXTRAS];

export class ProductModel{
    recipe: string = FAVORITES;
    onList: boolean = true;

    constructor(
        public name:string = '',
        public aisle:string = '',
        public amount: string = '',
        public unit: string = '',
        public status:BoughtStatus = BoughtStatus.not_bought
    ){
    }

    toggle():void {
        this.status =
            this.status == BoughtStatus.bought
                ? BoughtStatus.not_bought
                : BoughtStatus.bought;
    }
}


