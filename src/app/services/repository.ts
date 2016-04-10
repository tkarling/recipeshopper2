import {OpaqueToken} from "angular2/core";

interface Repository {
    getItems():Promise<any[]>
    addItem(item):Promise<any>
    deleteItem(item):Promise<any>
    updateItem(item, updatedItem):Promise<any>
}

const REPOSITORY_TOKEN:OpaqueToken = new OpaqueToken('Repository');

export {Repository, REPOSITORY_TOKEN};
