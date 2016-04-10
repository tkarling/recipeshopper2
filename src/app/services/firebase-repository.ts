import {Injectable} from 'angular2/core'
import {Repository} from './repository'
import {ProductModel} from "../product/services/product-model";

@Injectable()
export class FirebaseRepository implements Repository {

    constructor(private firebaseUrl : String) {
        this.firebaseUrl = firebaseUrl;
    }
    
    getItems():Promise<Array<any>> {
        var items = [];
        items.push(new ProductModel("Bulla"));
        items.push(new ProductModel("Maggara"));
        return Promise.resolve(items);
    }

    addItem(item):Promise<any> {
        return undefined;
    }

    deleteItem(item):Promise<any> {
        return undefined;
    }

    updateItem(item):Promise<any> {
        return undefined;
    }
}


