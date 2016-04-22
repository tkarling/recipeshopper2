import {Component, Input} from "angular2/core";
import {Observable} from 'rxjs/Rx';
import {AngularFire, defaultFirebase, FIREBASE_PROVIDERS, FirebaseListObservable} from 'angularfire2';

import {PageScroll, PageScrollConfig} from 'ng2-page-scroll';

import {SearchPipe} from "../../search/pipes/search-pipe";

import {ProductItem} from "./product-item";
import {ProductInput} from "./product-input";

import {ProductService} from "../services/product-service";
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
            (add)="addProduct($event)"></product-input>
        <ul class="mdl-list">
            <li *ngFor="#product of products | async | onlist: type | search: term; #i = index">
            <a pageScroll href="{{'#moi' + i}}"><span id="{{'moi' + i}}">
            <product-item *ngIf="! productService.editing(product)"
                [product]="product"
                [checked]="checked(product)"
                [lineThrough] ="lineThrough"
                (toggle)="toggle($event)"
                (remove)="removeProduct(product)"
                ></product-item></span></a>
            <product-input *ngIf="productService.editing(product)" [product]="product"
                (update)="updateProduct(product, $event)"></product-input>
            </li>
        </ul>
    </div>`
})
export class ProductList {
    @Input() showAdd;
    @Input() term;
    @Input() type: ProductListType;
    products: FirebaseListObservable<any[]>;

    constructor(public productService:ProductService, angularFire: AngularFire) {
        PageScrollConfig.defaultScrollOffset = 0;
        PageScrollConfig.defaultDuration = 100000;
        PageScrollConfig.defaultEasingFunction = (t:number, b:number, c:number, d:number):number => {
            // Linear easing
            return c * t / d + b;
        };

        this.products = angularFire.database.list('/products');
    }

    get lineThrough() {
        return this.type === ProductListType.shopping;
    }

    checked(product) {
        return this.type === ProductListType.shopping ? product.isBought : product.onList;
    }

    toggleOnList(product: ProductModel) {
        this.products.update(product, {onList: ! product.onList});
    }

    toggleBought(product: ProductModel) {
        this.products.update(product, {isBought: ! product.isBought});
    }


    toggle(product: ProductModel) {
        return  this.type === ProductListType.shopping ?
            this.toggleBought(product) : this.toggleOnList(product);
    }

    updateProduct(product:ProductModel, updatedProduct:ProductModel) {
        this.products.update(product, {name: updatedProduct.name});
        this.productService.stopEditing();
    }

    addProduct(newProduct:ProductModel) {
        this.products.push(newProduct);
    }

    removeProduct(product: ProductModel) {
        return  this.type === ProductListType.shopping ?
            this.toggleOnList(product) : this.products.remove(product.$key);
    }


    // TODO: Remove this when we're done
    get diagnostic() {
        return 'product-list: ' + JSON.stringify(this.type);
    }
}

