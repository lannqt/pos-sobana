<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DtlBarang extends Model
{
    protected $table = 'dtl_barang';

    protected $fillable = ['hdr_barang_id', 'jenis_barang', 'kemasan_barang', 'satuan_unit', 'isi_unit', 'stok_minimum', 'stok', 'harga_beli'];

    public function headerBarang()
    {
        return $this->belongsTo(HdrBarang::class, 'hdr_barang_id');
    }

    public function hargaJual()
    {
        return $this->hasMany(TypeHargaJual::class);
    }


}

