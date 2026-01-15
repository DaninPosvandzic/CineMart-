import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductCategory } from './product-category.model';
import { environment } from '../../../environments/environment';
import { AuthFacadeService } from '../../core/services/auth/auth-facade.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryApiService {

  private readonly baseUrl = `${environment.apiUrl}/ProductCategory`;

  constructor(
    private http: HttpClient,
    private authFacade: AuthFacadeService
  ) {}

  /** JWT headers */
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.authFacade.getAccessToken();
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      })
    };
  }

  /** GET all product categories */
  getAll(): Observable<ProductCategory[]> {
    return this.http
      .get<{ total: number; items: any[] }>(
        this.baseUrl,
        this.getAuthHeaders()
      )
      .pipe(
        map(res =>
          res.items.map(dto => ({
            id: dto.id,
            name: dto.name,
            isEnabled: dto.isEnabled,
            productCount: dto.productCount ?? 0
          }))
        )
      );
  }
}
