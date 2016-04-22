import {Component, Injectable, Input} from 'angular2/core';
import {provideStore, Store, Action} from '@ngrx/store';
import {Observable} from 'rxjs/Rx'

import {SearchPipe} from "../search/pipes/search-pipe";


import {recipes, TOGGLE_ONLIST_RECIPE, DELETE_RECIPE} from './recipes.reducer';
import {RecipeModel} from './recipe.model';
import {RecipeItem} from './recipe-item.component';
import {RecipeInput} from './recipe-input.component';

@Component({
    selector: 'recipe-list',
    pipes: [SearchPipe],
    directives: [RecipeItem, RecipeInput],
    template: `
    <style>
        a:link {
            text-decoration: none;
        }
    </style>
    <div class="recipe-list-container">
        <!--{{diagnostic}}-->
        <recipe-input [hidden]="! showAdd && recipeCount > 0"></recipe-input>
        <ul class="mdl-list">
            <li *ngFor="#recipe of recipes | async | search: term">
            <recipe-item
                [recipe]="recipe"
                [checked]="checked(recipe)"
                (toggle)="toggle($event)"
                (remove)="remove(recipe)"
                ></recipe-item>
            </li>
        </ul>
    </div>
  `
})
export class RecipeList {
    @Input() showAdd;
    @Input() term;
    recipes: Observable<any[]>;
    recipeCount: number = 0;

    constructor(private store:Store<any>){
        this.recipes = store.select('recipes');
    }

    ngAfterViewInit() {
        this.recipes.subscribe((data) => {
            this.recipeCount = data.length
        });
    }

    checked(recipe: RecipeModel) {
        return recipe.onList;
    }


    toggle(recipe: RecipeModel) {
        this.store.dispatch(<Action>{
            type: TOGGLE_ONLIST_RECIPE, payload: {
                id: recipe.id
            }
        });
    }

    remove(recipe: RecipeModel) {
        this.store.dispatch(<Action>{
            type: DELETE_RECIPE, payload: {
                id: recipe.id
            }
        });
    }

    // TODO: Remove this when we're done
    get diagnostic() { return 'RecipeList: ' + JSON.stringify(this.recipeCount); }

}