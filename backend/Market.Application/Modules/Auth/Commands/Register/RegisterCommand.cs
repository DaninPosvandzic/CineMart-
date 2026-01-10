using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
namespace CineMart.Application.Modules.Auth.Commands.Register
{
    public sealed class RegisterCommand : IRequest<Unit>
    {
        public string FirstName { get; init; }
        public string LastName { get; init; }
        public string Email { get; init; }
        public string Password { get; init; }
    }
}

