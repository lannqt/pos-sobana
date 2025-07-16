import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { AllMember, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React from 'react';
import { ReusableTable } from '@/components/reusable-datatable';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Master Member',
    href: '/master-member',
  },
];

interface MasterMemberProps {
  members: AllMember[];
}

export default function MasterMember({ members }: MasterMemberProps) {
  const columns: ColumnDef<AllMember>[] = [
    {
      accessorKey: "MEMBER_ID",
      header: "Member ID",
    },
    {
      accessorKey: "NM_MEMBER",
      header: "Nama Member",
    },
    {
      accessorKey: "NO_WA",
      header: "No Wa",
    },
    {
      accessorKey: "ALAMAT",
      header: "Alamat",
    },
    {
      accessorKey: "POINT",
      header: "Point",
    },
  ]


  console.log('All Members:', members);
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Master Member" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div> */}
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          {/* <ReusableTable data={members} columns={columns} /> */}
          <ReusableTable
            data={members}
            columns={columns}
            // loading={isLoading}
            // filterColumn="idKlaim"
            // filterPlaceholder="Cari ID Klaim"
            enableColumnToggle
          />
        </div>
      </div>
    </AppLayout>
  );
}
