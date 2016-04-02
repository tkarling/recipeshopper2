import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ProductModel, BOUGHT} from '../services/product-model';

const ICON_CHECKED = 'done';
const ICON_NOT_CHECKED = 'check_box_outline_blank';

@Component({
    selector: 'product-item',
    template: `
    <style>
        .bought {
            text-decoration: line-through;
        }
    </style>
    <div class="mdl-list__item mdl-list__item--two-line">
        <span class="mdl-list__item-primary-content">
            <span [ngClass]="product.status">{{product.name}}</span>
            <span class="mdl-list__item-sub-title" [ngClass]="product.status"> {{product.aisle}}</span>
        </span>
        <span class="mdl-list__item-secondary-content">
            <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" (click)="toggle.emit(product)">
                <i class="material-icons">{{checkboxIcon(product.status)}}</i>
            </button>
        </span>
    </div>`
})
export class ProductItem {
    @Input() product: ProductModel;
    @Output() toggle = new EventEmitter();

    checkboxIcon(status) {
        return this.product.status === BOUGHT ? ICON_CHECKED: ICON_NOT_CHECKED;
    }
}

//<input type="checkbox" class="mdl-checkbox__input" (change)="toggle.emit(product)" [checked]="product.status">
// {{product.status === 'bought' ? 'done': 'check_box_outline_blank'}}