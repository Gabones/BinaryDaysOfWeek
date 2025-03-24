using BinaryDaysOfWeekApi.Models.Context;
using BinaryDaysOfWeekApi.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ApplicationContext>(options => options.UseNpgsql(connectionString));

builder.Services.AddCors(options =>
{
    options.AddPolicy("PublicPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

#region SchedulerBinaryEncoded
// Create
app.MapPost("/SchedulerBinaryEncoded", async (ApplicationContext context, SchedulerBinaryEncoded schedulerBinaryEncoded) =>
{
    context.SchedulerBinaryEncoded.Add(schedulerBinaryEncoded);
    await context.SaveChangesAsync();
    return Results.Created($"/SchedulerBinaryEncoded/{schedulerBinaryEncoded.Id}", schedulerBinaryEncoded);
}).WithName("CreateSchedulerBinaryEncoded");

// Read
app.MapGet("/SchedulerBinaryEncoded", async (ApplicationContext context) =>
{
    return Results.Ok(await context.SchedulerBinaryEncoded.Select(_ => new { _.Id, _.Name }).ToListAsync());
}).WithName("ListSchedulerBinaryEncoded");

app.MapGet("/SchedulerBinaryEncoded/{schedulerBinaryEncodedId}", async (int schedulerBinaryEncodedId, ApplicationContext context) =>
{
    return Results.Ok(await context.SchedulerBinaryEncoded.FirstAsync(_ => _.Id == schedulerBinaryEncodedId));
}).WithName("QuerySchedulerBinaryEncoded");

// Update
app.MapPut("/SchedulerBinaryEncoded/{schedulerBinaryEncodedId}", async (int schedulerBinaryEncodedId,
    SchedulerBinaryEncoded schedulerBinaryEncoded,
    ApplicationContext context) =>
{
    var existingSchedulerBinaryEncoded = await context.SchedulerBinaryEncoded.FirstAsync(_ => _.Id == schedulerBinaryEncodedId);
    existingSchedulerBinaryEncoded.UpdateData(schedulerBinaryEncoded);
    await context.SaveChangesAsync();
    return Results.NoContent();
}).WithName("UpdateSchedulerBinaryEncoded");

// Delete
app.MapDelete("/SchedulerBinaryEncoded/{schedulerBinaryEncodedId}", async (int schedulerBinaryEncodedId, ApplicationContext context) =>
{
    var schedulerBinaryEncoded = await context.SchedulerBinaryEncoded.FirstAsync(_ => _.Id == schedulerBinaryEncodedId);
    context.SchedulerBinaryEncoded.Remove(schedulerBinaryEncoded);
    await context.SaveChangesAsync();
    return Results.NoContent();
}).WithName("DeleteSchedulerBinaryEncoded");
#endregion

#region SchedulerEnum
// Create
app.MapPost("/SchedulerEnum", async (ApplicationContext context, SchedulerEnum schedulerEnum) =>
{
    context.SchedulerEnums.Add(schedulerEnum);
    await context.SaveChangesAsync();
    return Results.Created($"/SchedulerEnum/{schedulerEnum.Id}", schedulerEnum);
}).WithName("CreateSchedulerEnum");

// Read
app.MapGet("/SchedulerEnum", async (ApplicationContext context) =>
{
    return Results.Ok(await context.SchedulerEnums.Select(_ => new { _.Id, _.Name }).ToListAsync());
}).WithName("ListSchedulerEnum");
app.MapGet("/SchedulerEnum/{schedulerEnumId}", async (int schedulerEnumId, ApplicationContext context) =>
{
    return Results.Ok(await context.SchedulerEnums.FirstAsync(_ => _.Id == schedulerEnumId));
}).WithName("QuerySchedulerEnum");

// Update
app.MapPut("/SchedulerEnum/{schedulerEnumId}", async (int schedulerEnumId, SchedulerEnum schedulerEnum, ApplicationContext context) =>
{
    var existingSchedulerEnum = await context.SchedulerEnums.FirstAsync(_ => _.Id == schedulerEnumId);
    existingSchedulerEnum.UpdateData(schedulerEnum);
    await context.SaveChangesAsync();
    return Results.NoContent();
}).WithName("UpdateSchedulerEnum");

// Delete
app.MapDelete("/SchedulerEnum/{schedulerEnumId}", async (int schedulerEnumId, ApplicationContext context) =>
{
    var schedulerEnum = await context.SchedulerEnums.FirstAsync(_ => _.Id == schedulerEnumId);
    context.SchedulerEnums.Remove(schedulerEnum);
    await context.SaveChangesAsync();
    return Results.NoContent();
}).WithName("DeleteSchedulerEnum");
#endregion

#region SchedulerStringArray
// Create
app.MapPost("/SchedulerStringArray", async (ApplicationContext context, SchedulerStringArray schedulerStringArray) =>
{
    context.SchedulerStringArrays.Add(schedulerStringArray);
    await context.SaveChangesAsync();
    return Results.Created($"/SchedulerStringArray/{schedulerStringArray.Id}", schedulerStringArray);
}).WithName("CreateSchedulerStringArray");

// Read
app.MapGet("/SchedulerStringArray", async (ApplicationContext context) =>
{
    return Results.Ok(await context.SchedulerStringArrays.Select(_ => new { _.Id, _.Name }).ToListAsync());
}).WithName("ListSchedulerStringArray");
app.MapGet("/SchedulerStringArray/{schedulerStringArrayId}", async (int schedulerStringArrayId, ApplicationContext context) =>
{
    return Results.Ok(await context.SchedulerStringArrays.FirstAsync(_ => _.Id == schedulerStringArrayId));
}).WithName("QuerySchedulerStringArray");

// Update
app.MapPut("/SchedulerStringArray/{schedulerStringArrayId}", async (int schedulerStringArrayId, SchedulerStringArray schedulerStringArray, ApplicationContext context) =>
{
    var existingSchedulerStringArray = await context.SchedulerStringArrays.FirstAsync(_ => _.Id == schedulerStringArrayId);
    existingSchedulerStringArray.UpdateData(schedulerStringArray);
    await context.SaveChangesAsync();
    return Results.NoContent();
}).WithName("UpdateSchedulerStringArray");

// Delete
app.MapDelete("/SchedulerStringArray/{schedulerStringArrayId}", async (int schedulerStringArrayId, ApplicationContext context) =>
{
    var schedulerStringArray = await context.SchedulerStringArrays.FirstAsync(_ => _.Id == schedulerStringArrayId);
    context.SchedulerStringArrays.Remove(schedulerStringArray);
    await context.SaveChangesAsync();
    return Results.NoContent();
}).WithName("DeleteSchedulerStringArray");
#endregion

app.UseCors("PublicPolicy");

app.Run();
