import '../../../test/test-helper';

import {Repository} from '../../services/repository';

import {ProductModel} from '../services/product-model';
import {ProductService} from './../services/product-service';

import {ProductInput} from './product-input';

describe('ProductInput Add Tests', () => {
    let input:ProductInput;
    let service:ProductService = new ProductService(<Repository>{});

    beforeEach(() => {
        input = new ProductInput(service);
    });

    it('Should init for add', () => {
        const addProductModel: ProductModel = new ProductModel();

        input.ngOnInit();

        expect(input.adding).toBe(true);
        expect(input.productModel).toEqual(addProductModel);
    });
});
 