using CineMart.Domain.Entities.FilmManagement;

namespace CineMart.Infrastructure.Database.Seeders;

/// <summary>
/// Dynamic seeder koji se pokreće u runtime-u,
/// obično pri startu aplikacije (npr. u Program.cs).
/// Koristi se za unos demo/test podataka koji nisu dio migracije.
/// </summary>
public static class DynamicDataSeeder
{
    public static async Task SeedAsync(DatabaseContext context)
    {
        // Osiguraj da baza postoji (bez migracija)
        await context.Database.EnsureCreatedAsync();

        await SeedProductCategoriesAsync(context);
        await SeedRolesAsync(context);
        await SeedUsersAsync(context);
        await SeedDirectorsAsync(context);
        await SeedFilmsAsync(context);
    }

    private static async Task SeedProductCategoriesAsync(DatabaseContext context)
    {
        if (!await context.ProductCategories.AnyAsync())
        {
            context.ProductCategories.AddRange(
                new ProductCategoryEntity
                {
                    Name = "Računari (demo)",
                    IsEnabled = true,
                    CreatedAtUtc = DateTime.UtcNow
                },
                new ProductCategoryEntity
                {
                    Name = "Mobilni uređaji (demo)",
                    IsEnabled = true,
                    CreatedAtUtc = DateTime.UtcNow
                }
            );

            await context.SaveChangesAsync();
            Console.WriteLine("✅ Dynamic seed: product categories added.");
        }
    }

    private static async Task SeedRolesAsync(DatabaseContext context)
    {
        if (await context.Roles.AnyAsync())
            return;

        var roles = new List<RollEntity>
            {
                new RollEntity { Name = "Admin", Description = "Administrator role with full permissions" },
                new RollEntity { Name = "User", Description = "User role for regular user management" },
            };

        context.Roles.AddRange(roles);
        await context.SaveChangesAsync();
    }

    /// <summary>
    /// Kreira demo korisnike ako ih još nema u bazi.
    /// </summary>
    private static async Task SeedUsersAsync(DatabaseContext context)
    {
        if (await context.Users.AnyAsync())
            return;

        var hasher = new PasswordHasher<UserEntity>();

        var admin = new UserEntity
        {
            Email = "admin@market.local",
            PasswordHash = hasher.HashPassword(null!, "Admin123!"),
            IsEnabled = true,
            LastName = "User",
            FirstName = "Admin",
            RollId = 1,

        };

        var user = new UserEntity
        {
            Email = "manager@market.local",
            PasswordHash = hasher.HashPassword(null!, "User123!"),
            IsEnabled = true,
            LastName = "User",
            FirstName = "User",
            RollId = 2,
        };

        var dummyForSwagger = new UserEntity
        {
            Email = "string",
            PasswordHash = hasher.HashPassword(null!, "string"),
            IsEnabled = true,
            LastName = "User",
            FirstName = "dummy",
            RollId = 2,
        };
        var dummyForTests = new UserEntity
        {
            Email = "test",
            PasswordHash = hasher.HashPassword(null!, "test123"),
            IsEnabled = true,
            LastName = "User",
            FirstName = "dummy",
            RollId = 2,
        };
        context.Users.AddRange(admin, user, dummyForSwagger, dummyForTests);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Dynamic seed: demo users added.");
    }

    private static async Task SeedDirectorsAsync(DatabaseContext context)
    {
        if (await context.Directors.AnyAsync())
            return;

        var directors = new List<DirectorEntity>
        {
            new DirectorEntity
            {
                FirstName = "Steven",
                LastName = "Spielberg",
                DateOfBirth = new DateTime(1946, 12, 18),
                CountryOfOrigin = "USA",
                FilmCount = 34
            },
            new DirectorEntity
            {
                FirstName = "Christopher",
                LastName = "Nolan",
                DateOfBirth = new DateTime(1970, 7, 30),
                CountryOfOrigin = "UK",
                FilmCount = 12
            },
            new DirectorEntity
            {
                FirstName = "Quentin",
                LastName = "Tarantino",
                DateOfBirth = new DateTime(1963, 3, 27),
                CountryOfOrigin = "USA",
                FilmCount = 10
            },
            new DirectorEntity
            {
                FirstName = "Martin",
                LastName = "Scorsese",
                DateOfBirth = new DateTime(1942, 11, 17),
                CountryOfOrigin = "USA",
                FilmCount = 26
            },
            new DirectorEntity
            {
                FirstName = "James",
                LastName = "Cameron",
                DateOfBirth = new DateTime(1954, 8, 16),
                CountryOfOrigin = "Canada",
                FilmCount = 9
            },
            new DirectorEntity
            {
                FirstName = "Ridley",
                LastName = "Scott",
                DateOfBirth = new DateTime(1937, 11, 30),
                CountryOfOrigin = "UK",
                FilmCount = 27
            }
        };

        context.Directors.AddRange(directors);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Dynamic seed: demo directors added.");
    }

