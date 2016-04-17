import {Component, Injectable} from 'angular2/core';
import {provideStore, Store, Action} from '@ngrx/store';
import {Observable} from 'rxjs/Rx'

import {PageScroll, PageScrollConfig} from 'ng2-page-scroll';

import {recipes} from './recipes.reducer';
import {RecipeModel} from './recipe.model';
import {RecipeItem} from './recipe-item.component';
import {RecipeInput} from './recipe-input.component';

@Component({
    selector: 'recipe-list',
    directives: [RecipeItem, RecipeInput],
    template: `
    <style>
        a:link {
            text-decoration: none;
        }
    </style>
    <div class="recipe-list-container">
        <!--{{diagnostic}}-->
        <ul class="mdl-list">
            <!--<li *ngFor="#recipe of recipes | search: term; #i = index">-->
            <li *ngFor="#recipe of recipes | async; #i = index">
            <a pageScroll href="{{'#moi' + i}}"><span id="{{'moi' + i}}">
            <recipe-item
                [recipe]="recipe"
                [checked]="checked(recipe)"
                (toggle)="toggle($event)"
                (remove)="remove(recipe)"
                ></recipe-item>
                </span></a>
            <!--<product-input [hidden]="! productService.editing(product)" [product]="product"
                (update)="productService.updateProduct(product, $event)"></product-input> -->
            </li>
        </ul>
    </div>
    <!--<input #newrecipe type="text"/>-->
    <!--<button (click)="addRecipe(newrecipe)">add</button>-->
    <!--<ul>-->
      <!--<li *ngFor="#recipe of recipes | async">{{recipe.id}}</li>-->
    <!--</ul>-->
  `
})
export class RecipeList {
    recipes: Observable<any[]>;

    constructor(private store:Store<any>){
        this.recipes = store.select('recipes');
        PageScrollConfig.defaultScrollOffset = 0;
        PageScrollConfig.defaultDuration = 100000;
        PageScrollConfig.defaultEasingFunction = (t:number, b:number, c:number, d:number):number => {
            // Linear easing
            return c * t / d + b;
        };
    }

    checked(recipe) {
        return true;
        //return this.type === ProductListType.shopping ? product.status === BoughtStatus.bought : product.onList;
    }


    toggle(recipe: RecipeModel) {
        //return  this.type === ProductListType.shopping ?
        //    this.productService.toggleBought(product) : this.productService.toggleOnList(product);
    }

    remove(recipe: RecipeModel) {
        //return  this.type === ProductListType.shopping ?
        //    this.productService.toggleOnList(product) : this.productService.deleteProduct(product);
    }

    //addRecipe(el){
    //    //debugger;
    //    this.store.dispatch(<Action>{type: 'ADD_RECIPE', payload: {
    //        text: el.value
    //    }});
    //
    //    el.value = ''
    //}
}