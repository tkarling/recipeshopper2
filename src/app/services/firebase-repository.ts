import {Injectable} from 'angular2/core'
import {Repository} from './repository'
import {ProductModel} from "../product/services/product-model";
import * as Firebase from "firebase";
import {Constants} from "../config/constants";

@Injectable()
export class FirebaseRepository implements Repository {

    firebaseRef:Firebase;

    constructor(private firebaseUrl:String) {
        this.firebaseRef = new Firebase(Constants.FIREBASE_DEV_URL);
    }

    getItems():Promise<Array<any>> {
        let promise:Promise<Array<any>>;
        this.firebaseRef.child("/").on("value", function(snapshot) {
            let items = [];
            items.push(snapshot.val());
            // items.push(new ProductModel("Maggara"));
        });
        return promise;
    }

    addItem(item):Promise<any> {
        return this.firebaseRef.set(new ProductModel("Bulla"));
    }

    deleteItem(item):Promise<any> {
        return undefined;
    }

    updateItem(item):Promise<any> {
        return undefined;
    }
}


