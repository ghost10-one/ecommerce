import { debounce, debounceTime, distinctUntilChanged, Observable, Subject, Subscription, switchMap, take, tap } from 'rxjs';
import { Iproducts } from '../iproduct';
import { ProductService } from './../serviceProduct/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // public products$! : Observable<Iproducts[]>
  public products$! : Subscription
  private searchTerm = new Subject<string>();
  searchResults$ = new Subject<Iproducts[]>()
  searchSubscription !: Subscription

  constructor( private ProductService: ProductService) { }

  onSearchChange(event : any) :void {
    const term = event.target.value ;
    this.searchTerm.next(term)
  }
  ngOnInit(): void {
    // this.products$ = this.ProductService.getAllProducts() ;

    this.products$ = this.ProductService.getAllProducts().pipe(
      take(1) ,
      tap(products => this.searchResults$.next(products)) ,
      tap(produit => {
        this.searchSubscription = this.searchTerm.pipe(
          debounceTime(300) ,
          distinctUntilChanged() ,
          switchMap((term : String) =>{
            this.searchResults$.next(this.ProductService.search(produit , term))
            return this.searchResults$
          })
        ).subscribe()
      })
    ).subscribe()

  }

}
