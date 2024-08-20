using Microsoft.AspNetCore.Authentication;
using OAuthBackend;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowedOriginsForCors", x => x
        .WithOrigins("http://127.0.0.1:4200")
        .AllowCredentials()
        .AllowAnyMethod()
        .AllowAnyHeader()
    );
});
builder.Services.AddSingleton<IClaimsTransformation, ClientRoleTransformation>();
builder.Services.BindAndValidateOptions<JwtOAuthOptions>(JwtOAuthOptions.SectionName);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddJwtAuth(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.UseCors("AllowedOriginsForCors");


app.Run();