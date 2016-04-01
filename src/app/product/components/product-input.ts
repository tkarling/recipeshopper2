import {Component, Inject} from "angular2/core";
import {ProductService} from "../services/product-service";
import {ProductModel, EXTRAS} from "../services/product-model";

@Component({
    selector: 'product-input',
    template: `<div>
        <form (submit)="onSubmit()">
            <input type="text" [(ngModel)]="productModel.name" placeholder="product">
        </form>
        </div>`
})
export class ProductInput{
    productModel:ProductModel = new ProductModel();

    constructor(public productService:ProductService){

    }

    onSubmit(){
        this.productModel.aisle = this.productModel.aisle || EXTRAS;
        this.productService.addProduct(this.productModel);
        this.productModel = new ProductModel();
    }
}
