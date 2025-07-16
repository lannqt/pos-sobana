<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HdrBarang extends Model
{
    protected $table = 'hdr_barang';

    protected $fillable = ['kode_barang', 'nama_barang'];

    public function detailBarang()
    {
        return $this->hasMany(DtlBarang::class, 'hdr_barang_id');
    }
}
