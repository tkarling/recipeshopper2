import {Observable} from 'rxjs';

import {Repository} from './repository';

class MockRepository implements Repository {
    private items:Object[] = [];

    constructor(items: any[]) {
        this.items = items;
    }
    getItems():Promise<any[]> {
        //this.items = this.items.length > 0 ? this.items : products;
        return Promise.resolve(this.items);
    }

    addItem(item):Promise<any> {
        this.items = [item, ...this.items];
        return Promise.resolve(item);
    }

    deleteItem(item):Promise<any> {
        const i = this.items.indexOf(item);
        this.items = [
            ...this.items.slice(0, i),
            ...this.items.slice(i + 1)
        ];
        return Promise.resolve(item);
    }

    updateItem(item, updatedItem):Promise<any> {
        const i = this.items.indexOf(item);
        this.items = [
            ...this.items.slice(0, i),
            updatedItem,
            ...this.items.slice(i + 1)
        ];
        return Promise.resolve(updatedItem);
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

export {MockRepository};

