import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HdrBarang } from "@/types"

export default function BarangDetailDialog({
  open,
  onOpenChange,
  barangList,
}: {
  open: boolean
  onOpenChange: (value: boolean) => void
  barangList: HdrBarang[]
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Barang</DialogTitle>
          <DialogDescription>
            Informasi lengkap barang dan harga jual
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="px-1 sm:px-2">
          {barangList.map((barang, i) => (
            <div key={i} className="mb-8 pb-4 border-b last:border-b-0">
              {/* Header barang */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h2 className="text-lg sm:text-xl font-semibold">{barang.kode_barang} - {barang.nama_barang}</h2>
              </div>

              {/* Detail barang */}
              {barang.detail_barang?.map((detail, j) => (
                <div key={j} className="p-4 rounded-xl border bg-muted/10 shadow-sm mb-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <InfoBlock label="Jenis" value={detail.jenis_barang} />
                    <InfoBlock label="Kemasan" value={detail.kemasan_barang} />
                    <InfoBlock label="Satuan" value={detail.satuan_unit} />
                    <InfoBlock label="Isi per Unit" value={detail.isi_unit?.toString()} />
                    <InfoBlock label="Stok Tersedia" value={detail.stok?.toString() || '0'} />
                    <InfoBlock label="Harga Beli" value={`Rp ${parseInt(detail.harga_beli?.toString() || '0').toLocaleString("id-ID")}`} />
                  </div>

                  {/* Harga Jual */}
                  {detail.harga_jual?.map((harga, k) => (
                        <div 
                          key={k} 
                          className="flex items-center justify-between p-3 border rounded-md bg-background hover:bg-accent transition-colors"
                        >
                          <span className="text-sm capitalize">{harga.type_harga_jual.toLowerCase()}</span>
                          <span className="font-medium text-primary">
                            Rp {parseInt(harga.harga_jual.toString()).toLocaleString("id-ID")}
                          </span>
                        </div>
                      ))}
                </div>
              ))}
            </div>
          ))}
        </ScrollArea>

        <DialogClose asChild>
          <Button className="w-full mt-2 sm:mt-0" size="lg">
            Tutup
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

function InfoBlock({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="text-base">{value || '-'}</p>
    </div>
  )
}
