export interface Film {
  id: number;
  title: string;
  description?: string;
  releaseYear: number;
  trailerUrl?: string;
  pictureUrl?: string;
  purchasePrice: number;
  rentPrice: number;
  genreId?: number;
  genreName?: string;
  userId: number;
  directorId?: number;
  directorName?: string;
  averageRating: number;
  viewCount: number;
  dateAdded: string;
}
