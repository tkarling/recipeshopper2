import {Component, Input} from "angular2/core";

//import {StartedPipe} from "../pipes/started-pipe";
import {SearchPipe} from "../../search/pipes/search-pipe";

import {ProductItem} from "./product-item";
import {ProductInput} from "./product-input";

import {ProductService} from "../services/product-service";
import {ProductModel, BoughtStatus} from "../services/product-model";

export enum ProductListType {
    shopping,
    favorites
}

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
            <li *ngFor="#product of products | search: term">
            <product-item [hidden]="productService.editing(product)"
                [product]="product"
                [checked]="checked(product)"
                [lineThrough] ="lineThrough"
                (toggle)="toggle($event)"
                (remove)="remove(product)"
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
    @Input() type: ProductListType;

    constructor(public productService:ProductService) {
    }

    get lineThrough() {
        return this.type === ProductListType.shopping;
    }

    get products() {
        return this.type === ProductListType.shopping ? this.productService.shoppings : this.productService.favorites;
    }

    checked(product) {
        return this.type === ProductListType.shopping ? product.status === BoughtStatus.bought : product.onList;
    }


    toggle(product: ProductModel) {
        return  this.type === ProductListType.shopping ?
            this.productService.toggleBought(product) : this.productService.toggleOnList(product);
    }

    remove(product: ProductModel) {
        return  this.type === ProductListType.shopping ?
            this.productService.toggleOnList(product) : this.productService.deleteProduct(product);
    }

    // TODO: Remove this when we're done
    get diagnostic() {
        return 'product-list: ' + JSON.stringify(this.type);
    }
}

