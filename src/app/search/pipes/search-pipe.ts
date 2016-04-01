import {Pipe} from "angular2/core";

@Pipe({
    name: "search"
})
export class SearchPipe {
    transform(value, [term]) {
        const lowerCaseTerm = term ? term.toLowerCase() : '';
        return value.filter((item)=>
        item.name.toLowerCase().includes(lowerCaseTerm) ||
        item.aisle.toLowerCase().includes(lowerCaseTerm));
    }
}
