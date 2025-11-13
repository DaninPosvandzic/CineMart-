using CineMart.Domain.Entities;
using CineMart.Domain.Entities.FilmManagement;
using CineMart.Domain.Entities.Identity;
using CineMart.Domain.Entities.Sales;
using CineMart.Domain.Entities.UserInteraction;

namespace CineMart.Application.Abstractions;

// Application layer
public interface IAppDbContext
{
    DbSet<ProductEntity> Products { get; }
    DbSet<ProductCategoryEntity> ProductCategories { get; }
    DbSet<UserEntity> Users { get; }
    DbSet<RefreshTokenEntity> RefreshTokens { get; }
    DbSet<OrderEntity> Orders {  get; }
    DbSet<OrderStatusEntity> OrderStatus { get; }
    DbSet<PromoCodeEntity> PromoCodes { get; }
    DbSet<ActorEntity> Actors { get; }
    DbSet<FilmActorEntity> FilmActors { get; }
    DbSet<DirectorEntity> Directors { get; }
    DbSet<FilmEntity> Films { get; }
    DbSet<GenreEntity> Genres { get; }
    DbSet<ChatMessageEntity> ChatMessages { get; }
    DbSet<NotificationEntity> Notifications { get; }
    DbSet<RollEntity> Roles { get; }
    DbSet<RatingEntity> Ratings { get; }
    DbSet<PaymentStatusEntity> PaymentStatuses { get; }
    DbSet<PaymentEntity> Payments { get; }
    DbSet<RefundEntity> Refunds { get; }
    DbSet<FavoritesEntity> Favorites { get; }
    DbSet<OrderItemProductEntity> OrderItemsProduct { get; }
    DbSet<OrderItemFilmEntity> OrderItemsFilm { get; }
    DbSet<CartItemEntity> CartItems { get; }

    Task<int> SaveChangesAsync(CancellationToken ct);
}