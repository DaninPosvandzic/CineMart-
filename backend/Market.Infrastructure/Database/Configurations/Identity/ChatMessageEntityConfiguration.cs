using CineMart.Domain.Entities.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CineMart.Infrastructure.Database.Configurations.Identity
{
    public sealed class ChatMessageEntityConfiguration : IEntityTypeConfiguration<ChatMessageEntity>
    {
        public void Configure(EntityTypeBuilder<ChatMessageEntity> b)
        {
            // Tabela
            b.ToTable("ChatMessages");

            // Primary key
            b.HasKey(m => m.Id);

            // Sender (FK)
            b.HasOne(m => m.Sender)
                .WithMany()
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.NoAction);

            // Receiver (FK)
            b.HasOne(m => m.Receiver)
                .WithMany()
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.NoAction);

            // Ostala polja
            b.Property(m => m.MessageText).HasMaxLength(1000);
            b.Property(m => m.IsRead).HasDefaultValue(false);
        }
    }
}