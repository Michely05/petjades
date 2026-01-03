using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetjadesApi.Migrations
{
    /// <inheritdoc />
    public partial class AddAnimalDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Descripcio",
                table: "Animals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descripcio",
                table: "Animals");
        }
    }
}
