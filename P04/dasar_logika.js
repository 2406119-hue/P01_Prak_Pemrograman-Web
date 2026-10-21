
// File: dasar_logika.js
// Praktik Dasar Sintaks, Tipe Data, dan Arrow Function

// 1. Deklarasi Variabel
const namaProgrammer = "Budi Santoso";
const tahunMulai = 2022;
const tahunSekarang = new Date().getFullYear();

// 2. Arrow Function untuk Menghitung Masa Pengalaman
const hitungPengalaman = (mulai, sekarang) => sekarang - mulai;

const masaKerja = hitungPengalaman(tahunMulai, tahunSekarang);

// 3. Evaluasi Kondisi dengan Ternary Operator
const statusSenioritas =
    masaKerja >= 2 ? "Mid-Level Developer" : "Junior Developer";

// 4. Menampilkan Informasi Pengembang
console.log("=== INFORMASI PENGEMBANG ===");
console.log(`Nama        : ${namaProgrammer}`);
console.log(`Pengalaman  : ${masaKerja} tahun`);
console.log(`Kategori    : ${statusSenioritas}`);

// 5. Menguji Strict Equality vs Loose Equality
console.log("\n=== UJI PERBANDINGAN TIPE DATA ===");

console.log("10 == '10'  :", 10 == "10");   // true
console.log("10 === '10' :", 10 === "10");  // false

// 6. Memeriksa Tipe Data
console.log("Tipe 10     :", typeof 10);
console.log("Tipe '10'   :", typeof "10");
