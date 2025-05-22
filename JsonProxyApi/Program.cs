var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddHttpClient();
builder.Services.AddControllers();

var app = builder.Build();
app.MapControllers();

// app.UseHttpsRedirection();

app.Run();