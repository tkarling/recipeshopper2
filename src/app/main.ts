/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
import {Control} from "angular2/common";

import {SearchBox} from "./search/components/search-box";

import {ProductInput} from "./product/components/product-input";
import {ProductList} from "./product/components/product-list";
//import {StatusSelector} from "./todo/components/status-selector";

import {ProductService} from "./product/services/product-service";

@Component({
    selector: 'app',
    directives: [ProductInput, ProductList, SearchBox], // TodoInput, TodoList, StatusSelector,
    template: `<div>
        <search-box (update)="term = $event"></search-box>
        <product-input></product-input>
        <product-list
            [term]="term"
        ></product-list>
    </div>`
})
class App {
}

bootstrap(App, [ProductService]);

/*
//`<div>
//    <search-box (update)="term = $event"></search-box>
//    <todo-input></todo-input>
//    <status-selector (select)="status = $event"></status-selector>
//    <todo-list
//        [status]="status"
//        [term]="term"
//    ></todo-list>
//    </div>`
    */