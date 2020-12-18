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

        public DbSet<Area> Area { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<Job> Job { get; set; }
        public DbSet<Plant> Plant { get; set; }
        public DbSet<Station> Station { get; set; }
        public DbSet<SubJob> SubJob { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Job_Assignments> Job_Assignments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                        .Property(e => e.Role)
                        .HasConversion<string>();
            
            modelBuilder.Entity<User>()
                        .Property(e => e.Status)
                        .HasConversion<string>();

            modelBuilder.Entity<Job_Assignments>().HasKey(uj => new { uj.JobId, uj.UserId });
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
