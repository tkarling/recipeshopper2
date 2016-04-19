//export const FAVORITES = 'FAVORITES';

export class RecipeModel{
    onList: boolean = true;
    id: string;

    constructor(
        public name:string = '',
        public category:string = ''
    ){
    }
}
