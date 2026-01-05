using MediatR;
using System.Collections.Generic;

public sealed record GetFilmsQuery() : IRequest<IReadOnlyList<FilmDto>>;
