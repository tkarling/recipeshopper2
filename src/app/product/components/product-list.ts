import {Component, Input} from "angular2/core";

//import {StartedPipe} from "../pipes/started-pipe";
import {SearchPipe} from "../../search/pipes/search-pipe";

import {ProductItem} from "./product-item";
import {ProductInput} from "./product-input";

import {ProductService} from "../services/product-service";

@Component({
    selector: 'product-list',
    pipes: [SearchPipe], // StartedPipe,
    directives: [ProductItem, ProductInput],
    template: `
    <style>
        .product-list-container {
          max-width: 600px;
          margin: auto;
        }
    </style>
    <div class="product-list-container ">
        <product-input [active]="showAdd"></product-input>
        <ul class="mdl-list">
            <li *ngFor="#product of productService.products | search: term">
            <product-item
                [product]="product"
                (toggle)="productService.toggleBought($event)"
                ></product-item>
            </li>
        </ul>
    </div>`
})
export class ProductList {
    //@Input() status;
    @Input() term;
    @Input() showAdd;
    constructor(public productService:ProductService) {
        //console.log(productService.products);
    }
}
