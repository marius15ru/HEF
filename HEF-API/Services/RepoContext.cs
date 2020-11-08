﻿using System;
using HEF_API.Models;
using Microsoft.EntityFrameworkCore;
using myApp.Models;

namespace HEF_API.Services
{
    public class RepoContext : DbContext
    {
        public RepoContext(DbContextOptions<RepoContext> options)
            : base(options)
        { }

        public DbSet<User> User { get; set; }
        public DbSet<WorkOrder> WorkOrder { get; set; }
        public DbSet<Equipment> Equipment { get; set; }
        public DbSet<Plant> Plant { get; set; }
        public DbSet<Area> Area { get; set; }
    }
}
