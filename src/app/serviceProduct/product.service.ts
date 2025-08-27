import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Iproducts } from '../iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  search(produit: Iproducts[], term: string): Iproducts[] {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/products';

  constructor(private Http: HttpClient) {}

  getAllProducts(): Observable<Iproducts[]> {
    return this.Http.get<Iproducts[]>(this.apiUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<Iproducts> {
    return this.Http.get<Iproducts>(`${this.apiUrl}/${id}`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse)  {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  searchProduct(produits: Iproducts[], term: string): Iproducts[] {
    if (!term || !term.length) {
      return produits;
    }
    const resultat = produits.filter(produits =>
      produits.name.includes(term) || produits.description.includes(term)
    );
    return resultat;
  }

}

