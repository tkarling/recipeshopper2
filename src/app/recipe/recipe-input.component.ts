import {Component, Inject, Input, Output, EventEmitter} from "angular2/core";
import {NgForm}    from 'angular2/common';

import {provideStore, Store, Action} from '@ngrx/store'
import {Observable} from 'rxjs/Rx'

import {recipes} from './recipes.reducer';
import {RecipeModel} from "./recipe.model";

@Component({
    selector: 'recipe-input',
    //providers: [provideStore({recipes})],
    template: `
    <style>
        .recipe-input {
            border: 2px solid #ff3b80;
            margin-top: 14px;
        }

        .show-error {
            visibility: visible;
        }

    </style>
    <div class="recipe-input">
        <form (submit)="onSubmit()" #recipeForm="ngForm">
            <!--{{diagnostic}}-->
            <div class="mdl-grid">
                 <div class="mdl-textfield mdl-js-textfield  mdl-cell mdl-cell--4-col-phone mdl-cell--4-col-tablet mdl-cell--6-col-desktop">
                    <input class="mdl-textfield__input" id="recipe" type="text" required
                        [(ngModel)]="recipeModel.name"
                        ngControl="name"  #name="ngForm">
                    <label [hidden]="recipeModel.name" class="mdl-textfield__label" for="recipe">Recipe Name</label>
                    <span class="mdl-textfield__error show-error" [hidden]="recipeModel.name">
                        Recipe Name is required
                    </span>
                 </div>
                 <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--3-col-phone mdl-cell--3-col-tablet mdl-cell--5-col-desktop">
                    <input class="mdl-textfield__input" id="category" type="text"
                    [(ngModel)]="recipeModel.category">
                    <label [hidden]="recipeModel.category" class="mdl-textfield__label" for="category">Category</label>
                 </div>
                 <div class="mdl-cell mdl-cell--1-col">
                    <button type="submit" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
                        [disabled]="!recipeForm.form.valid">
                        <i class="material-icons">{{adding ? 'add' : 'done'}}</i>
                    </button>
                 </div>
            </div>
        </form>
    </div>`
})
export class RecipeInput {
    @Input() recipe;
    @Output() update = new EventEmitter();
    recipeModel:RecipeModel;
    adding:boolean;
    recipes:Observable<any[]>;

    constructor(private store:Store<any>) {
        this.recipes = store.select('recipes');
    }

    ngOnInit() {
        this.adding = !this.recipe;
        this.recipeModel = this.recipe ? (<any>Object).assign({}, this.recipe, {editing: true}) : new RecipeModel();
        //console.log('ngOnInit', this.adding, this.recipe, this.recipeModel);
    }

    onSubmit() {
        if (this.adding) {
            this.recipeModel.category = this.recipeModel.category || '';
            this.store.dispatch(<Action>{
                type: 'ADD_RECIPE', payload: {
                    recipeModel: this.recipeModel
                }
            });
            //this.productService.addRecipe(this.recipeModel);
            this.recipeModel = new RecipeModel();
        } else { // editing
            //this.productService.stopEditing();
            //this.update.emit(this.recipeModel);
        }
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        return JSON.stringify(this.adding);
    }
}
