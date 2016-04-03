import {Injectable} from "angular2/core";
import {ProductModel} from "./product-model";

import {BoughtStatus,
    DAIRY, GRAINS, VEGGIES_FRUIT, EXTRAS} from './product-model';

@Injectable()
export class ProductService {
    products:ProductModel[] = [
        new ProductModel("bread", GRAINS),
        new ProductModel("butter", DAIRY),
        new ProductModel("tomatoes", VEGGIES_FRUIT)
    ];

    addProduct(product:ProductModel) {
        this.products = [product, ...this.products];
    }

    toggleBought(product:ProductModel) {
        const i = this.products.indexOf(product);
        const status = product.status == BoughtStatus.bought ? BoughtStatus.not_bought : BoughtStatus.bought;
        //const toggledProduct = Object.assign({}, product, {status});
        const toggledProduct = (<any>Object).assign({}, product, {status});

        this.products = [
            ...this.products.slice(0, i),
            toggledProduct,
            ...this.products.slice(i + 1)
        ];
    }
}
