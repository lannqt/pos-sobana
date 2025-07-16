<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PembelianController extends Controller
{
    public function index()
    {
        return Inertia::render('mstPembelian/PembelianBarang', [

        ]);
    }
}
