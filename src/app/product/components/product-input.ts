import {Component, Inject} from "angular2/core";
import {NgForm}    from 'angular2/common';

import {ProductService} from "../services/product-service";
import {ProductModel, EXTRAS} from "../services/product-model";

@Component({
    selector: 'product-input',
    template: `<div>
        <form *ngIf="active" (submit)="onSubmit()" #productForm="ngForm">
            <div class="mdl-grid">
                <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--1-col-phone mdl-cell--2-col">
                    <input class="mdl-textfield__input" id="amount" type="text"
                        [(ngModel)]="productModel.amount"
                        ngControl="amount">
                    <label class="mdl-textfield__label" for="amount">Amount</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--1-col-phone mdl-cell--2-col">
                    <input class="mdl-textfield__input" id="unit" type="text"
                        [(ngModel)]="productModel.unit"
                        ngControl="unit">
                    <label class="mdl-textfield__label" for="unit">Unit</label>
                </div>
                <div class="mdl-textfield mdl-js-textfield  mdl-cell mdl-cell--2-col-phone mdl-cell--4-col-tablet mdl-cell--8-col-desktop">
                    <input class="mdl-textfield__input" id="product" type="text" required
                        [(ngModel)]="productModel.name"
                        ngControl="name"  #name="ngForm">
                    <label class="mdl-textfield__label" for="product">Product</label>
                    <span class="mdl-textfield__error">
                        Name is required
                    </span>
                </div>
            </div>
            <div class="mdl-grid">
                 <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--3-col-phone mdl-cell--7-col-tablet mdl-cell--11-col-desktop">
                    <input class="mdl-textfield__input" id="aisle" type="text"
                    [(ngModel)]="productModel.aisle"
                    ngControl="aisle"  #aisle="ngForm">
                    <label class="mdl-textfield__label" for="aisle">Aisle</label>
                 </div>
                 <div class="mdl-cell mdl-cell--1-col">
                    <button type="submit" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored"
                        [disabled]="!productForm.form.valid">
                        <i class="material-icons">add</i>
                    </button>
                 </div>
            </div>
        </form>
    </div>`
})
export class ProductInput {
    productModel:ProductModel = new ProductModel();
    active = true;

    constructor(public productService:ProductService) {

    }

    onSubmit() {
        this.productModel.aisle = this.productModel.aisle || EXTRAS;
        this.productService.addProduct(this.productModel);
        this.productModel = new ProductModel();
    }
}
