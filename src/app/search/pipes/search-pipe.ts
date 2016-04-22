import {Pipe} from "angular2/core";

@Pipe({
    name: "search"
})
export class SearchPipe {
    transform(value, [term]) {
        const lowerCaseTerm = term ? term.toLowerCase() : '';
        if(value) {
            return value.filter((item)=>
                (item.name && item.name.toLowerCase().includes(lowerCaseTerm)) ||
                (item.aisle && item.aisle.toLowerCase().includes(lowerCaseTerm)) ||
                (item.category && item.category.toLowerCase().includes(lowerCaseTerm)));
        } else {
            return null;
        }
    }
}
