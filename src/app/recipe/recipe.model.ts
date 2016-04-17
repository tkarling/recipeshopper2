//export const FAVORITES = 'FAVORITES';

export class RecipeModel{
    onList: boolean = true;

    constructor(
        public name:string = '',
        public category:string = ''
    ){
    }
}
