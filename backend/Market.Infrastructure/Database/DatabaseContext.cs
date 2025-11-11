using CineMart.Application.Abstractions;
using CineMart.Domain.Entities.Sales;

namespace CineMart.Infrastructure.Database;

public partial class DatabaseContext : DbContext, IAppDbContext
{
    public DbSet<ProductCategoryEntity> ProductCategories => Set<ProductCategoryEntity>();
    public DbSet<ProductEntity> Products => Set<ProductEntity>();
    public DbSet<CineMartUserEntity> Users => Set<CineMartUserEntity>();
    public DbSet<RefreshTokenEntity> RefreshTokens => Set<RefreshTokenEntity>();
    public DbSet<OrderEntity> Orders => Set<OrderEntity>();
    public DbSet<OrderStatusEntity> OrderStatus => Set<OrderStatusEntity>();
    public DbSet<PromoCodeEntity> PromoCodes => Set<PromoCodeEntity>();

    private readonly TimeProvider _clock;
    public DatabaseContext(DbContextOptions<DatabaseContext> options, TimeProvider clock) : base(options)
    {
        _clock = clock;
    }
}