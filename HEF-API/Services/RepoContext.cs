using System;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HEF_API.Services
{
    public class RepoContext : DbContext
    {
        public RepoContext(DbContextOptions<RepoContext> options)
            : base(options)
        { }

        public DbSet<User> User { get; set; }
        public DbSet<Job> Job { get; set; }
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<Plant> Plant { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Station> Station { get; set; }
        public DbSet<Comment> Comment { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Area>()
                .ToTable("Area");

            modelBuilder
                .Entity<User>()
                .Property(e => e.Role)
                .HasConversion<string>();

            modelBuilder
                .Entity<User>()
                .Property(e => e.Status)
                .HasConversion<string>();

            modelBuilder
                .Entity<Job>()
                .Property(e => e.Status)
                .HasConversion<string>();

            modelBuilder
                .Entity<SubJob>()
                .Property(e => e.Status)
                .HasConversion<string>();

            modelBuilder
                .Entity<SubJob>()
                .Property(e => e.Unit)
                .HasConversion<string>();

            base.OnModelCreating(modelBuilder);
        }
    }
}
