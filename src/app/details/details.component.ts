import { Component, OnInit} from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Iproducts } from '../iproduct';
import { ProductService } from '../serviceProduct/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
 public product$ !: Observable<Iproducts>
 public selectedSize : string | null = null ;
 public selectedColor : string | null = null ;

 constructor(private productService: ProductService , private route : ActivatedRoute) {}


ngOnInit(): void {

  this.product$ = this.route.paramMap.pipe(
    switchMap(params =>{
      const id  =  Number(params.get('id')) ;
      return this.productService.getProductById(id)
    })
  )
  this.route.queryParamMap.subscribe(params =>{
    this.selectedSize = params.get('size');
    this.selectedColor = params.get('color');
  })
}
}
