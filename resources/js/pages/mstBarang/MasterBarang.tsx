import { ReusableTable } from '@/components/reusable-datatable';
import { Button } from '@/components/ui/button';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { HdrBarang, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import BarangDetailDialog from './BarangDetailDialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Barang',
        href: '/master-barang',
    },
];

interface MasterBarangProps {
    mstBarang: HdrBarang[];
}

export default function MasterBarang({ mstBarang }: MasterBarangProps) {
    const [open, setOpen] = useState(false);
    const [selectedBarang, setSelectedBarang] = useState<HdrBarang | null>(null);
    const columns: ColumnDef<HdrBarang>[] = [
        {
            accessorKey: "kode_barang",
            header: "Kode Barang",
        },
        {
            accessorKey: "nama_barang",
            header: "Nama Barang",
        },
        {
            header: "Jenis Barang",
            cell: ({ row }) => {
                const detail = row.original.detail_barang?.[0];
                return detail?.jenis_barang || "-";
            },
        },
        {
            header: "Stok Minimum",
            cell: ({ row }) => {
                const detail = row.original.detail_barang?.[0];
                return detail?.stok_minimum || "-";
            },
        },
        {
            header: "Stok",
            cell: ({ row }) => {
                const detail = row.original.detail_barang?.[0];
                return detail?.stok || "-";
            },
        },
        {
            header: "Harga Jual UMUM",
            cell: ({ row }) => {
                const hargaUmum = row.original.detail_barang?.[0]?.harga_jual?.find(
                    (h) => h.type_harga_jual === "Umum"
                );
                return hargaUmum ? `Rp ${Number(hargaUmum.harga_jual).toLocaleString("id-ID")}` : "-";
            },
        },
        {
            id: "actions",
            header: "Aksi",
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setSelectedBarang(row.original);
                        setOpen(true);
                    }}
                >
                    Detail
                </Button>
            ),
        },
    ];


    console.log(mstBarang);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Barang" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <Button asChild>
                    <Link href={route("mstBarang.create")}>
                        Tambah Barang
                    </Link>
                </Button>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <ReusableTable
                        data={mstBarang}
                        columns={columns}
                        // loading={isLoading}
                        // filterColumn="kode_barang"
                        // filterPlaceholder="Cari Kode Barang"
                        enableColumnToggle
                    />
                    <BarangDetailDialog
                        open={open}
                        onOpenChange={setOpen}
                        barangList={selectedBarang ? [selectedBarang] : []}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
