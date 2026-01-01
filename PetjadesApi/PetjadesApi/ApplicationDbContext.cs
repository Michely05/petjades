using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PetjadesApi.Dtos;
using PetjadesApi.Models;

namespace PetjadesApi
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Animal> Animals { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) // per evitar que s'eliminin appointments en eliminar requests o animals
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Request)
                .WithMany()
                .HasForeignKey(a => a.RequestId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Animal)
                .WithMany()
                .HasForeignKey(a => a.AnimalId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
