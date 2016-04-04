import {Injectable} from "angular2/core";
import {ProductModel} from "./product-model";

import {BoughtStatus,
    DAIRY, GRAINS, VEGGIES_FRUIT, EXTRAS} from './product-model';

@Injectable()
export class ProductService {
    products:ProductModel[];
    //= [
    //    new ProductModel("bread", GRAINS),
    //    new ProductModel("butter", DAIRY),
    //    new ProductModel("tomatoes", VEGGIES_FRUIT)
    //];
    editingProduct:ProductModel = null;

    constructor() {
        this.products = JSON.parse(localStorage.getItem("products"));
    }


    editing(product:ProductModel) {
        return this.editingProduct === product;
    }

    startEditing(product:ProductModel) {
        this.editingProduct = product;
    }

    stopEditing() {
        this.editingProduct = null;
    }

    saveToLocalStorage() {
        localStorage.setItem("products", JSON.stringify(this.products));
    }

    addProduct(product:ProductModel) {
        this.products = [product, ...this.products];
        this.saveToLocalStorage();
    }

    updateProduct(product:ProductModel, updatedProduct) {
        //console.log(product, updatedProduct);
        const i = this.products.indexOf(product);
        setTimeout(() => {
            this.products = [
                ...this.products.slice(0, i),
                updatedProduct,
                ...this.products.slice(i + 1)
            ];
            this.saveToLocalStorage();
        }, 0);
    }

    toggleBought(product:ProductModel) {
        const status = product.status == BoughtStatus.bought ? BoughtStatus.not_bought : BoughtStatus.bought;
        const toggledProduct = (<any>Object).assign({}, product, {status});

        this.updateProduct(product, toggledProduct);
    }
}
