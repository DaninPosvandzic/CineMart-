using CineMart.Application.Abstractions;
using CineMart.Domain.Entities;
using CineMart.Domain.Entities.FilmManagement;
using CineMart.Domain.Entities.Sales;
using CineMart.Domain.Entities.UserInteraction;
using CineMart.Domain.Entities.UserInteraction;

namespace CineMart.Infrastructure.Database;

public partial class DatabaseContext : DbContext, IAppDbContext
{
    public DbSet<ProductCategoryEntity> ProductCategories => Set<ProductCategoryEntity>();
    public DbSet<ProductEntity> Products => Set<ProductEntity>();
    public DbSet<UserEntity> Users => Set<UserEntity>();
    public DbSet<RefreshTokenEntity> RefreshTokens => Set<RefreshTokenEntity>();
    public DbSet<OrderEntity> Orders => Set<OrderEntity>();
    public DbSet<OrderStatusEntity> OrderStatus => Set<OrderStatusEntity>();
    public DbSet<PromoCodeEntity> PromoCodes => Set<PromoCodeEntity>();
    public DbSet<ActorEntity> Actors => Set<ActorEntity>();
    public DbSet<FilmActorEntity> FilmActors => Set<FilmActorEntity>();
    public DbSet<DirectorEntity> Directors => Set<DirectorEntity>();
    public DbSet<FilmEntity> Films => Set<FilmEntity>();
    public DbSet<GenreEntity> Genres => Set<GenreEntity>();
    public DbSet<ChatMessageEntity> ChatMessages => Set<ChatMessageEntity>();
    public DbSet<NotificationEntity> Notifications => Set<NotificationEntity>();
    public DbSet<RollEntity> Roles => Set<RollEntity>();
    public DbSet<RatingEntity> Ratings => Set<RatingEntity>();
    public DbSet<PaymentStatusEntity> PaymentStatuses => Set<PaymentStatusEntity>();
    public DbSet<PaymentEntity> Payments => Set<PaymentEntity>();
    public DbSet<RefundEntity> Refunds => Set<RefundEntity>();
    public DbSet<FavoritesEntity> Favorites => Set<FavoritesEntity>();
    public DbSet<OrderItemProductEntity> OrderItemsProduct => Set<OrderItemProductEntity>();
    public DbSet<OrderItemFilmEntity> OrderItemsFilm => Set<OrderItemFilmEntity>();
    public DbSet<CartItemEntity> CartItems => Set<CartItemEntity>();



    private readonly TimeProvider _clock;
    public DatabaseContext(DbContextOptions<DatabaseContext> options, TimeProvider clock) : base(options)
    {
        _clock = clock;
    }
}