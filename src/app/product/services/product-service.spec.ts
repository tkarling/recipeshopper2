import '../../../test/test-helper.ts';

import {ProductModel, DAIRY, GRAINS, VEGGIES_FRUIT} from './product-model';
import {ProductService} from './product-service';

describe('ProductService Tests', () => {
    let product1: ProductModel = new ProductModel("bread", GRAINS);
    let product2NS: ProductModel =  new ProductModel("butter", DAIRY);
    let product3: ProductModel =  new ProductModel("tomatoes", VEGGIES_FRUIT);
    let product4Add: ProductModel =  new ProductModel("broccoli", VEGGIES_FRUIT);
    const products:ProductModel[] = [ product1, product2NS, product3];

    const service:ProductService = new ProductService();
    let shoppings: ProductModel[];
    let favorites: ProductModel[];

    const updateLists = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                favorites = service.favorites;
                shoppings = service.shoppings;
                //console.log('favorites', favorites);
                resolve('done');
            }, 100);
        });
    };

    beforeAll(() => {
        service.$setProducts(products);
        service.toggleOnList(product2NS);
    });

    beforeEach((done) => {
        updateLists().then(()=> {
            done();
        });
    });

    it('Should return favorites', (done) => {
        expect(favorites.length).toEqual(3);
        done();
    });

    it('Should return shoppings', (done) => {
        expect(shoppings.length).toEqual(2);
        done();
    });

    it('Should add product', (done) => {
        service.addProduct(product4Add);
        updateLists().then(() => {
            //console.log('add favorites', favorites);
            expect(shoppings.length).toEqual(3);
            expect(favorites.length).toEqual(4);
            done();
        });
    });

});