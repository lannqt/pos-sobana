<?php

namespace App\Http\Controllers;

use App\Models\HdrBarang;
use App\Models\DtlBarang;
use App\Models\HargaJualBarang;
use App\Models\TypeHargaJual;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MasterBarangController extends Controller
{
    public function index()
    {
        $mstBarang = HdrBarang::with(['detailBarang', 'detailBarang.hargaJual'])->get();

        // dd($mstBarang);
        return Inertia::render('mstBarang/MasterBarang', [
            'mstBarang' => $mstBarang
        ]);
    }

    public function create()
    {
        return Inertia::render('mstBarang/CreateBarang', [

        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_barang' => 'required|string|unique:hdr_barang,kode_barang',
            'nama_barang' => 'required|string',

            'detail.jenis_barang' => 'required|string',
            'detail.kemasan_barang' => 'required|string',
            'detail.satuan_unit' => 'required|string',
            'detail.isi_unit' => 'required|integer',
            'detail.stok_minimum' => 'required|integer',
            'detail.stok' => 'required|integer',
            'detail.harga_beli' => 'required|integer',

            'detail.harga_juals' => 'required|array|min:1',
            'detail.harga_juals.*.type_harga_jual' => 'required|string',
            'detail.harga_juals.*.harga_jual' => 'required|integer',
        ]);

        DB::beginTransaction();

        try {
            $hdr = HdrBarang::create([
                'kode_barang' => $validated['kode_barang'],
                'nama_barang' => $validated['nama_barang'],
            ]);

            $detail = $request->detail;

            $dtl = DtlBarang::create([
                'hdr_barang_id' => $hdr->id,
                'jenis_barang' => $detail['jenis_barang'],
                'kemasan_barang' => $detail['kemasan_barang'],
                'satuan_unit' => $detail['satuan_unit'],
                'isi_unit' => $detail['isi_unit'],
                'stok_minimum' => $detail['stok_minimum'],
                'stok' => $detail['stok'],
                'harga_beli' => $detail['harga_beli'],
            ]);

            foreach ($detail['harga_juals'] ?? [] as $hj) {
                TypeHargaJual::create([
                    'dtl_barang_id' => $dtl->id,
                    'type_harga_jual' => $hj['type_harga_jual'],
                    'harga_jual' => $hj['harga_jual'],
                ]);
            }

            DB::commit();

            return redirect()->back()->with('success', 'Barang berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors([
                'msg' => 'Gagal menyimpan data: ' . $e->getMessage(),
            ]);
        }
    }


    public function getHargaPasar($id)
    {
        $barang = HdrBarang::with([
            'details.typeHargaJual' => function ($query) {
                $query->where('nama', 'PASAR');
            }
        ])->findOrFail($id);

        $barang->setRelation('details', $barang->details->filter(function ($detail) {
            return $detail->typeHargaJual && $detail->typeHargaJual->nama === 'PASAR';
        })->values());

        return response()->json($barang);
    }



    public function getHargaUmum()
    {
        $barang = HdrBarang::with([
            'details.hargaJual' => function ($query) {
                $query->where('type_harga_jual', 'UMUM');
            }
        ])->get();

        return response()->json($barang);
    }
}
