import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://localhost:7260/film';

  constructor(private http: HttpClient) {}

  getMyMovies(userId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/User/${userId}`);
  }
  deleteMovie(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}

