interface Repository {
    getItems(): Promise
    addItem(item): Promise
    deleteItem(item): Promise
    updateItem(item): Promise
}