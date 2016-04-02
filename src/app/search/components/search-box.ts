import {Component, Output, EventEmitter} from "angular2/core";

@Component({
    selector: 'search-box',
    template: `
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                  mdl-textfield--floating-label mdl-textfield--align-right">
        <label class="mdl-button mdl-js-button mdl-button--icon"
               for="search">
          <i class="material-icons">search</i>
        </label>
        <div class="mdl-textfield__expandable-holder">
          <input class="mdl-textfield__input" #input type="text" (input)="update.emit(input.value)"
                 id="search">
        </div>
    </div>`
})
export class SearchBox {
    @Output() update = new EventEmitter();

    ngOnInit() {
        this.update.emit('');
    }
}

