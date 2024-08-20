using System.ComponentModel.DataAnnotations;

namespace OAuthBackend;

public record JwtOAuthOptions
{
    public const string SectionName = "JwtOAuthOptions";
    [Required] public required string Authority { get; init; }
    [Required] public required string Audience { get; init; }
    [Required] public required string ClientId { get; init; }
}