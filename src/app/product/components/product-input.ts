import {Component, Inject, Input, Output, EventEmitter} from "angular2/core";
import {NgForm}    from 'angular2/common';

import {ProductModel, EXTRAS} from "../services/product-model";

@Component({
    selector: 'product-input',
    template: `
    <style>
        .product-input {
            border: 2px solid #ff3b80;
            margin-top: 14px;
        }

        .show-error {
            visibility: visible;
        }

    </style>
    <div class="product-input">
        <form (ngSubmit)="onSubmit()" #productForm="ngForm">
            <!--{{diagnostic}}-->
            <div class="mdl-grid">
                <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--1-col-phone mdl-cell--2-col">
                    <input class="mdl-textfield__input" id="amount" type="number"
                        [(ngModel)]="productModel.amount">
                    <label [hidden]="productModel.amount" class="mdl-textfield__label" for="amount">Amount</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--1-col-phone mdl-cell--2-col">
                    <input class="mdl-textfield__input" id="unit" type="text"
                        [(ngModel)]="productModel.unit">
                    <label [hidden]="productModel.unit" class="mdl-textfield__label" for="unit">Unit</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield  mdl-cell mdl-cell--2-col-phone mdl-cell--4-col-tablet mdl-cell--8-col-desktop">
                    <input class="mdl-textfield__input" id="product" type="text" required
                        [(ngModel)]="productModel.name"
                        ngControl="name"  #name="ngForm">
                    <label [hidden]="productModel.name" class="mdl-textfield__label" for="product">Product</label>
                    <span class="mdl-textfield__error show-error" [hidden]="productModel.name">
                        Name is required
                    </span>
                </div>
            </div>
            <div class="mdl-grid">
                 <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--3-col-phone mdl-cell--7-col-tablet mdl-cell--11-col-desktop">
                    <input class="mdl-textfield__input" id="aisle" type="text"
                    [(ngModel)]="productModel.aisle">
                    <label [hidden]="productModel.aisle" class="mdl-textfield__label" for="aisle">Aisle</label>
                 </div>
                 <div class="mdl-cell mdl-cell--1-col">
                    <button type="submit" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
                        [disabled]="!productForm.form.valid">
                        <i class="material-icons">{{adding ? 'add' : 'done'}}</i>
                    </button>
                 </div>
            </div>
        </form>
    </div>`
})
export class ProductInput {
    @Input() product;
    @Output() add = new EventEmitter();
    @Output() update = new EventEmitter();
    productModel:ProductModel;
    adding: boolean;

    constructor() {
    }

    ngOnInit() {
        this.adding = ! this.product;
        this.productModel = this.product ? (<any>Object).assign({}, this.product) : new ProductModel();
        delete this.productModel.$key;
    }

    onSubmit() {
        if(this.adding) {
            this.productModel.aisle = this.productModel.aisle || EXTRAS;
            this.add.emit(this.productModel);
            this.productModel = new ProductModel();
        } else { // editing
            this.update.emit(this.productModel);
        }
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.adding); }
}
