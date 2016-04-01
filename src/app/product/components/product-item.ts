import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ProductModel} from '../services/product-model';

@Component({
    selector: 'product-item',
    template: `
    <style>
        .bought {
            text-decoration: line-through;
        }
    </style>
    <div>
        <span [ngClass]="product.status">{{product.name}}</span>
        <span [ngClass]="product.status"> {{product.aisle}}</span>
        <button (click)="toggle.emit(product)">Toggle</button>
    </div>`
})
export class ProductItem {
    @Input() product: ProductModel;
    @Output() toggle = new EventEmitter();
}
