import {Pipe} from "angular2/core";
import {ProductListType} from './components/product-list';

@Pipe({
    name: "onlist"
})
export class OnlistPipe {
    transform(value, [type]) {
        if(value && type === ProductListType.shopping) {
            return value.filter((item) => item.onList);
        } else {
            return value ? value: null;
        }
    }
}
