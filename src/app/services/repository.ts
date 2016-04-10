export interface Repository {
    getItems(): Promise<Array<any>>
    addItem(item): Promise<any>
    deleteItem(item): Promise<any>
    updateItem(item): Promise<any>
}