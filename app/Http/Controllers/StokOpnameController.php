<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


class StokOpnameController extends Controller
{
    public function index()
    {
        return Inertia::render('stokOpname/StokOpname', [

        ]);
    }
}