    private static async Task SeedFilmsAsync(DatabaseContext context)
    {
        if (await context.Films.AnyAsync())
            return;

        var random = new Random();
        var genres = new List<GenreEntity>
        {
            new GenreEntity { Name = "Akcija" },
            new GenreEntity { Name = "Drama" },
            new GenreEntity { Name = "Komedija" },
            new GenreEntity { Name = "Triler" },
            new GenreEntity { Name = "SF" },
            new GenreEntity { Name = "Animirani" }
        };

        // dodaj žanrove ako nisu u bazi
        foreach (var g in genres)
        {
            if (!await context.Genres.AnyAsync(x => x.Name == g.Name))
                context.Genres.Add(g);
        }
        await context.SaveChangesAsync();

        // dohvati sve direktore
        var directors = await context.Directors.ToListAsync();

        // ubaci 6 demo filmova
        var films = new List<FilmEntity>
        {
            new FilmEntity
            {
                Title = "Akcijski film 1",
                Description = "Demo opis akcijskog filma",
                ReleaseYear = 2020,
                PurchasePrice = 15,
                PictureUrl = "https://m.media-amazon.com/images/I/81FNp+JBbML.jpg",
                RentPrice = 5,
                GenreId = genres[0].Id,
                DirectorId = directors.FirstOrDefault()?.Id,
                AverageRating = random.NextDouble() * 5,
                ViewCount = random.Next(0, 1000),
                UserId = 1,
                DateAdded = DateTime.UtcNow
            },
            new FilmEntity
            {
                Title = "Drama film 1",
                Description = "Demo opis drame",
                ReleaseYear = 2019,
                PurchasePrice = 12,
                PictureUrl = "https://variety.com/wp-content/uploads/2018/09/superman.jpg?w=1000&h=563&crop=1",
                RentPrice = 4,
                GenreId = genres[1].Id,
                DirectorId = directors.Skip(1).FirstOrDefault()?.Id,
                AverageRating = random.NextDouble() * 5,
                ViewCount = random.Next(0, 1000),
                UserId = 1,
                DateAdded = DateTime.UtcNow
            },
            new FilmEntity
            {
                Title = "Komedija film 1",
                Description = "Demo opis komedije",
                ReleaseYear = 2021,
                PurchasePrice = 10,
                PictureUrl = "https://upload.wikimedia.org/wikipedia/en/1/1f/Snow_White_%282025_film%29_final_poster.jpg",
                RentPrice = 3,
                GenreId = genres[2].Id,
                DirectorId = directors.Skip(2).FirstOrDefault()?.Id,
                AverageRating = random.NextDouble() * 5,
                ViewCount = random.Next(0, 1000),
                UserId = 1,
                DateAdded = DateTime.UtcNow
            },
            new FilmEntity
            {
                Title = "Triler film 1",
                Description = "Demo opis trilera",
                ReleaseYear = 2022,
                PurchasePrice = 18,
                RentPrice = 6,
                PictureUrl = "https://www.belarte.co.uk/cdn/shop/products/titanic_1997_original_film_art.jpg?v=1625050824",
                GenreId = genres[3].Id,
                DirectorId = directors.Skip(3).FirstOrDefault()?.Id,
                AverageRating = random.NextDouble() * 5,
                ViewCount = random.Next(0, 1000),
                UserId = 1,
                DateAdded = DateTime.UtcNow
            },
            new FilmEntity
            {
                Title = "SF film 1",
                Description = "Demo opis SF filma",
                ReleaseYear = 2018,
                PurchasePrice = 20,
                RentPrice = 7,
                PictureUrl = "https://penji.co/wp-content/uploads/2023/01/Untitled-design-59.jpg.webp",
                GenreId = genres[4].Id,
                DirectorId = directors.Skip(4).FirstOrDefault()?.Id,
                AverageRating = random.NextDouble() * 5,
                ViewCount = random.Next(0, 1000),
                UserId = 1,
                DateAdded = DateTime.UtcNow
            },
            new FilmEntity
            {
                Title = "Animirani film 1",
                Description = "Demo opis animiranog filma",
                ReleaseYear = 2023,
                PurchasePrice = 14,
                RentPrice = 5,
                PictureUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNeYGwWeQEwOoPhxW93QIeNUWnLmEvMPwTw9AlDBGN4uXjIAcOEwz2z2yZL8BpXHp3ZYyjQ&s=10",
                GenreId = genres[5].Id,
                DirectorId = directors.Skip(5).FirstOrDefault()?.Id,
                AverageRating = random.NextDouble() * 5,
                ViewCount = random.Next(0, 1000),
                UserId = 1,
                DateAdded = DateTime.UtcNow
            },
        };

        context.Films.AddRange(films);
        await context.SaveChangesAsync();

        Console.WriteLine("✅ Dynamic seed: demo films added.");
    }
}