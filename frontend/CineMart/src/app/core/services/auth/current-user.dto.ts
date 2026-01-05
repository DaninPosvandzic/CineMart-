export interface CurrentUserDto {
  userId: number;
  email: string;
  role: 'Admin' | 'User'; 
  tokenVersion: number;
}
