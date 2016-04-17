import {Component, Input, Output, EventEmitter} from "angular2/core";
import {RecipeModel} from './recipe.model';

const ICON_CHECKED = 'done';
const ICON_NOT_CHECKED = 'check_box_outline_blank';

@Component({
    selector: 'recipe-item',
    template: `
    <style>
        .left-content {
            margin-right: 16px;
            margin-left: 0px;
        }
    </style>
    <div class="mdl-list__item mdl-list__item--two-line">
            <!--{{diagnostic}}-->
        <span class="mdl-list__item-secondary-content left-content">
            <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" (click)="toggle.emit(recipe)">
                <i class="material-icons">{{checkboxIcon(checked)}}</i>
            </button>
        </span>
        <!--<span class="mdl-list__item-primary-content" (click)="productService.startEditing(product)">-->
        <span class="mdl-list__item-primary-content">
            <span>{{recipe.name}}</span>
            <span class="mdl-list__item-sub-title"> {{recipe.category}}</span>
        </span>
        <span class="mdl-list__item-secondary-content">
            <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--accent" (click)="remove.emit(recipe)">
                <i class="material-icons">delete</i>
            </button>
        </span>
    </div>`
})
export class RecipeItem {
    @Input() recipe: RecipeModel;
    @Input() checked: boolean;
    @Output() toggle = new EventEmitter();
    @Output() remove = new EventEmitter();
    //constructor(public productService:ProductService) {
    //}

    checkboxIcon(status) {
        return status ? ICON_CHECKED: ICON_NOT_CHECKED;
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        return 'recipe-item: ' + JSON.stringify(this.recipe);
    }
}

