import {Injectable} from "angular2/core";
import {ProductModel} from "./product-model";

import {BoughtStatus,
    DAIRY, GRAINS, VEGGIES_FRUIT, EXTRAS} from './product-model';

@Injectable()
export class ProductService {
    products:ProductModel[] = [];
    editingProduct:ProductModel = null;

    constructor() {
        if (localStorage) {
            const productsInLocalStorage = JSON.parse(localStorage.getItem("products"));
            productsInLocalStorage.forEach((product) => {
                this.products.push(this.deserialize(product, ProductModel));
            });
        } else {
            console.log('no local storage');
            this.products = [
                new ProductModel("bread", GRAINS),
                new ProductModel("butter", DAIRY),
                new ProductModel("tomatoes", VEGGIES_FRUIT)
            ];
        }
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

    deserialize(json, clazz) {
        var instance = new clazz();
        for (var prop in json) {
            if (!json.hasOwnProperty(prop)) {
                continue;
            }
            if (typeof json[prop] === 'object') {
                instance[prop] = this.deserialize(json[prop], clazz[prop]);
            } else {
                instance[prop] = json[prop];
            }
        }
        return instance;
    }

}
