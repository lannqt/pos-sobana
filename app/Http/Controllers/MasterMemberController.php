<?php

namespace App\Http\Controllers;

use App\Models\MasterMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MasterMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allMembers = MasterMember::all();
        
        return Inertia::render('mstMember/MasterMember', [
            'members' => $allMembers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:55',
            'no_wa' => 'required|string|max:20',
            'alamat' => 'required|string',
            'point' => 'required|integer|min:0',
        ]);
        try {
            DB::statement("CALL sp_create_member(?, ?, ?, ?)", [
                $request->nama,
                $request->no_wa,
                $request->alamat,
                $request->point
            ]);

            return redirect()->back()->with('success', 'Member berhasil ditambahkan.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Gagal menambahkan member']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MasterMember $masterMember)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MasterMember $masterMember)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MasterMember $masterMember)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MasterMember $masterMember)
    {
        //
    }
}
