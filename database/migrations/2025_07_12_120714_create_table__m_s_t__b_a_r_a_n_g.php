<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // ✅ MASTER BARANG
        Schema::create('hdr_barang', function (Blueprint $table) {
            $table->id(); // Laravel default: hdr_barang.id
            $table->string('kode_barang', 55)->unique()->comment('Kode Barang');
            $table->string('nama_barang', 55)->comment('Nama Barang');
            $table->timestamps();
        });

        // ✅ DETAIL BARANG
        Schema::create('dtl_barang', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hdr_barang_id')
                ->constrained('hdr_barang')
                ->onDelete('cascade');

            $table->string('jenis_barang', 55)->comment('Jenis Barang');
            $table->string('kemasan_barang', 55)->comment('Kemasan Barang');
            $table->string('satuan_unit', 55)->comment('Satuan Unit');
            $table->string('isi_unit', 55)->comment('Isi Unit');
            $table->integer('stok_minimum')->comment('Stok Minimum');
            $table->integer('stok')->default(0)->comment('Stok Saat Ini');

            $table->decimal('harga_beli', 15, 2)->comment('Harga Beli');
            $table->timestamps();
        });

        Schema::create('harga_jual_barang', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dtl_barang_id')->constrained('dtl_barang')->onDelete('cascade');
            $table->string('type_harga_jual'); // UMUM, PASAR, dll.
            $table->decimal('harga_jual', 15, 2);
            $table->timestamps();
        });

        // ✅ HEADER PEMBELIAN
        Schema::create('hdr_pembelian', function (Blueprint $table) {
            $table->id();
            $table->string('kode_pembelian', 120)->unique()->comment('Kode Pembelian');
            $table->enum('type_pembelian', ['PO', 'NON PO'])->comment('Jenis Pembelian');
            $table->decimal('netto', 15, 2)->default(0)->comment('Total Harga');
            $table->timestamps();
        });

        // ✅ DETAIL PEMBELIAN
        Schema::create('dtl_pembelian', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hdr_pembelian_id')
                ->constrained('hdr_pembelian')
                ->onDelete('cascade');

            $table->foreignId('hdr_barang_id')
                ->constrained('hdr_barang')
                ->onDelete('cascade');

            $table->integer('qty')->comment('Quantity');
            $table->decimal('harga_beli', 15, 2)->comment('Harga Beli');
            $table->timestamps();
        });

        // ✅ HEADER STOK OPNAME
        Schema::create('hdr_stok_opname', function (Blueprint $table) {
            $table->id();
            $table->string('kode_stok_opname', 55)->unique()->comment('Kode Stok Opname');
            $table->string('periode', 55)->comment('Periode Stok Opname');
            $table->date('tanggal')->comment('Tanggal Dilakukan');
            $table->timestamps();
        });

        // ✅ DETAIL STOK OPNAME
        Schema::create('dtl_stok_opname', function (Blueprint $table) {
            $table->id();

            $table->foreignId('hdr_stok_opname_id')
                ->constrained('hdr_stok_opname')
                ->onDelete('cascade');

            $table->foreignId('hdr_barang_id')
                ->constrained('hdr_barang')
                ->onDelete('cascade');

            $table->integer('stok_sistem')->default(0)->comment('Stok dari Sistem');
            $table->integer('stok_fisik')->default(0)->comment('Stok Hasil Opname');
            $table->integer('selisih')->default(0)->comment('Selisih Stok');

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dtl_stok_opname');
        Schema::dropIfExists('hdr_stok_opname');
        Schema::dropIfExists('dtl_pembelian');
        Schema::dropIfExists('hdr_pembelian');
        Schema::dropIfExists('dtl_barang');
        Schema::dropIfExists('hdr_barang');
    }
};
