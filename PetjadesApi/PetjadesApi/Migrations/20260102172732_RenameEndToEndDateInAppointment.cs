using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetjadesApi.Migrations
{
    /// <inheritdoc />
    public partial class RenameEndToEndDateInAppointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Start",
                table: "Appointments",
                newName: "StartDate");

            migrationBuilder.RenameColumn(
                name: "End",
                table: "Appointments",
                newName: "EndDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Appointments",
                newName: "Start");

            migrationBuilder.RenameColumn(
                name: "EndDate",
                table: "Appointments",
                newName: "End");
        }
    }
}
