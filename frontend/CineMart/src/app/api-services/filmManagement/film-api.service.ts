import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Film } from './film-api.model';
import { AuthFacadeService } from '../../core/services/auth/auth-facade.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private baseUrl = 'https://localhost:7260/Film';

  constructor(private http: HttpClient, private auth: AuthFacadeService) {}

  /** Helper: dodaj JWT token u header */
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.auth.getAccessToken();
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : ''
      })
    };
  }

  /** GET: svi filmovi */
  getAll(): Observable<Film[]> {
    return this.http
      .get<{ total: number; items: Film[] }>(`${this.baseUrl}/GetAll`, this.getAuthHeaders())
      .pipe(map(res => res.items));
  }

  /** Filtriranje filmova za trenutno ulogovanog korisnika */
  getUserMovies(userId: number): Observable<Film[]> {
    return this.getAll().pipe(
      map(films => films.filter(f => f.userId === userId))
    );
  }

  /** GET: paginacija + search + sort */
  getAllMovies(
    page: number,
    pageSize: number,
    search: string = '',
    sortBy: string = 'title',
    sortDir: string = 'asc'
  ): Observable<{ total: number; items: Film[] }> {
    return this.http.get<{ total: number; items: Film[] }>(
      `${this.baseUrl}/GetAll`,
      {
        ...this.getAuthHeaders(),
        params: { page, pageSize, search, sortBy, sortDir }
      }
    );
  }

  /** GET: pojedinačni film po ID */
  getFilmById(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }

  /** DELETE: film po ID */
  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.getAuthHeaders());
  }
}
