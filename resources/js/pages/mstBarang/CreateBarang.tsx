import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
// import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { jenisBarangOptions, kemasanOptions, satuanOptions } from '@/types/var';

const selectMap = {
    jenis_barang: jenisBarangOptions,
    kemasan_barang: kemasanOptions,
    satuan_unit: satuanOptions,
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tambah Barang', href: '/create-barang' },
];

type NewBarang = {
    kode_barang: string;
    nama_barang: string;
    detail: {
        jenis_barang: string;
        kemasan_barang: string;
        satuan_unit: string;
        isi_unit: number;
        stok_minimum: number;
        stok: number;
        harga_beli: number;
        harga_juals: {
            type_harga_jual: string;
            harga_jual: number;
        }[];
    };
}

export default function CreateBarang() {
    const { data, setData, post, processing, errors } = useForm<NewBarang>({
        kode_barang: '',
        nama_barang: '',
        detail: {
            jenis_barang: '',
            kemasan_barang: '',
            satuan_unit: '',
            isi_unit: 0,
            stok_minimum: 0,
            stok: 0,
            harga_beli: 0,
            harga_juals: [
                { type_harga_jual: 'Umum', harga_jual: 0 },
                { type_harga_jual: 'Pasar', harga_jual: 0 },
            ],
        },
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // post(route('mstBarang.store'), {
        //     onSuccess: () => {
        //         toast.success('Barang berhasil disimpan!');
        //     },
        //     onError: (errors) => {
        //         const msg = errors?.msg || 'Gagal menyimpan barang.';
        //         toast.error(msg);
        //     },
        // });
        post(route('mstBarang.store'));
    };

    const getDetailError = (key: keyof NewBarang['detail']) => {
        return (errors.detail as Record<string, string> | undefined)?.[key];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Barang" />
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-primary">Tambah Barang Baru</CardTitle>
                    </CardHeader>
                    <form onSubmit={submit}>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="kode_barang">Kode Barang <span className="text-red-500">*</span></Label>
                                    <Input id="kode_barang" type="text" required autoFocus value={data.kode_barang} onChange={(e) => setData('kode_barang', e.target.value)} disabled={processing} placeholder="Masukan Kode Barang" className="w-full" />
                                    <InputError message={errors.kode_barang} className="mt-1" />
                                </div>
                                <div>
                                    <Label htmlFor="nama_barang">Nama Barang <span className="text-red-500">*</span></Label>
                                    <Input id="nama_barang" type="text" required value={data.nama_barang} onChange={(e) => setData('nama_barang', e.target.value)} disabled={processing} placeholder="Masukan Nama Barang" className="w-full" />
                                    <InputError message={errors.nama_barang} className="mt-1" />
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-4">Detail Barang</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(['jenis_barang', 'kemasan_barang', 'satuan_unit'] as const).map((key, idx) => (
                                        <div key={idx}>
                                            <Label htmlFor={key}>{key.replace('_', ' ')}</Label>
                                            <Select
                                                value={data.detail[key]}
                                                onValueChange={(val) =>
                                                    setData("detail", { ...data.detail, [key]: val })
                                                }
                                                disabled={processing}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={`Pilih ${key.replace("_", " ")}`} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {selectMap[key].map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={getDetailError(key)} className="mt-1" />
                                        </div>
                                    ))}

                                    {(['isi_unit', 'stok_minimum', 'stok', 'harga_beli'] as const).map((key, idx) => (
                                        <div key={idx}>
                                            <Label htmlFor={key}>{key.replace('_', ' ')}</Label>
                                            <Input
                                                id={key}
                                                type="number"
                                                min={0}
                                                value={data.detail[key]}
                                                onChange={(e) => setData('detail', { ...data.detail, [key]: Number(e.target.value) })}
                                                disabled={processing}
                                                className="w-full"
                                            />
                                            <InputError message={getDetailError(key)} className="mt-1" />
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-4">Harga Jual</h3>
                                    <div className="space-y-4">
                                        {data.detail.harga_juals.map((hj, i) => (
                                            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <Label>Tipe Harga Jual</Label>
                                                    <Input value={hj.type_harga_jual} readOnly className="w-full" />
                                                </div>
                                                <div>
                                                    <Label>Harga Jual</Label>
                                                    <div className="relative">
                                                        <span className="absolute left-3 top-2.5">Rp</span>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            value={hj.harga_jual}
                                                            onChange={(e) => {
                                                                const updated = [...data.detail.harga_juals];
                                                                updated[i].harga_jual = Number(e.target.value);
                                                                setData('detail', { ...data.detail, harga_juals: updated });
                                                            }}
                                                            disabled={processing}
                                                            className="w-full pl-8"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-4">
                            <Button type="button" variant="outline" disabled={processing}>Batal</Button>
                            <Button type="submit" disabled={processing}>{processing ? 'Menyimpan...' : 'Simpan Barang'}</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
