import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../product.service';
import { Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Product } from '../product';
import { HttpModule } from '@angular/http';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css'],
  providers: [ProductService]
})
export class ShoppinglistComponent implements OnInit {
	
	products: Product[];
	options: Product[];
	disabled:Boolean=false;
  constructor(private productService: ProductService) {
  }
  filteredOptions: Observable<Product[]>;
  ngOnInit() {
  	this.productService.readProducts()
            .subscribe(products =>
                this.products=products
                //this.products=products
            );
    //this.products=[{"id":"REWE1000654","name":"Rügenwalder Mühle Mühlen-Würstchen Geflügel 222g","originalPrice":2.79,"description2":"Zutaten: Geflügelfleisch 66% (Puten-,Hähnchenfleisch), Geflügelfett mit Haut, Trinkwasser, Kochsalz, Glucosesirup, Gewürze, Gewürzextrakte, Stabilisator: Diphosphate, Antioxidationsmittel: Ascorbinsäure, Konservierungsstoff: Natriumnitrit, essbare Hülle aus Rinderkollagen, Rauch.","pictureUrl":"https://img.rewe-static.de/1000654/21884414_digital-image.png?output-quality=75&fit=inside|600:600"},
    //{"id":"REWE100077","name":"Frigeo Traubenzucker-Lolly Kettenpack Tropic 8x7,5g","originalPrice":0.75,"description2":"Zutaten: 89 % Dextrose (Traubenzucker), Maltodextrin, Säuerungsmittel: Citronensäure und L(+)-Weinsäure, pflanzliche Fette (Raps) ganz gehärtet, Trennmittel: Mono- und Diglyceride von Speisefettsäuren, Glukosesirup, Aromen.","pictureUrl":"https://img.rewe-static.de/0100077/23077890_digital-image.png?output-quality=75&fit=inside|600:600"}];
    this.options=[];
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Product>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }
  myControl=new FormControl('');
displayFn(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();
    if(name.length>=3){
    	this.options=this.products;
    	//return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    	return this.options.filter(option => option.name.toLowerCase().includes(filterValue.toLowerCase()));
    }else{
    	 this.options=[];
    }
    
  }  	
}

export class ShoppingList { 
	
}