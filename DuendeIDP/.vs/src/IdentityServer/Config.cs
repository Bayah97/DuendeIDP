using Duende.IdentityServer;
using Duende.IdentityServer.Models;

namespace IdentityServer;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
    new List<IdentityResource>
    {
        new IdentityResources.OpenId(),
        new IdentityResources.Profile(),
    };

    public static IEnumerable<ApiScope> ApiScopes =>
    new List<ApiScope>
    {
        new ApiScope(name: "api1", displayName: "MyAPI")
    };

    public static IEnumerable<Client> Clients =>
    new List<Client>
    {
        // interactive ASP.NET Core Web App
        new Client
        {
            ClientName = "Angular-Client",
            ClientId = "Client1",
            ClientSecrets = { new Secret("SuperSecretPassword".Sha256()) },

            AllowedGrantTypes = GrantTypes.Code,


            AllowedCorsOrigins = { "http://localhost:4200" },

            AllowAccessTokensViaBrowser = true,

            RequirePkce = true,

            
            // where to redirect to after login
            RedirectUris = { "http://localhost:4200/auth-callback" },

            // where to redirect to after logout
            PostLogoutRedirectUris = { "http://localhost:4200/logout-callback" },

            AllowedScopes = new List<string>
            {
                IdentityServerConstants.StandardScopes.OpenId,
                IdentityServerConstants.StandardScopes.Profile,
                "api1"
            },

            RequireConsent = false,
            AccessTokenLifetime = 600

        }
    };

}