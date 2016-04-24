import {Component, Input} from "angular2/core";
import {Observable} from 'rxjs/Rx';

import {PageScroll, PageScrollConfig} from 'ng2-page-scroll';

import {SearchPipe} from "../../search/pipes/search-pipe";

import {ProductItem} from "./product-item";
import {ProductInput} from "./product-input";

import {ProductsService} from "../products.service";
import {ProductModel} from "../services/product-model";
import {OnlistPipe} from "../product-on-list.pipe";

export enum ProductListType {
    shopping,
    favorites
}

@Component({
    selector: 'product-list',
    pipes: [SearchPipe, OnlistPipe],
    directives: [ProductItem, ProductInput],
    template: `
    <style>
        a:link {
            text-decoration: none;
        }
    </style>
    <div class="product-list-container ">
        <!--{{diagnostic}}-->
        <product-input *ngIf="showAdd"
            (add)="productsService.addProduct($event)"></product-input>
        <ul class="mdl-list">
            <li *ngFor="#product of products | async | onlist: type | search: term; #i = index">
            <a pageScroll href="{{'#moi' + i}}"><span id="{{'moi' + i}}">
            <product-item *ngIf="! productsService.editing(product)"
                [product]="product"
                [checked]="checked(product)"
                [lineThrough] ="lineThrough"
                (toggle)="toggle($event)"
                (remove)="removeProduct(product)"
                (startEditing)="productsService.startEditing(product)"
                ></product-item>
                </span></a>
            <product-input *ngIf="productsService.editing(product)" [product]="product"
                (update)="productsService.updateProduct(product, $event)"></product-input>
            </li>
        </ul>
    </div>`
})
export class ProductList {
    @Input() showAdd;
    @Input() term;
    @Input() type: ProductListType;
    products: Observable<any[]>;

    constructor(
        public productsService: ProductsService
    ) {
        PageScrollConfig.defaultScrollOffset = 0;
        PageScrollConfig.defaultDuration = 100000;
        PageScrollConfig.defaultEasingFunction = (t:number, b:number, c:number, d:number):number => {
            // Linear easing
            return c * t / d + b;
        };

        this.products = productsService.products;
    }

    get lineThrough() {
        return this.type === ProductListType.shopping;
    }

    checked(product) {
        return this.type === ProductListType.shopping ? product.isBought : product.onList;
    }

    toggle(product: ProductModel) {
        return  this.type === ProductListType.shopping ?
            this.productsService.toggleBought(product) : this.productsService.toggleOnList(product);
    }

    removeProduct(product: ProductModel) {
        return  this.type === ProductListType.shopping ?
            this.productsService.toggleOnList(product) : this.productsService.removeProduct(product);
    }


    // TODO: Remove this when we're done
    get diagnostic() {
        return 'product-list: ' + JSON.stringify(this.type);
    }
}

