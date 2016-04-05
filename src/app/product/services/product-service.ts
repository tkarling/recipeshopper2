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
            try {
                const productsInLocalStorage = JSON.parse(localStorage.getItem("products"));
                if(productsInLocalStorage && productsInLocalStorage.length > 0) {
                    productsInLocalStorage.forEach((product) => {
                        this.products.push(this.deserialize(product, ProductModel));
                    });
                }
            } catch (err) {
                console.log('error reading from local storage', err);
                this.products = [];
            }
        } else {
            console.log('no local storage');
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
        try {
            localStorage.setItem("products", JSON.stringify(this.products));
        } catch (err) {
            console.warn('error writing to loca storage', err);
        }
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
