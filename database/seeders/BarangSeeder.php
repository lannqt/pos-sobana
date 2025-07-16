<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HdrBarang;
use App\Models\DtlBarang;
use App\Models\TypeHargaJual;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 5) as $i) {
            // 1. Buat hdr_barang
            $hdr = HdrBarang::create([
                'kode_barang' => 'BRG' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'nama_barang' => 'Barang ' . chr(64 + $i),
            ]);

            foreach (range(1, rand(1, 3)) as $j) {
                // 2. Buat dtl_barang
                $dtl = DtlBarang::create([
                    'hdr_barang_id' => $hdr->id,
                    'jenis_barang' => $faker->word(),
                    'kemasan_barang' => $faker->randomElement(['Box', 'Pack', 'Dus']),
                    'satuan_unit' => 'pcs',
                    'isi_unit' => $faker->numberBetween(6, 24),
                    'stok_minimum' => $faker->numberBetween(1, 5),
                    'stok' => $faker->numberBetween(10, 50),
                    'harga_beli' => $faker->numberBetween(5000, 15000),
                ]);

                // 3. Buat harga_jual_barang (UMUM & PASAR)
                TypeHargaJual::insert([
                    [
                        'dtl_barang_id' => $dtl->id,
                        'type_harga_jual' => 'Umum',
                        'harga_jual' => $dtl->harga_beli + $faker->numberBetween(1000, 3000),
                        'created_at' => now(),
                        'updated_at' => null,
                    ],
                    [
                        'dtl_barang_id' => $dtl->id,
                        'type_harga_jual' => 'Pasar',
                        'harga_jual' => $dtl->harga_beli + $faker->numberBetween(500, 2000),
                        'created_at' => now(),
                        'updated_at' => null,
                    ]
                ]);
            }
        }
    }
}


