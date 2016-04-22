//import {Injectable} from 'angular2/core'
//import {Repository} from './repository'
//import {ProductModel} from "../product/services/product-model";
//import * as Firebase from "firebase";
//import {Constants} from "../config/constants";
//import {Observable} from 'rxjs';
//
//@Injectable()
//export class FirebaseRepository implements Repository {
//
//    firebaseRef:Firebase;
//    items:any[];
//
//    constructor(private firebaseUrl:String) {
//        this.firebaseRef = new Firebase(Constants.FIREBASE_DEV_URL);
//        this.items = [];
//    }
//
//    getItems$():Observable<any[]> {
//        return Observable.create((observer) => {
//            this.items = [];
//            this.firebaseRef.on("child_added", (snapshot) => {
//                this.items.push(snapshot.val());
//                observer.next(this.items);
//            });
//            this.firebaseRef.on("child_changed", (snapshot) => {
//                this.items.push(snapshot.val());
//                observer.next(this.items);
//            });
//            this.firebaseRef.on("child_removed", (snapshot) => {
//                this.items.push(snapshot.val());
//                observer.next(this.items);
//            });
//        });
//    }
//
//    deleteItem$(item):Observable<any> {
//        return Observable.create((observer) => {
//            if (item && item.key) {
//                this.firebaseRef.child(item.key).remove((error) => {
//                    if (error) {
//                        observer.error(error);
//                    } else {
//                        observer.next(item);
//                        observer.complete();
//                    }
//                });
//            } else {
//                observer.error('Cannot delete item=' + item);
//            }
//        });
//    }
//
//    updateItem$(item, updatedItem):Observable<any> {
//        return Observable.create((observer) => {
//            if (item && item.key && updatedItem && typeof updatedItem === 'object') {
//                this.firebaseRef.child(item.key).update(updatedItem, (error) => {
//                    if (error) {
//                        observer.error(error);
//                    } else {
//                        observer.next(item);
//                        observer.complete();
//                    }
//                });
//            } else {
//                observer.error('Cannot update item=', item, updatedItem);
//            }
//        });
//    }
//
//    getItems():Promise<any[]> {
//        return undefined;
//    }
//
//    addItem(item):Promise<any> {
//        return this.firebaseRef.push(item);
//    }
//
//    deleteItem(item):Promise<any> {
//        return undefined;
//    }
//
//    updateItem(item, updatedItem):Promise<any> {
//        return undefined;
//    }
//}
//
//
