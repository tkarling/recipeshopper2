import {Injectable} from "angular2/core";
import {Repository} from './repository';
import {Observable} from 'rxjs';

@Injectable()
export class LocalStorageService implements Repository {
    private storageKey:string = 'products';
    private items:Object[] = [];

    getFromLocalStorage() {
        if (localStorage) {
            try {
                this.items = JSON.parse(localStorage.getItem(this.storageKey));
            } catch (err) {
                console.log('error reading from local storage: ', this.storageKey, err);
                this.items = [];
            }
        } else {
            console.log('no local storage');
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        } catch (err) {
            console.warn('error writing to local storage', err);
        }
    }

    getItems():Promise<any[]> {
        if (this.items.length === 0) {
            this.getFromLocalStorage();
        }
        return Promise.resolve(this.items);
    }

    addItem(item):Promise<any> {
        this.items = [item, ...this.items];
        this.saveToLocalStorage();
        return Promise.resolve(item);
    }

    deleteItem(item):Promise<any> {
        const i = this.items.indexOf(item);
        this.items = [
            ...this.items.slice(0, i),
            ...this.items.slice(i + 1)
        ];
        this.saveToLocalStorage();
        return Promise.resolve(item);
    }

    updateItem(item, updatedItem):Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const i = this.items.indexOf(item);
                this.items = [
                    ...this.items.slice(0, i),
                    updatedItem,
                    ...this.items.slice(i + 1)
                ];
                this.saveToLocalStorage();
                return resolve(updatedItem);
            });
        });
    }

    getItems$():Observable<any[]> {
        return undefined;
    }

    deleteItem$(item):Observable<any> {
        return undefined;
    }

    updateItem$(item, updatedItem):Observable<any> {
        return undefined;
    }
}