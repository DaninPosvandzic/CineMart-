import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProductDto, Product, UpdateProductDto } from './product-api.model';
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

  /** ✅ GET PRODUCT BY ID */
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${this.baseUrl}/${id}`,
      this.getAuthHeaders()
    );
  }

  /** ✅ UPDATE PRODUCT */
  update(id: number, payload: UpdateProductDto): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/${id}`,
      payload,
      this.getAuthHeaders()
    );
  }

  /** ✅ DELETE PRODUCT */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/Delete/${id}`,
      this.getAuthHeaders()
    );
  }

  /** ✅ GET PRODUCTS BY CATEGORY */
  getByCategory(
    categoryId: number,
    page: number = 1,
    pageSize: number = 8
  ): Observable<{ total: number; items: Product[] }> {

    const params = new HttpParams()
      .set('categoryId', categoryId)
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<{ total: number; items: Product[] }>(
      `${this.baseUrl}/GetByCategory`,
      {
        ...this.getAuthHeaders(),
        params
      }
    );
  }

  /** ✅ GET FEATURED PRODUCTS */
  getFeatured(limit: number = 6): Observable<Product[]> {
    const params = new HttpParams().set('limit', limit);

    return this.http.get<Product[]>(
      `${this.baseUrl}/GetFeatured`,
      {
        ...this.getAuthHeaders(),
        params
      }
    );
  }

  /** ✅ SEARCH PRODUCTS */
  search(
    searchTerm: string,
    page: number = 1,
    pageSize: number = 8
  ): Observable<{ total: number; items: Product[] }> {

    const params = new HttpParams()
      .set('search', searchTerm)
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<{ total: number; items: Product[] }>(
      `${this.baseUrl}/Search`,
      {
        ...this.getAuthHeaders(),
        params
      }
    );
  }

  /** ✅ UPDATE STOCK QUANTITY */
  updateStock(id: number, quantity: number): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/UpdateStock/${id}`,
      { quantity },
      this.getAuthHeaders()
    );
  }

  /** ✅ CHECK PRODUCT AVAILABILITY */
  checkAvailability(id: number, quantity: number): Observable<{ available: boolean; stockQuantity: number }> {
    const params = new HttpParams()
      .set('productId', id)
      .set('quantity', quantity);

    return this.http.get<{ available: boolean; stockQuantity: number }>(
      `${this.baseUrl}/CheckAvailability`,
      {
        ...this.getAuthHeaders(),
        params
      }
    );
  }
}
