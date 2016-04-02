import {Component, Input} from "angular2/core";
import {ProductService} from "../services/product-service";
import {ProductItem} from "./product-item";
//import {StartedPipe} from "../pipes/started-pipe";
import {SearchPipe} from "../../search/pipes/search-pipe";

@Component({
    selector: 'product-list',
    pipes: [SearchPipe], // StartedPipe,
    directives: [ProductItem],
    template: `
    <style>
        .product-list {
          width: 300px;
        }
    </style>
    <div>
        <ul class="product-list mdl-list">
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
    constructor(public productService:ProductService) {
        //console.log(productService.products);
    }
}
