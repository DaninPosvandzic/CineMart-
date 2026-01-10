using CineMart.Application.Modules.Auth.Commands.Register;
using MediatR;
using Microsoft.EntityFrameworkCore;

public sealed class RegisterCommandHandler : IRequestHandler<RegisterCommand, Unit>
{
    private readonly IAppDbContext _ctx;
    private readonly IPasswordHasher<UserEntity> _hasher;

    public RegisterCommandHandler(IAppDbContext ctx, IPasswordHasher<UserEntity> hasher)
    {
        _ctx = ctx;
        _hasher = hasher;
    }

    public async Task<Unit> Handle(RegisterCommand request, CancellationToken ct)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        // Provjeri da li korisnik već postoji
        var exists = await _ctx.Users
            .AnyAsync(x => x.Email.ToLower() == email, ct);

        if (exists)
            throw new MarketConflictException("Korisnik već postoji.");

        // Dohvati default User rolu (RollId = 2)
        var defaultRole = await _ctx.Roles.FirstOrDefaultAsync(r => r.Id == 2, ct);
        if (defaultRole == null)
            throw new Exception("Default role 'User' nije pronađena u bazi.");

        // Kreiraj korisnika
        var user = new UserEntity
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = email,
            IsEnabled = true,
            Status = "active",
            RollId = defaultRole.Id // postavljamo default User rolu
        };

        // Hash lozinke
        user.PasswordHash = _hasher.HashPassword(user, request.Password);

        // Dodaj u bazu i snimi
        _ctx.Users.Add(user);
        await _ctx.SaveChangesAsync(ct);

        return Unit.Value;
    }
}
