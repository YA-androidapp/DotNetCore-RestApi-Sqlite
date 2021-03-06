﻿// <auto-generated />
using System;
using DotNetCore_RestApi_Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DotNetCore_RestApi_Sqlite.Migrations
{
    [DbContext(typeof(MyContext))]
    [Migration("20200329105114_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.3");

            modelBuilder.Entity("DotNetCore_RestApi_Sqlite.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Author")
                        .HasColumnType("TEXT");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Items");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Author = "Author1",
                            Content = "Content1",
                            CreatedAt = new DateTime(2020, 3, 29, 19, 51, 14, 725, DateTimeKind.Local).AddTicks(5296),
                            Title = "Title1"
                        },
                        new
                        {
                            Id = 2,
                            Author = "Author2",
                            Content = "Content2",
                            CreatedAt = new DateTime(2020, 3, 29, 19, 51, 14, 726, DateTimeKind.Local).AddTicks(3407),
                            Title = "Title2"
                        });
                });

            modelBuilder.Entity("DotNetCore_RestApi_Sqlite.SubItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Author")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ItemId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SubContent")
                        .HasColumnType("TEXT");

                    b.Property<string>("SubTitle")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ItemId");

                    b.ToTable("SubItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Author = "SubAuthor1",
                            CreatedAt = new DateTime(2020, 3, 29, 19, 51, 14, 727, DateTimeKind.Local).AddTicks(1359),
                            ItemId = 1,
                            SubContent = "SubContent1",
                            SubTitle = "SubTitle1"
                        },
                        new
                        {
                            Id = 2,
                            Author = "SubAuthor2",
                            CreatedAt = new DateTime(2020, 3, 29, 19, 51, 14, 727, DateTimeKind.Local).AddTicks(2005),
                            ItemId = 2,
                            SubContent = "SubContent2",
                            SubTitle = "SubTitle2"
                        });
                });

            modelBuilder.Entity("DotNetCore_RestApi_Sqlite.SubItem", b =>
                {
                    b.HasOne("DotNetCore_RestApi_Sqlite.Item", "Item")
                        .WithMany("SubItems")
                        .HasForeignKey("ItemId");
                });
#pragma warning restore 612, 618
        }
    }
}
