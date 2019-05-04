import { HttpModule } from '@angular/http';
import { Product } from './product';

export class ListElement {
	constructor(
        public list_id: string,
        public product: Product,
        public amount:number,
        public isActive:boolean
    ){}
    
}
