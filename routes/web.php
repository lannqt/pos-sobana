<?php

use App\Http\Controllers\MasterBarangController;
use App\Http\Controllers\MasterMemberController;
use App\Http\Controllers\PembelianController;
use App\Http\Controllers\StokOpnameController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('/master-member', [MasterMemberController::class, 'index'])->name('allMember.index');
    Route::get('/master-barang', [MasterBarangController::class, 'index'])->name('mstBarang.index');
    Route::get('/create-barang', [MasterBarangController::class, 'create'])->name('mstBarang.create');
    Route::post('/store-barang', [MasterBarangController::class, 'store'])->name('mstBarang.store');
    Route::get('/pembelian-barang', [PembelianController::class, 'index'])->name('pembelian.index');
    Route::get('/stok-opname', [StokOpnameController::class, 'index'])->name('stokOpname.index');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
