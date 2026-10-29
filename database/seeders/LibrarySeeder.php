<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class LibrarySeeder extends Seeder
{
    public function run(): void
    {
        // 'role' tidak ada di $fillable User bawaan, jadi pakai unguarded
        User::unguarded(function () {
            User::updateOrCreate(['email' => 'admin@perpus.test'], [
                'name' => 'Admin Perpustakaan', 'password' => Hash::make('password'), 'role' => 'admin',
            ]);
            User::updateOrCreate(['email' => 'user@perpus.test'], [
                'name' => 'Pengunjung', 'password' => Hash::make('password'), 'role' => 'user',
            ]);
        });

        $books = [
            ['Laskar Pelangi', 'Andrea Hirata', 'Bentang Pustaka', 2005, '9789793062792', 'Novel', 5],
            ['Bumi Manusia', 'Pramoedya Ananta Toer', 'Hasta Mitra', 1980, '9789799731234', 'Sastra', 3],
            ['Clean Code', 'Robert C. Martin', 'Prentice Hall', 2008, '9780132350884', 'Teknologi', 2],
            ['Algoritma dan Pemrograman', 'Rinaldi Munir', 'Informatika', 2016, '9786026231123', 'Teknologi', 4],
            ['Filosofi Teras', 'Henry Manampiring', 'Kompas', 2018, '9786024125189', 'Self improvement', 6],
            ['Sapiens', 'Yuval Noah Harari', 'Harper', 2015, '9780062316097', 'Sejarah', 2],
        ];
        foreach ($books as [$title, $author, $publisher, $year, $isbn, $category, $stock]) {
            Book::updateOrCreate(['isbn' => $isbn], compact('title', 'author', 'publisher', 'year', 'category', 'stock'));
        }

        $members = [
            ['Budi Santoso', 'budi@example.com', '081234567890', 'Semarang'],
            ['Siti Rahmawati', 'siti@example.com', '081298765432', 'Ungaran'],
            ['Agus Pratama', 'agus@example.com', '085711122233', 'Salatiga'],
        ];
        foreach ($members as [$name, $email, $phone, $address]) {
            Member::updateOrCreate(['email' => $email], compact('name', 'phone', 'address'));
        }
    }
}
