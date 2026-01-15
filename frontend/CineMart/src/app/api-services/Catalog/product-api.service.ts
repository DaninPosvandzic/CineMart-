import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProductDto, Product } from './product-api.model';
import { AuthFacadeService } from '../../core/services/auth/auth-facade.service';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private baseUrl = 'https://localhost:7260/Product';

  constructor(
    private http: HttpClient,
    private auth: AuthFacadeService
  ) {}

  /** 🔐 Helper: JWT headers */
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.auth.getAccessToken();
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      })
    };
  }

  /** ✅ CREATE PRODUCT (returns created product ID) */
  create(payload: CreateProductDto): Observable<number> {
    return this.http.post<number>(
      `${this.baseUrl}/Create`,
      payload,
      this.getAuthHeaders()
    );
  }

  /** ✅ GET ALL PRODUCTS WITH SEARCH / SORT / PAGINATION */
getAll(
  page: number = 1,
  pageSize: number = 8,
  search: string = '',
  sortBy: string = 'price',
  sortDir: string = 'asc'
): Observable<{ total: number; items: Product[] }> {

  let params = new HttpParams()
    .set('page', page)
    .set('pageSize', pageSize)
    .set('sortBy', sortBy)
    .set('sortDir', sortDir);

  if (search) {
    params = params.set('search', search);
  }

  return this.http.get<{ total: number; items: Product[] }>(
    `${this.baseUrl}/GetAll`,
    {
      ...this.getAuthHeaders(),
      params
    }
  );
}
}
