export interface UserApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string | null;
  status: 'active' | 'inactive' | 'suspended';
  isEnabled: boolean;
  role: 'Admin' | 'User';
  createdAtUtc: string;
  lastLogin: string | null;
}

export interface UserProfile extends UserApiResponse {
  fullName: string;
  initials: string;
  memberSince: string;
  lastLoginFormatted: string | null;
}
