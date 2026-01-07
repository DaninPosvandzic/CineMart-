import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from './director-api.model';

@Injectable({
  providedIn: 'root'
})
export class DirectorApiService {
  private baseUrl = 'https://localhost:7260/api/Director';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Director[]> {
    return this.http.get<Director[]>(`${this.baseUrl}/GetAll`);
  }
}
