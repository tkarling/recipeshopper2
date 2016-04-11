import {OpaqueToken} from "angular2/core";
import {Observable} from 'rxjs';

interface Repository {
    getItems():Promise<any[]>
    getItems$():Observable<any[]>
    addItem(item):Promise<any>
    deleteItem(item):Promise<any>
    deleteItem$(item):Observable<any>
    updateItem(item, updatedItem):Promise<any>
    updateItem$(item, updatedItem):Observable<any>
}

const REPOSITORY_TOKEN:OpaqueToken = new OpaqueToken('Repository');

export {Repository, REPOSITORY_TOKEN};
