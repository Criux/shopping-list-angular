import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Product } from '../product';
import { ListElement } from '../list-element';
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
  userShoppingList: ListElement[];
  userShoppingListActive: ListElement[];
  userShoppingListInactive: ListElement[];
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
    this.userShoppingList=[];
    this.userShoppingListActive=[];
    this.userShoppingListInactive=[];
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
    console.log("input value length:"+this.myControl.value.length+" - "+name.length);
    if(this.myControl.value.length>=3){
    	this.options=this.products;
    	//return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    	return this.options.filter(option => option.name.toLowerCase().includes(filterValue.toLowerCase())).slice(1,6);
    }else{
    	 this.options=[];
       name='';
    }
    
  }
  addToList(product:Product){
    let toAdd:ListElement = {"list_id":"1","product":product,"amount":1,"isActive":true};
    this.userShoppingList.push(toAdd);
    this.updateLists();
    if(this.myControl!==undefined){
      this.myControl.setValue('');  
    }
    this.options=[];
  }
  showAmount(listElement:ListElement):String{
      return listElement.amount>1?"(x"+listElement.amount+")":"";
  }
  toggleElementStatus(listElement:ListElement){
    listElement.isActive=!listElement.isActive;
    this.updateLists();
  }
  private updateLists(){
    console.log("updating lists");
    this.userShoppingListActive=[];
    this.userShoppingListInactive=[];
    for(let listElement of this.userShoppingList){
      listElement.isActive?this.userShoppingListActive.push(listElement):this.userShoppingListInactive.push(listElement);
    }
  }
  displayHR():boolean{
    return this.userShoppingListInactive.length>0;
    
  }
  displayHelperMessage():boolean{
    return this.userShoppingListActive.length==0;
  }  	
}

export class ShoppingList { 
	
}