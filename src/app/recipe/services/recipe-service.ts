import {Injectable, Inject} from "angular2/core";
import {RecipeModel} from "./recipe-model";

import {Repository, REPOSITORY_TOKEN} from '../../services/repository';
import {LocalStorageService} from '../../services/local-storage-service';

@Injectable()
export class RecipeService {
    repository:Repository;
    recipes:RecipeModel[] = [];
    editingRecipe:RecipeModel = null;

    constructor(@Inject(REPOSITORY_TOKEN) repository:Repository) {
        if (repository && repository.getItems) {
            this.repository = repository;
            repository.getItems().then((items) => {
                this.recipes = items;
            }).catch((err)=> {
                console.warn('RecipeService: error getting items', err);
            });
        } else {
            console.warn('RecipeService: no repository');
        }
    }

    refreshRecipes() {
        return this.repository.getItems().then((items) => {
            this.recipes = items;
        });
    }

    editing(recipe:RecipeModel) {
        return this.editingRecipe === recipe;
    }

    startEditing(recipe:RecipeModel) {
        this.editingRecipe = recipe;
    }

    stopEditing() {
        this.editingRecipe = null;
    }

    addRecipe(recipe:RecipeModel) {
        return this.repository.addItem(recipe).then(() => {
            return this.refreshRecipes();
        });
    }

    updateRecipe(recipe:RecipeModel, updatedRecipe:RecipeModel) {
        return this.repository.updateItem(recipe, updatedRecipe).then(() => {
            return this.refreshRecipes();
        });
    }

    deleteRecipe(recipe:RecipeModel) {
        return this.repository.deleteItem(recipe).then(() => {
            return this.refreshRecipes();
        });
    }

    toggleOnList(recipe:RecipeModel) {
        const onList = !recipe.onList;
        const toggledRecipe:RecipeModel = <RecipeModel>(<any>Object).assign({}, recipe, {onList});

        return this.updateRecipe(recipe, toggledRecipe);
    }

}

