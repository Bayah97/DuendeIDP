using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using IdentityModel;

namespace IdentityServer;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
    new List<IdentityResource>
    {
        new IdentityResources.OpenId(),
        new IdentityResources.Profile(),
        new IdentityResource
        {
            Name = "role",
            UserClaims = { JwtClaimTypes.Role },
        },
    };


    public static IEnumerable<ApiScope> ApiScopes =>
        new List<ApiScope>
        {
        new ApiScope(name: "api1", displayName: "MyAPI")
        };

    public static IEnumerable<ApiResource> ApiResources =>
        new List<ApiResource>
        {
            new ApiResource
            {
                Name = "api1",
                DisplayName = "API #1",
                Description = "Allow the application to access API #1 on your behalf",
                Scopes = new List<string> {"api1.read", "api1.write"},
                ApiSecrets = new List<Secret> {new Secret("ScopeSecret".Sha256())}, // change me!
            }
        };


    public static IEnumerable<Client> Clients =>
    new List<Client>
    {
        // interactive ASP.NET Core Web App
        new Client
        {
            ClientId = "Client1",
            ClientSecrets = { new Secret("SuperSecretPassword".Sha256()) },

            AllowedGrantTypes = GrantTypes.Code,

            //PKCE (Proof Key for Code Exchange)
            RequirePkce = true,

            AllowAccessTokensViaBrowser = true,

            //Refresh token
            AllowOfflineAccess = true,
            
            // where to redirect to after login
            RedirectUris = { "http://localhost:4200/auth-callback" },

            // where to redirect to after logout
            PostLogoutRedirectUris = { "http://localhost:4200/logout-callback" },

            AllowedScopes = new List<string>
            {
                IdentityServerConstants.StandardScopes.OpenId,
                IdentityServerConstants.StandardScopes.Profile,
                "api1",
                "role",
                "offline_access"
            },

            AllowedCorsOrigins = { "http://localhost:4200" },
            RequireConsent = false,
            AccessTokenLifetime = 60,
            //refresh token expired 1 day
            AbsoluteRefreshTokenLifetime = 86400,
        }
    };


}