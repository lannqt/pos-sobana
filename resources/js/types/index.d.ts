import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface AllMember {
    MEMBER_ID: number;
    NM_MEMBER: string;
    NO_WA: string;
    ALAMAT: string;
    POINT: number;
    created_at?: string;
    updated_at?: string;
}

export interface HdrBarang {
  id?: number;
  kode_barang: string;
  nama_barang: string;
  created_at?: string;
  updated_at?: string;

  detail_barang?: DtlBarang[];
}

export interface DtlBarang {
  id?: number;
  hdr_barang_id: number;
  jenis_barang: string;
  kemasan_barang: string;
  satuan_unit: string;
  isi_unit: number;
  stok_minimum: number;
  stok: number;
  harga_beli: number;
  created_at?: string;
  updated_at?: string;

  harga_jual?: HargaJualBarang[]; // <- relasi
}

export interface HargaJualBarang {
  id: number;
  dtl_barang_id: number;
  type_harga_jual: string; // "UMUM" | "PASAR"
  harga_jual: number;
  created_at?: string;
  updated_at?: string;
}

export const formatCurrency = (
  value: number, 
  withSymbol: boolean = true
): string => {
  return new Intl.NumberFormat('id-ID', {
    style: withSymbol ? 'currency' : 'decimal',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('id-ID').format(value);
};

