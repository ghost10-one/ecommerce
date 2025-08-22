import { Observable, Subject } from 'rxjs';
import { Iproducts } from '../iproduct';
import { ProductService } from './../serviceProduct/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public products$! : Observable<Iproducts[]>

  private searchTerm = new Subject<string>();

  constructor( private ProductService: ProductService) { }

  ngOnInit(): void {

    this.products$ = this.ProductService.getAllProducts() ;
  }

}
