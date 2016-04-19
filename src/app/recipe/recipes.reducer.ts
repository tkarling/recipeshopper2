//recipe reducer

export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const TOGGLE_ONLIST_RECIPE = 'TOGGLE_ONLIST_RECIPE';

let idCounter = 0;
export const recipes = (state = [], {type = '', payload = null}) => {
    switch(type){
        case ADD_RECIPE:
            const recipe = (<any>Object).assign({}, payload.recipeModel, {id: idCounter++});
            return state.concat([recipe]);
            //return [payload.recipeModel, ...state];
        case UPDATE_RECIPE:
            return state.map(recipe => {
                return recipe.id !== payload.id ?
                    recipe :
                    (<any>Object).assign({}, recipe, payload)
            });
        case TOGGLE_ONLIST_RECIPE:
            return state.map(recipe => {
                return recipe.id !== payload.id ?
                    recipe :
                    (<any>Object).assign({}, recipe, {onList: !recipe.onList})
            });
        case DELETE_RECIPE:
            return state.filter(recipe => recipe.id !== payload.id);
        default:
            return state;
    }
};

//export const ALL = 'ALL'
//export const COMPLETE = 'COMPLETE'
//export const PENDING = 'PENDING'
//
//export const visibilityFilter = (state = (recipe) => true, {type, payload}) => {
//    switch(type){
//        case ALL:
//            return (recipe) => true;
//        case COMPLETE:
//            return (recipe) => recipe.completed;
//        case PENDING:
//            return (recipe) => !recipe.completed;
//        default:
//            return state;
//    }
//}
