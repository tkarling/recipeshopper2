import '../../test/test-helper';

import {ProductModel, DAIRY, GRAINS, VEGGIES_FRUIT} from "../product/services/product-model";
import {FirebaseRepository} from './firebase-repository';
import {Repository} from "./repository";
import {Constants} from "../config/constants";

describe('ProductService Tests', () => {
    let product1:ProductModel = new ProductModel("bread", GRAINS);
    let product2NS:ProductModel = new ProductModel("butter", DAIRY);
    let product3:ProductModel = new ProductModel("tomatoes", VEGGIES_FRUIT);
    let product4Add:ProductModel = new ProductModel("broccoli", VEGGIES_FRUIT);
    const products:ProductModel[] = [product1, product2NS, product3];

    const service:Repository = new FirebaseRepository(Constants.FIREBASE_DEV_URL);
    let shoppings:ProductModel[];
    let favorites:ProductModel[];

    beforeAll(() => {
        service.getItems$().subscribe((items) => {
            console.log("Berofeall-Items=", items);
        })
    });

    beforeEach((done) => {
        done();
    });

    it('Should add item to Firebase', (done) => {
        service.addItem(new ProductModel("Kakki")).then((items) => {
            expect(items.length).toBe(1);
            expect(items[0].name).toEqual("Bulla");
            done();
        });
    });

    // it('Should get items', (done) => {
    //     service.getItems().then((items) => {
    //         expect(items.length).toBe(0);
    //         // expect(items[0].name).toEqual("Bulla");
    //         done();
    //     }).catch((error) => {
    //         console.log(error);
    //         done();
    //     });
    // });

    it('Should get observable', (done) => {
        service.getItems$().subscribe((items) => {
            console.log("Items=", items);
        })
    });

    // it('Should return favorites', (done) => {
    //     expect(favorites.length).toEqual(3);
    //     done();
    // });
    //
    // it('Should return shoppings', (done) => {
    //     expect(shoppings.length).toEqual(2);
    //     done();
    // });
    //
    // it('Should add product', (done) => {
    //     service.addProduct(product4Add);
    //     updateLists().then(() => {
    //         //console.log('add favorites', favorites);
    //         expect(shoppings.length).toEqual(3);
    //         expect(favorites.length).toEqual(4);
    //         done();
    //     });
    // });

});
