using CineMart.Domain.Entities; // prilagodi namespace
using CineMart.Domain.Entities.FilmManagement;

namespace CineMart.Infrastructure.Database.Configurations.MoviesMenagement
{
    public class FilmConfiguration : IEntityTypeConfiguration<FilmEntity>
    {
        public void Configure(EntityTypeBuilder<FilmEntity> builder)
        {
            builder.ToTable("Films");

            builder.HasKey(f => f.Id);

            builder.Property(f => f.Title)
                .IsRequired()
                .HasMaxLength(200); // prilagodi po želji

            builder.Property(f => f.PurchasePrice)
                .IsRequired()
                .HasColumnType("decimal(10,2)");

            builder.Property(f => f.PictureUrl)
                .HasMaxLength(500);

            // Veza sa korisnikom
            builder.HasOne(f => f.User)
                .WithMany()
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict); // ili Restrict ako želiš izbjegavati multiple cascade paths
        }
    }
}
