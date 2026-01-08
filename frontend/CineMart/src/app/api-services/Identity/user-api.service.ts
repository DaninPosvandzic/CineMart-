import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {UserApiResponse, UserProfile} from './user-api.model';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7260/User';

  getUserById(id: number): Observable<UserApiResponse> {
    return this.http.get<UserApiResponse>(`${this.baseUrl}/${id}`);
  }

  getUserProfile(id: number): Observable<UserProfile> {
    return this.getUserById(id).pipe(
      map(user => this.transformToProfile(user))
    );
  }

  private transformToProfile(user: UserApiResponse): UserProfile {
    return {
      ...user,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      initials: this.getInitials(user.firstName, user.lastName),
      memberSince: this.formatDate(user.createdAtUtc),
      lastLoginFormatted: user.lastLogin ? this.formatDate(user.lastLogin) : null
    };
  }

  private getInitials(firstName: string, lastName: string): string {
    const first = firstName?.charAt(0)?.toUpperCase() || '';
    const last = lastName?.charAt(0)?.toUpperCase() || '';
    return `${first}${last}`;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
