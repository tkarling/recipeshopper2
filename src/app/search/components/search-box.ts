import {Component, Output, EventEmitter} from "angular2/core";

@Component({
    selector:'search-box',
    template:`<div>
        <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" id="search" #input type="text" (input)="update.emit(input.value)">
            <label class="mdl-textfield__label" for="search">Search</label>
        </div>
    </div>`
})
export class SearchBox{
    @Output() update = new EventEmitter();

    ngOnInit(){
        this.update.emit('');
    }
}