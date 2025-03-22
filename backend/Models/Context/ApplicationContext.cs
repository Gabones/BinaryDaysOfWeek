using BinaryDaysOfWeekApi.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace BinaryDaysOfWeekApi.Models.Context;

public class ApplicationContext : DbContext
{
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
    }

    public DbSet<SchedulerEnum> SchedulerEnums { get; set; }
    public DbSet<SchedulerBinaryEncoded> SchedulerBinaryEncoded { get; set; }
    public DbSet<SchedulerStringArray> SchedulerStringArrays { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<SchedulerBinaryEncoded>(e =>
        {
            e.ToTable("SchedulerBinaryEncoded");
            e.HasKey(e => e.Id);
            e.Property(e => e.Id).ValueGeneratedOnAdd();
            e.Property(e => e.Name).IsRequired();
        });

        modelBuilder.Entity<SchedulerEnum>(e =>
        {
            e.ToTable("SchedulerEnums");
            e.HasKey(e => e.Id);
            e.Property(e => e.Id).ValueGeneratedOnAdd();
            e.Property(e => e.Name).IsRequired();
        });

        modelBuilder.Entity<SchedulerStringArray>(e =>
        {
            e.ToTable("SchedulerStringArrays");
            e.HasKey(e => e.Id);
            e.Property(e => e.Id).ValueGeneratedOnAdd();
            e.Property(e => e.Name).IsRequired();
        });
    }
}
