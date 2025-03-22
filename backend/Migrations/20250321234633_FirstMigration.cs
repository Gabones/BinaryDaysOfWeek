using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BinaryDaysOfWeekApi.Migrations
{
    /// <inheritdoc />
    public partial class FirstMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SchedulerBinaryEncoded",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    DaysOfWeek = table.Column<byte>(type: "smallint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchedulerBinaryEncoded", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SchedulerEnums",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Sunday = table.Column<int>(type: "integer", nullable: true),
                    Monday = table.Column<int>(type: "integer", nullable: true),
                    Tuesday = table.Column<int>(type: "integer", nullable: true),
                    Wednesday = table.Column<int>(type: "integer", nullable: true),
                    Thursday = table.Column<int>(type: "integer", nullable: true),
                    Friday = table.Column<int>(type: "integer", nullable: true),
                    Saturday = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchedulerEnums", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SchedulerStringArrays",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    DaysOfWeek = table.Column<string[]>(type: "text[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchedulerStringArrays", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SchedulerBinaryEncoded");

            migrationBuilder.DropTable(
                name: "SchedulerEnums");

            migrationBuilder.DropTable(
                name: "SchedulerStringArrays");
        }
    }
}
