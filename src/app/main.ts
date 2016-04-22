/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from "angular2/platform/browser";
import {Component, provide, OpaqueToken} from "angular2/core";
import {provideStore} from '@ngrx/store';
import {AngularFire, defaultFirebase, FIREBASE_PROVIDERS, FirebaseListObservable} from 'angularfire2';

import {FB_BASE_PATH} from './config/constants';

import {SearchBox} from "./search/components/search-box";

import {ProductInput} from "./product/components/product-input";
import {ProductList, ProductListType} from "./product/components/product-list";

import {RecipeList} from "./recipe/recipe-list.component";
import {recipes} from './recipe/recipes.reducer';

import {LocalStorageService} from "./services/local-storage-service";
import {Repository, REPOSITORY_TOKEN} from './services/repository';
import {ProductService} from "./product/services/product-service";


@Component({
    selector: 'app-menu',
    template: `
        <button id="demo-menu-lower-right" class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">more_vert</i>
        </button>
        <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            for="demo-menu-lower-right">
          <li class="mdl-menu__item">Settings</li>
          <li class="mdl-menu__item">Login</li>
        </ul>`
})
class AppMenu {
}

@Component({
    selector: 'app',
    directives: [ProductInput, ProductList, RecipeList, SearchBox, AppMenu],
    providers: [
        //FIREBASE_PROVIDERS, defaultFirebase(FB_BASE_PATH),
        provide(REPOSITORY_TOKEN, {useClass: LocalStorageService}), ProductService, provideStore({recipes})],
    template: `
    <style>
        .app-container {
          max-width: 600px;
          margin: auto;
        }
    </style>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header
            mdl-layout--fixed-tabs mdl-layout--no-drawer-button">
          <header class="mdl-layout__header">
                <div class="mdl-layout__header-row">
                    <span class="mdl-layout-title">RShopper</span>
                    <div class="mdl-layout-spacer"></div>
                    <search-box (update)="term = $event"></search-box>
                    <button class="mdl-button mdl-js-button mdl-button--icon"
                    (click)="showAdd = !showAdd">
                        <i class="material-icons">add</i>
                    </button>
                    <app-menu></app-menu>
                </div>
                <!-- Tabs -->
                <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
                    <a href="#fixed-tab-1" class="mdl-layout__tab is-active">Shopping</a>
                    <a href="#fixed-tab-2" class="mdl-layout__tab">Favorites</a>
                    <a href="#fixed-tab-3" class="mdl-layout__tab">Recipes</a>
                </div>
          </header>
          <main class="mdl-layout__content">
                <!--{{diagnostic}}-->
                <section class="mdl-layout__tab-panel is-active" id="fixed-tab-1">
                    <div class="page-content app-container">
                        <product-list [showAdd]="showAdd" [term]="term" [type]="ProductListType.shopping"></product-list>
                    </div>
                </section>
                <section class="mdl-layout__tab-panel" id="fixed-tab-2">
                    <div class="page-content app-container">
                        <product-list [showAdd]="showAdd" [term]="term" [type]="ProductListType.favorites"></product-list>
                    </div>
                </section>
                <section class="mdl-layout__tab-panel" id="fixed-tab-3">
                    <div class="page-content app-container">
                        <recipe-list [showAdd]="showAdd"></recipe-list>
                    </div>
                </section>
          </main>
    </div>`
})
class App {
    showAdd:  boolean = false;

    get ProductListType() {
        return ProductListType;
    }

    // TODO: Remove this when we're done
    get diagnostic() { return 'app: ' + JSON.stringify(FB_BASE_PATH); }
}

bootstrap(App, [FIREBASE_PROVIDERS, defaultFirebase(FB_BASE_PATH)]);

