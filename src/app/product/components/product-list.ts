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
    </style>
    <div class="product-list-container ">
        <!--{{diagnostic}}-->
        <ul class="mdl-list">
            <li *ngFor="#product of productService.products | search: term">
            <product-item [hidden]="productService.editing(product)"
                [product]="product"
                (toggle)="productService.toggleBought($event)"
                (remove)="productService.deleteProduct(product)"
                ></product-item>
            <product-input [hidden]="! productService.editing(product)" [product]="product"
                (update)="productService.updateProduct(product, $event)"></product-input>
            </li>
        </ul>
    </div>`
})
export class ProductList {
    //@Input() status;
    @Input() term;

    constructor(public productService:ProductService) {
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        return 'product-list: ' + JSON.stringify(this.productService.products[0]);
    }
}
