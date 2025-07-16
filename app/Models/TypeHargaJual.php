<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeHargaJual extends Model
{
    protected $table = 'harga_jual_barang';

    protected $fillable = [
        'dtl_barang_id',
        'type_harga_jual',
        'harga_jual',
    ];

    public function detailBarang()
    {
        return $this->belongsTo(DtlBarang::class, 'dtl_barang_id');
    }
}
