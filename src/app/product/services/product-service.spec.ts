import '../../../test/test-helper.ts';

import {Repository} from '../../services/repository';
import {MockRepository} from '../../services/mock-repository';

import {ProductModel, BoughtStatus, DAIRY, GRAINS, VEGGIES_FRUIT} from './product-model';
import {ProductService} from './product-service';
import {Observable} from 'rxjs';

let product1Buy:ProductModel = new ProductModel("bread", GRAINS);
let product2NS:ProductModel = new ProductModel("butter", DAIRY);
let product3Del:ProductModel = new ProductModel("tomatoes", VEGGIES_FRUIT);
let product4Add:ProductModel = new ProductModel("broccoli", VEGGIES_FRUIT);
const products:ProductModel[] = [product1Buy, product2NS, product3Del];

const service:ProductService = new ProductService(new MockRepository(products));

describe('ProductService Tests', () => {
    let noOfProducts, noOfShoppings, noOfFavorites;

    function checkAmounts(noProducts, noShoppings, noFavorites) {
        expect(service.products.length).toEqual(noProducts);
        expect(service.shoppings.length).toEqual(noShoppings);
        expect(service.favorites.length).toEqual(noFavorites);
    }

    beforeAll((done) => {
        service.refreshProducts().then(() => {
            service.toggleOnList(product2NS).then(() => {
                done();

            });
        });
    });

    beforeEach(() => {
        noOfProducts = service.products.length;
        noOfShoppings = service.shoppings.length;
        noOfFavorites = service.favorites.length;
    });

    it('Should return products', (done) => {
        expect(service.products.length).toEqual(noOfProducts);
        done();
    });

    it('Should return shoppings', (done) => {
        expect(service.shoppings.length).toEqual(noOfProducts - 1);
        done();
    });

    it('Should return favorites', (done) => {
        expect(service.favorites.length).toEqual(noOfProducts);
        done();
    });

    it('Should add product', (done) => {
        service.addProduct(product4Add).then(() => {
            checkAmounts(noOfProducts + 1, noOfShoppings + 1, noOfFavorites + 1);
            done();
        });
    });

    it('Should delete product', (done) => {
        service.deleteProduct(product3Del).then(() => {
            checkAmounts(noOfProducts - 1, noOfShoppings - 1, noOfFavorites - 1);
            done();
        });
    });

    it('Should buy product', (done) => {
        function boughtProducts() {
            return service.products.filter((product) => {
                return product.status === BoughtStatus.bought;
            });
        }

        expect(boughtProducts().length).toEqual(0);
        service.toggleBought(product1Buy).then(() => {
            checkAmounts(noOfProducts, noOfShoppings, noOfFavorites);
            expect(boughtProducts().length).toEqual(1);
            done();
        });
    });

});

