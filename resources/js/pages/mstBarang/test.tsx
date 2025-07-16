// import AppLayout from '@/layouts/app-layout';
// import { type BreadcrumbItem } from '@/types';
// import { Head, useForm } from '@inertiajs/react';
// import { FormEventHandler, useState } from 'react';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import InputError from '@/components/input-error';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
// import { Plus, Trash2, Minus } from 'lucide-react';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Tambah Barang',
//         href: '/create-barang',
//     },
// ];

// type NewBarang = {
//     kode_barang: string;
//     nama_barang: string;
//     details: {
//         jenis_barang: string;
//         kemasan_barang: string;
//         satuan_unit: string;
//         isi_unit: number;
//         stok_minimum: number;
//         stok: number;
//         harga_beli: number;
//         harga_juals: {
//             type_harga_jual: string;
//             harga_jual: number;
//         }[];
//     }[];
// }

// export default function CreateBarang() {
//     const [activeDetailIndex, setActiveDetailIndex] = useState(0);

//     const { data, setData, post, processing, errors } = useForm<NewBarang>({
//         kode_barang: '',
//         nama_barang: '',
//         details: [
//             {
//                 jenis_barang: '',
//                 kemasan_barang: '',
//                 satuan_unit: '',
//                 isi_unit: 0,
//                 stok_minimum: 0,
//                 stok: 0,
//                 harga_beli: 0,
//                 harga_juals: [
//                     { type_harga_jual: 'Umum', harga_jual: 0 },
//                     { type_harga_jual: 'Pasar', harga_jual: 0 },
//                 ],
//             },
//         ],
//     });

//     const submit: FormEventHandler = (e) => {
//         e.preventDefault();
//         post(route('mstBarang.store'));
//     };

//     const addDetail = () => {
//         setData('details', [
//             ...data.details,
//             {
//                 jenis_barang: '',
//                 kemasan_barang: '',
//                 satuan_unit: '',
//                 isi_unit: 0,
//                 stok_minimum: 0,
//                 stok: 0,
//                 harga_beli: 0,
//                 harga_juals: [
//                     { type_harga_jual: 'Umum', harga_jual: 0 },
//                     { type_harga_jual: 'Pasar', harga_jual: 0 },
//                 ],
//             },
//         ]);
//         setActiveDetailIndex(data.details.length);
//     };

//     const removeDetail = (index: number) => {
//         if (data.details.length > 1) {
//             const newDetails = [...data.details];
//             newDetails.splice(index, 1);
//             setData('details', newDetails);
//             setActiveDetailIndex(Math.min(activeDetailIndex, newDetails.length - 1));
//         }
//     };

//     const addHargaJual = (detailIndex: number) => {
//         const newDetails = [...data.details];
//         newDetails[detailIndex].harga_juals.push({
//             type_harga_jual: 'Custom',
//             harga_jual: 0,
//         });
//         setData('details', newDetails);
//     };

//     const removeHargaJual = (detailIndex: number, hargaJualIndex: number) => {
//         const newDetails = [...data.details];
//         if (newDetails[detailIndex].harga_juals.length > 2) {
//             newDetails[detailIndex].harga_juals.splice(hargaJualIndex, 1);
//             setData('details', newDetails);
//         }
//     };

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Tambah Barang" />
//             <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
//                 <Card className="shadow-lg">
//                     <CardHeader>
//                         <CardTitle className="text-2xl font-bold text-primary">Tambah Barang Baru</CardTitle>
//                     </CardHeader>
//                     <form onSubmit={submit}>
//                         <CardContent className="space-y-6">
//                             {/* Informasi Dasar Barang */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <Label htmlFor="kode_barang" className="block mb-2 font-medium">
//                                         Kode Barang <span className="text-red-500">*</span>
//                                     </Label>
//                                     <Input
//                                         id="kode_barang"
//                                         type="text"
//                                         required
//                                         autoFocus
//                                         tabIndex={1}
//                                         value={data.kode_barang}
//                                         onChange={(e) => setData('kode_barang', e.target.value)}
//                                         disabled={processing}
//                                         placeholder="Masukan Kode Barang"
//                                         className="w-full"
//                                     />
//                                     <InputError message={errors.kode_barang} className="mt-1" />
//                                 </div>
//                                 <div>
//                                     <Label htmlFor="nama_barang" className="block mb-2 font-medium">
//                                         Nama Barang <span className="text-red-500">*</span>
//                                     </Label>
//                                     <Input
//                                         id="nama_barang"
//                                         type="text"
//                                         required
//                                         tabIndex={2}
//                                         value={data.nama_barang}
//                                         onChange={(e) => setData('nama_barang', e.target.value)}
//                                         disabled={processing}
//                                         placeholder="Masukan Nama Barang"
//                                         className="w-full"
//                                     />
//                                     <InputError message={errors.nama_barang} className="mt-1" />
//                                 </div>
//                             </div>

