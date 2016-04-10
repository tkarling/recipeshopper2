import {Injectable, Inject} from "angular2/core";
import {ProductModel} from "./product-model";

import {Repository, REPOSITORY_TOKEN} from '../../services/repository';
import {LocalStorageService} from '../../services/local-storage-service';

import {BoughtStatus,
    DAIRY, GRAINS, VEGGIES_FRUIT, EXTRAS} from './product-model';

@Injectable()
export class ProductService {
    repository:Repository;
    products:ProductModel[] = [];
    editingProduct:ProductModel = null;

    constructor(@Inject(REPOSITORY_TOKEN) repository:Repository) {
        if (repository && repository.getItems) {
            this.repository = repository;
            repository.getItems().then((items) => {
                this.products = items;
            }).catch((err)=> {
                console.warn('ProductService: error getting items', err);
            });
        } else {
            console.warn('ProductService: no repository');
        }
    }

    get shoppings() {
        return this.products.filter((product) => {
            return product.onList;
        });
    }

    get favorites() {
        return this.products;
    }

    refreshProducts() {
        return this.repository.getItems().then((items) => {
            this.products = items;
        });
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

    addProduct(product:ProductModel) {
        return this.repository.addItem(product).then(() => {
            return this.refreshProducts();
        });
    }

    updateProduct(product:ProductModel, updatedProduct:ProductModel) {
        return this.repository.updateItem(product, updatedProduct).then(() => {
            return this.refreshProducts();
        });
    }

    deleteProduct(product:ProductModel) {
        return this.repository.deleteItem(product).then(() => {
            return this.refreshProducts();
        });
    }

    toggleBought(product:ProductModel) {
        const status = product.status === BoughtStatus.bought ? BoughtStatus.not_bought : BoughtStatus.bought;
        const toggledProduct:ProductModel = <ProductModel>(<any>Object).assign({}, product, {status});

        return this.updateProduct(product, <ProductModel>toggledProduct);
    }

    toggleOnList(product:ProductModel) {
        const onList = !product.onList;
        const status = BoughtStatus.not_bought;
        const toggledProduct:ProductModel = <ProductModel>(<any>Object).assign({}, product, {onList, status});

        return this.updateProduct(product, toggledProduct);
    }

}
