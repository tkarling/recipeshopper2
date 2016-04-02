/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";
//import {Control} from "angular2/common";

import {ProductListPage} from "./product/product-list-page";

import {ProductService} from "./product/services/product-service";

@Component({
    selector: 'app',
    directives: [ProductListPage],
    template: `
    <style>
    </style>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header
            mdl-layout--fixed-tabs mdl-layout--no-drawer-button">
          <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
              <span class="mdl-layout-title">RShopper</span>
            <div class="mdl-layout-spacer"></div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                  mdl-textfield--floating-label mdl-textfield--align-right">
                <label class="mdl-button mdl-js-button mdl-button--icon"
                       for="fixed-header-drawer-exp">
                  <i class="material-icons">search</i>
                </label>
                <div class="mdl-textfield__expandable-holder">
                  <input class="mdl-textfield__input" type="text" name="sample"
                         id="fixed-header-drawer-exp">
                </div>
          </div>
          <!-- Right aligned menu below button -->
            <button id="demo-menu-lower-right"
                    class="mdl-button mdl-js-button mdl-button--icon">
              <i class="material-icons">more_vert</i>
            </button>

            <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                for="demo-menu-lower-right">
              <li class="mdl-menu__item">Some Action</li>
              <li class="mdl-menu__item">Another Action</li>
              <li disabled class="mdl-menu__item">Disabled Action</li>
              <li class="mdl-menu__item">Yet Another Action</li>
            </ul>
            </div>
            <!-- Tabs -->
            <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
              <a href="#fixed-tab-1" class="mdl-layout__tab is-active">Shopping</a>
              <a href="#fixed-tab-2" class="mdl-layout__tab">Favorites</a>
              <a href="#fixed-tab-3" class="mdl-layout__tab">Recipes</a>
            </div>
          </header>
          <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">Recipe Shopper</span>
            <nav class="mdl-navigation">
              <a class="mdl-navigation__link" href="">Settings</a>
              <a class="mdl-navigation__link" href="">Login</a>
            </nav>
          </div>
          <main class="mdl-layout__content">
                <section class="mdl-layout__tab-panel is-active" id="fixed-tab-1">
                  <div class="page-content"><product-list-page></product-list-page></div>
                </section>
                <section class="mdl-layout__tab-panel" id="fixed-tab-2">
                  <div class="page-content"><!-- Your content goes here --></div>
                </section>
                <section class="mdl-layout__tab-panel" id="fixed-tab-3">
                  <div class="page-content"><!-- Your content goes here --></div>
                </section>

          </main>
    </div>`
})
class App {
}

bootstrap(App, [ProductService]);

