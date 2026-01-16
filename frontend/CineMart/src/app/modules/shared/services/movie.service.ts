import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  releaseYear: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'https://localhost:7260/film';

  constructor(private http: HttpClient) {}

  // USER MOVIES
  getMyMovies(userId: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/User/${userId}`);
  }

  // ✅ ADMIN – ALL MOVIES
   getAllMovies(): Observable<any> {
    const params = new HttpParams()
      .set('page', 1)
      .set('pageSize', 50);

    return this.http.get<any>(`${this.apiUrl}/GetAll`, { params });
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRating(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${movieId}/rating`);
  }

  submitRating(movieId: number, rating: number): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/${movieId}/rating`,
      { rating }
    );
  }
}
