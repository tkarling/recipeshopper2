import {Injectable, Inject} from "angular2/core";
import {AngularFire, defaultFirebase, FIREBASE_PROVIDERS, FirebaseListObservable} from 'angularfire2';

import {ProductModel} from "./services/product-model";

@Injectable()
export class ProductsService {
    products:FirebaseListObservable<any[]>;
    editingProductKey:String = '';

    constructor(private angularFire: AngularFire) {
        this.products = angularFire.database.list('/products');
    }

    editing(product:ProductModel) {
        return this.editingProductKey === product.$key;
    }

    startEditing(product:ProductModel) {
        this.editingProductKey = product.$key;
    }

    stopEditing() {
        this.editingProductKey = '';
    }

    addProduct(newProduct:ProductModel) {
        this.products.push(newProduct);
    }

    updateProduct(product:ProductModel, updatedProduct:ProductModel) {
        this.products.update(product, updatedProduct);
        this.stopEditing();
    }

    toggleOnList(product: ProductModel) {
        this.products.update(product, {onList: ! product.onList});
    }

    toggleBought(product: ProductModel) {
        this.products.update(product, {isBought: ! product.isBought});
    }

    removeProduct(product:ProductModel) {
        this.products.remove(product.$key);
    }

}