//                             {/* Detail Barang */}
//                             <div className="border rounded-lg p-4">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <h3 className="text-lg font-semibold">Detail Barang</h3>
//                                     <div className="flex space-x-2">
//                                         {data.details.map((_, index) => (
//                                             <Button
//                                                 key={index}
//                                                 type="button"
//                                                 variant={activeDetailIndex === index ? 'default' : 'outline'}
//                                                 size="sm"
//                                                 onClick={() => setActiveDetailIndex(index)}
//                                                 className="rounded-full h-8 w-8 p-0"
//                                             >
//                                                 {index + 1}
//                                             </Button>
//                                         ))}
//                                         <Button
//                                             type="button"
//                                             variant="outline"
//                                             size="sm"
//                                             onClick={addDetail}
//                                             className="rounded-full h-8 w-8 p-0"
//                                         >
//                                             <Plus className="h-4 w-4" />
//                                         </Button>
//                                     </div>
//                                 </div>

//                                 {data.details.length > 1 && (
//                                     <div className="flex justify-end mb-2">
//                                         <Button
//                                             type="button"
//                                             variant="destructive"
//                                             size="sm"
//                                             onClick={() => removeDetail(activeDetailIndex)}
//                                             disabled={data.details.length <= 1}
//                                             className="gap-1"
//                                         >
//                                             <Trash2 className="h-4 w-4" />
//                                             Hapus Detail
//                                         </Button>
//                                     </div>
//                                 )}

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <Label htmlFor={`jenis_barang_${activeDetailIndex}`} className="block mb-2 font-medium">
//                                             Jenis Barang
//                                         </Label>
//                                         <Input
//                                             id={`jenis_barang_${activeDetailIndex}`}
//                                             type="text"
//                                             tabIndex={3}
//                                             value={data.details[activeDetailIndex].jenis_barang}
//                                             onChange={(e) =>
//                                                 setData(`details.${activeDetailIndex}.jenis_barang`, e.target.value)
//                                             }
//                                             disabled={processing}
//                                             placeholder="Masukan Jenis Barang"
//                                             className="w-full"
//                                         />
//                                         <InputError
//                                             message={errors[`details.${activeDetailIndex}.jenis_barang`]}
//                                             className="mt-1"
//                                         />
//                                     </div>
//                                     <div>
//                                         <Label htmlFor={`kemasan_barang_${activeDetailIndex}`} className="block mb-2 font-medium">
//                                             Kemasan Barang
//                                         </Label>
//                                         <Input
//                                             id={`kemasan_barang_${activeDetailIndex}`}
//                                             type="text"
//                                             tabIndex={4}
//                                             value={data.details[activeDetailIndex].kemasan_barang}
//                                             onChange={(e) =>
//                                                 setData(`details.${activeDetailIndex}.kemasan_barang`, e.target.value)
//                                             }
//                                             disabled={processing}
//                                             placeholder="Masukan Kemasan Barang"
//                                             className="w-full"
//                                         />
//                                         <InputError
//                                             message={errors[`details.${activeDetailIndex}.kemasan_barang`]}
//                                             className="mt-1"
//                                         />
//                                     </div>
//                                     <div>
//                                         <Label htmlFor={`satuan_unit_${activeDetailIndex}`} className="block mb-2 font-medium">
//                                             Satuan Unit
//                                         </Label>
//                                         <Input
//                                             id={`satuan_unit_${activeDetailIndex}`}
//                                             type="text"
//                                             tabIndex={5}
//                                             value={data.details[activeDetailIndex].satuan_unit}
//                                             onChange={(e) =>
//                                                 setData(`details.${activeDetailIndex}.satuan_unit`, e.target.value)
//                                             }
//                                             disabled={processing}
//                                             placeholder="Masukan Satuan Unit"
//                                             className="w-full"
//                                         />
//                                         <InputError
//                                             message={errors[`details.${activeDetailIndex}.satuan_unit`]}
//                                             className="mt-1"
//                                         />
//                                     </div>
//                                     <div>
//                                         <Label htmlFor={`isi_unit_${activeDetailIndex}`} className="block mb-2 font-medium">
//                                             Isi per Unit
//                                         </Label>
//                                         <Input
//                                             id={`isi_unit_${activeDetailIndex}`}
//                                             type="number"
//                                             min="0"
//                                             tabIndex={6}
//                                             value={data.details[activeDetailIndex].isi_unit}
//                                             onChange={(e) =>
//                                                 setData(`details.${activeDetailIndex}.isi_unit`, Number(e.target.value))
//                                             }
//                                             disabled={processing}
//                                             className="w-full"
//                                         />
//                                         <InputError
//                                             message={errors[`details.${activeDetailIndex}.isi_unit`]}
//                                             className="mt-1"
//                                         />
//                                     </div>
//                                     <div>
//                                         <Label htmlFor={`stok_minimum_${activeDetailIndex}`} className="block mb-2 font-medium">
//                                             Stok Minimum
//                                         </Label>
//                                         <Input
//                                             id={`stok_minimum_${activeDetailIndex}`}
//                                             type="number"
//                                             min="0"
//                                             tabIndex={7}
//                                             value={data.details[activeDetailIndex].stok_minimum}
//                                             onChange={(e) =>
//                                                 setData(`details.${activeDetailIndex}.stok_minimum`, Number(e.target.value))
//                                             }
//                                             disabled={processing}
//                                             className="w-full"
//                                         />
//                                         <InputError
//                                             message={errors[`details.${activeDetailIndex}.stok_minimum`]}
//                                             className="mt-1"
//                                         />
//                                     </div>
//                                     <div>
//                                         <Label htmlFor={`stok_${activeDetailIndex}`} className="block mb-2 font-medium">
//                                             Stok Awal
//                                         </Label>
//                                         <Input
//                                             id={`stok_${activeDetailIndex}`}
//                                             type="number"
//                                             min="0"
//                                             tabIndex={8}
//                                             value={data.details[activeDetailIndex].stok}
//                                             onChange={(e) =>
//                                                 setData(`details.${activeDetailIndex}.stok`, Number(e.target.value))
//                                             }
//                                             disabled={processing}
//                                             className="w-full"
//                                         />
//                                         <InputError
//                                             message={errors[`details.${activeDetailIndex}.stok`]}
//                                             className="mt-1"
//                                         />
//                                     </div>
//                                     <div>
//                                         <Label htmlFor={`harga_beli_${activeDetailIndex}`} className="block mb-2 font-medium">
//                                             Harga Beli
//                                         </Label>
//                                         <div className="relative">
//                                             <span className="absolute left-3 top-2.5">Rp</span>
//                                             <Input
//                                                 id={`harga_beli_${activeDetailIndex}`}
//                                                 type="number"
//                                                 min="0"
//                                                 tabIndex={9}
//                                                 value={data.details[activeDetailIndex].harga_beli}
//                                                 onChange={(e) =>
//                                                     setData(
//                                                         `details.${activeDetailIndex}.harga_beli`,
//                                                         Number(e.target.value)
//                                                     )
//                                                 }
//                                                 disabled={processing}
//                                                 className="w-full pl-8"
//                                             />
//                                         </div>
//                                         <InputError
//                                             message={errors[`details.${activeDetailIndex}.harga_beli`]}
//                                             className="mt-1"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Harga Jual */}
//                                 <div className="mt-6">
//                                     <div className="flex justify-between items-center mb-4">
//                                         <h3 className="text-lg font-semibold">Harga Jual</h3>
//                                         <Button
//                                             type="button"
//                                             variant="outline"
//                                             size="sm"
//                                             onClick={() => addHargaJual(activeDetailIndex)}
//                                             className="gap-1"
//                                         >
//                                             <Plus className="h-4 w-4" />
//                                             Tambah Harga Jual
//                                         </Button>
//                                     </div>

