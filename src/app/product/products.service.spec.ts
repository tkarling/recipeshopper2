import {Injectable, Inject} from "angular2/core";
import {Observable} from 'rxjs';
//import {AngularFire, defaultFirebase, FIREBASE_PROVIDERS, FirebaseListObservable,FirebaseDatabase} from 'angularfire2';

import {FB_BASE_PATH} from '../config/constants';
import '../../test/test-helper.ts';

import {ProductModel, DAIRY, GRAINS, VEGGIES_FRUIT} from './services/product-model';
import {ProductsService} from './products.service';

let product1Buy:ProductModel = new ProductModel("bread", GRAINS);
let product2NS:ProductModel = new ProductModel("butter", DAIRY);
let product3Del:ProductModel = new ProductModel("tomatoes", VEGGIES_FRUIT);
let product4Add:ProductModel = new ProductModel("broccoli", VEGGIES_FRUIT);
let product5Upd:ProductModel = new ProductModel("milk", DAIRY);
//const products:ProductModel[] = [product1Buy, product2NS, product3Del, product5Upd];


class MockProductList {
    products:any = [];
    key: number = 0;

    constructor(products) {
        this.products = products;
    }

    push(item) {
        item.$key = this.key++;
        this.products.push(item);
    }

    remove(item) {
        const i = this.products.indexOf(item);
        this.products.splice(i, 1);
    }

    update(item, updatedFields) {
        const i = this.products.indexOf(item);
        this.products[i] = (<any>Object).assign({}, this.products[i], updatedFields);
    }

}

class MockDatabase {
    products:MockProductList;

    constructor(products) {
        this.products = new MockProductList(products);
    }

    $list() {
        return this.products.products;
    }

    $me() {
        return this.products;
    }
}

class MockAngularFire {
    database:any = new MockDatabase([]);
}



describe('ProductsService', () => {
    const service:ProductsService = new ProductsService(null);
    service.$setMock(new MockAngularFire());
    service.addProduct(product1Buy);
    service.addProduct(product2NS);
    service.addProduct(product3Del);
    service.addProduct(product5Upd);

    function getItem(name) {
        return service.$products().find((item) => {
            return (<ProductModel> item).name === name
        });
    }

    describe('CRUD Tests', () => {
        let noOfProducts;

        //beforeAll(() => {
        //    console.log('products', service.$products());
        //});


        beforeEach(() => {
            noOfProducts = service.$products().length;
        });


        it('Should return products', () => {
            expect(service.$products().length).toEqual(4);
            //done();
        });

        it('Should add product', () => {
            service.addProduct(product4Add);
            expect(service.$products().length).toEqual(noOfProducts + 1);
        });

        it('Should delete product', () => {
            service.removeProduct(product3Del);
            expect(service.$products().length).toEqual(noOfProducts - 1);
        });

        it('Should update product', () => {
            service.updateProduct(product5Upd, <ProductModel> {name: 'skim milk'});
            expect(service.$products().length).toEqual(noOfProducts);
            expect(service.$products().find((item) => {
                return (<ProductModel> item).name === 'skim milk'
            })).toBeDefined();
        });

        it('Should toggle Bought', () => {
            let item = getItem(product1Buy.name);
            expect(item.isBought).toEqual(false);

            service.toggleBought(item);

            expect(service.$products().length).toEqual(noOfProducts);
            item = getItem(product1Buy.name);
            expect(item.isBought).toEqual(true);
        });

        it('Should toggle onLIst', () => {
            let item = getItem(product2NS.name);
            expect(item.onList).toEqual(true);

            service.toggleOnList(item);

            expect(service.$products().length).toEqual(noOfProducts);
            item = getItem(product2NS.name);
            expect(item.onList).toEqual(false);
        });

    });

    describe('editing Tests', () => {
        it('Should not be editing', () => {
            service.$products().forEach((item) => {
                expect(service.editing(<ProductModel> item)).toBeFalsy();
            });
        });

        it('Should start editing', () => {
            service.startEditing(getItem(product2NS.name));
            expect(service.editing(getItem(product2NS.name))).toBeTruthy();
            expect(service.editing(getItem(product1Buy.name))).toBeFalsy();
        });

        it('Should stop editing', () => {
            service.stopEditing();
            service.$products().forEach((item) => {
                expect(service.editing(<ProductModel> item)).toBeFalsy();
            });
        });

    });

});

