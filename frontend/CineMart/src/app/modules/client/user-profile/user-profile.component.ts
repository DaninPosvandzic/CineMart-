import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { AuthFacadeService } from '../../../core/services/auth/auth-facade.service';
import {UserApiService} from '../../../api-services/Identity/user-api.service';
import {UserProfile} from '../../../api-services/Identity/user-api.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false
})
export class UserProfileComponent implements OnInit {
  private authFacade = inject(AuthFacadeService);
  private userApiService = inject(UserApiService);

  user = this.authFacade.currentUser;
  isAuthenticated = this.authFacade.isAuthenticated;

  userProfile = signal<UserProfile | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  fullName = computed(() => {
    const profile = this.userProfile();
    return profile?.fullName || 'Unknown User';
  });

  initials = computed(() => {
    const profile = this.userProfile();
    return profile?.initials || '??';
  });

  statusClass = computed(() => {
    const profile = this.userProfile();
    return profile?.status || 'inactive';
  });

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const currentUser = this.user();
    if (!currentUser?.userId) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.userApiService.getUserProfile(currentUser.userId).subscribe({
      next: (profile) => {
        this.userProfile.set(profile);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load user profile');
        this.isLoading.set(false);
        console.error('Profile load error:', err);
      }
    });
  }

  logout(): void {
    this.authFacade.logout().subscribe();
  }

  refreshProfile(): void {
    this.loadUserProfile();
  }
}
