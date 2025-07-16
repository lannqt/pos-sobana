<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MasterBarangController;

Route::post('/barang', [MasterBarangController::class, 'store']);
Route::get('/harga-pasar/{id}', [MasterBarangController::class, 'getHargaPasar']);
