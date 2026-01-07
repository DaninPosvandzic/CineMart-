import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from './genre-api.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreApiService {

  private readonly baseUrl = `${environment.apiUrl}/Genre`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.baseUrl}/GetAll`);
  }
}
