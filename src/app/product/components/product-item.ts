import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ProductModel, BoughtStatus} from '../services/product-model';

import {ProductService} from "../services/product-service";

const ICON_CHECKED = 'done';
const ICON_NOT_CHECKED = 'check_box_outline_blank';

@Component({
    selector: 'product-item',
    template: `
    <style>
        .bought {
            text-decoration: line-through;
        }
        .left-content {
            margin-right: 16px;
            margin-left: 0px;
        }
    </style>
    <div class="mdl-list__item mdl-list__item--two-line">
        <span class="mdl-list__item-secondary-content left-content">
            <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored" (click)="toggle.emit(product)">
                <i class="material-icons">{{checkboxIcon(checked)}}</i>
            </button>
        </span>
        <span class="mdl-list__item-primary-content" (click)="productService.startEditing(product)">
            <span [ngClass]="myStyle(product.status)">{{product.amount}} </span>
            <span [ngClass]="myStyle(product.status)">{{product.unit}} </span>
            <span [ngClass]="myStyle(product.status)">{{product.name}}</span>
            <span class="mdl-list__item-sub-title" [ngClass]="myStyle(product.status)"> {{product.aisle}}</span>
        </span>
        <span class="mdl-list__item-secondary-content">
            <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--accent" (click)="remove.emit(product)">
                <i class="material-icons">delete</i>
            </button>
        </span>
    </div>`
})
export class ProductItem {
    @Input() product: ProductModel;
    @Input() checked: boolean;
    @Input() lineThrough: boolean;
    @Output() toggle = new EventEmitter();
    @Output() remove = new EventEmitter();
    constructor(public productService:ProductService) {
    }

    checkboxIcon(status) {
        return status ? ICON_CHECKED: ICON_NOT_CHECKED;
    }

    myStyle(status) {
        return this.lineThrough && this.product.status === BoughtStatus.bought ? 'bought': 'not-bought';
    }
}

