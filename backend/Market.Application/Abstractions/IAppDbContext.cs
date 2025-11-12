using CineMart.Domain.Entities.Sales;

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

    Task<int> SaveChangesAsync(CancellationToken ct);
}