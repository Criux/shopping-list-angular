import { HttpModule } from '@angular/http';
// Product class to define this object's properties.
export class Product {
    constructor(
        public id: string,
        public name: string,
        public originalPrice: number,
        public description2: string,
        public pictureUrl: string
    ){}
}