//                                     <div className="space-y-4">
//                                         {data.details[activeDetailIndex].harga_juals.map((hargaJual, hjIndex) => (
//                                             <div key={hjIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//                                                 <div>
//                                                     <Label
//                                                         htmlFor={`type_harga_jual_${activeDetailIndex}_${hjIndex}`}
//                                                         className="block mb-2 font-medium"
//                                                     >
//                                                         Tipe Harga Jual
//                                                     </Label>
//                                                     <Input
//                                                         id={`type_harga_jual_${activeDetailIndex}_${hjIndex}`}
//                                                         type="text"
//                                                         tabIndex={10 + hjIndex * 2}
//                                                         value={hargaJual.type_harga_jual}
//                                                         onChange={(e) =>
//                                                             setData(
//                                                                 `details.${activeDetailIndex}.harga_juals.${hjIndex}.type_harga_jual`,
//                                                                 e.target.value
//                                                             )
//                                                         }
//                                                         disabled={processing}
//                                                         className="w-full"
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <Label
//                                                         htmlFor={`harga_jual_${activeDetailIndex}_${hjIndex}`}
//                                                         className="block mb-2 font-medium"
//                                                     >
//                                                         Harga Jual
//                                                     </Label>
//                                                     <div className="relative">
//                                                         <span className="absolute left-3 top-2.5">Rp</span>
//                                                         <Input
//                                                             id={`harga_jual_${activeDetailIndex}_${hjIndex}`}
//                                                             type="number"
//                                                             min="0"
//                                                             tabIndex={11 + hjIndex * 2}
//                                                             value={hargaJual.harga_jual}
//                                                             onChange={(e) =>
//                                                                 setData(
//                                                                     `details.${activeDetailIndex}.harga_juals.${hjIndex}.harga_jual`,
//                                                                     Number(e.target.value)
//                                                                 )
//                                                             }
//                                                             disabled={processing}
//                                                             className="w-full pl-8"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex justify-end">
//                                                     {data.details[activeDetailIndex].harga_juals.length > 2 && (
//                                                         <Button
//                                                             type="button"
//                                                             variant="destructive"
//                                                             size="sm"
//                                                             onClick={() => removeHargaJual(activeDetailIndex, hjIndex)}
//                                                             className="gap-1"
//                                                         >
//                                                             <Minus className="h-4 w-4" />
//                                                             Hapus
//                                                         </Button>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </CardContent>
//                         <CardFooter className="flex justify-end gap-4">
//                             <Button type="button" variant="outline" disabled={processing}>
//                                 Batal
//                             </Button>
//                             <Button type="submit" disabled={processing}>
//                                 {processing ? 'Menyimpan...' : 'Simpan Barang'}
//                             </Button>
//                         </CardFooter>
//                     </form>
//                 </Card>
//             </div>
//         </AppLayout>
//     );
// }
