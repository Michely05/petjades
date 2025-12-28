using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetjadesApi.Migrations
{
    /// <inheritdoc />
    public partial class AddRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Requests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cognom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Missatge = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Tipus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnimalId = table.Column<int>(type: "int", nullable: true),
                    Resposta = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RespostaEnviada = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Requests", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Requests");
        }
    }
}
