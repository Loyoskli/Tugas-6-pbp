import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'
import Modal from '../components/Modal'

const EMPTY_FORM = {
  title: '',
  author: '',
  publisher: '',
  year: '',
  isbn: '',
  category: '',
  stock: 1,
}

export default function Books() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [books, setBooks] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    try {
      const res = await client.get('/books', { params: { q: search, page } })
      setBooks(res.data.data)
      setMeta(res.data.meta)
    } catch {
      toast.error('Gagal memuat data buku.')
    } finally {
      setLoading(false)
    }
  }, [search, page])

  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchBooks()
  }

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  const openEdit = (book) => {
    setEditing(book)
    setForm({
      title: book.title ?? '',
      author: book.author ?? '',
      publisher: book.publisher ?? '',
      year: book.year ?? '',
      isbn: book.isbn ?? '',
      category: book.category ?? '',
      stock: book.stock ?? 1,
    })
    setModalOpen(true)
  }

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form }
      if (payload.year === '') payload.year = null
      if (payload.stock === '') payload.stock = 0

      if (editing) {
        await client.put(`/books/${editing.id}`, payload)
        toast.success('Buku berhasil diperbarui.')
      } else {
        await client.post('/books', payload)
        toast.success('Buku berhasil ditambahkan.')
      }
      setModalOpen(false)
      fetchBooks()
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})
          .flat()
          .join(' ') ||
        'Gagal menyimpan buku.'
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (book) => {
    if (!window.confirm(`Hapus buku "${book.title}"?`)) return
    try {
      await client.delete(`/books/${book.id}`)
      toast.success('Buku berhasil dihapus.')
      fetchBooks()
    } catch {
      toast.error('Gagal menghapus buku.')
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <form onSubmit={handleSearch} className="flex w-full gap-2 sm:w-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul / penulis / kategori"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-uksw-600 focus:outline-none focus:ring-2 focus:ring-uksw-600/20 sm:w-72"
          />
          <button className="rounded-lg bg-uksw-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-uksw-800">
            Cari
          </button>
        </form>

        {isAdmin && (
          <button
            onClick={openCreate}
            className="rounded-lg bg-gold-400 px-4 py-2 text-sm font-semibold text-uksw-950 shadow-sm hover:bg-gold-300"
          >
            + Tambah buku
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-uksw-900 text-left text-xs uppercase tracking-wider text-uksw-100">
              <tr>
                <th className="px-4 py-3 font-semibold">Judul</th>
                <th className="px-4 py-3 font-semibold">Penulis</th>
                <th className="px-4 py-3 font-semibold">Kategori</th>
                <th className="px-4 py-3 font-semibold">Tahun</th>
                <th className="px-4 py-3 font-semibold">Stok</th>
                {isAdmin && <th className="px-4 py-3 text-right font-semibold">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="px-4 py-10 text-center text-slate-500">
                    Memuat…
                  </td>
                </tr>
              )}
              {!loading && books.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 6 : 5} className="px-4 py-10 text-center text-slate-500">
                    Tidak ada buku yang cocok.
                  </td>
                </tr>
              )}
              {!loading &&
                books.map((b) => (
                  <tr key={b.id} className="hover:bg-uksw-50/60">
                    <td className="px-4 py-3 font-semibold text-uksw-900">{b.title}</td>
                    <td className="px-4 py-3">{b.author}</td>
                    <td className="px-4 py-3">
                      {b.category ? (
                        <span className="inline-flex items-center rounded-full bg-uksw-50 px-2.5 py-0.5 text-xs font-semibold text-uksw-700 ring-1 ring-inset ring-uksw-200">
                          {b.category}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3">{b.year ?? '-'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                          b.stock <= 2
                            ? 'bg-gold-100 text-gold-700 ring-gold-300'
                            : 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                        }`}
                      >
                        {b.stock}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => openEdit(b)}
                            className="font-semibold text-uksw-700 hover:text-uksw-900 hover:underline"
                          >
                            Ubah
                          </button>
                          <button
                            onClick={() => handleDelete(b)}
                            className="font-semibold text-rose-600 hover:text-rose-700 hover:underline"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {meta && meta.last_page > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-slate-500">
            Halaman {meta.current_page} dari {meta.last_page} · {meta.total} data
          </p>
          <div className="flex gap-2">
            <button
              disabled={meta.current_page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 disabled:opacity-50"
            >
              ← Sebelumnya
            </button>
            <button
              disabled={meta.current_page >= meta.last_page}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 disabled:opacity-50"
            >
              Berikutnya →
            </button>
          </div>
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Ubah buku' : 'Tambah buku'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Judul *" name="title" value={form.title} onChange={onChange} required />
          <Field label="Penulis *" name="author" value={form.author} onChange={onChange} required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Penerbit" name="publisher" value={form.publisher} onChange={onChange} />
            <Field label="Tahun" name="year" type="number" value={form.year} onChange={onChange} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="ISBN" name="isbn" value={form.isbn} onChange={onChange} />
            <Field label="Kategori" name="category" value={form.category} onChange={onChange} />
          </div>
          <Field
            label="Stok *"
            name="stock"
            type="number"
            value={form.stock}
            onChange={onChange}
            required
          />

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-uksw-700 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-uksw-800 disabled:opacity-50"
            >
              {saving ? 'Menyimpan…' : 'Simpan'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function Field({ label, name, type = 'text', value, onChange, required = false }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-uksw-600 focus:outline-none focus:ring-2 focus:ring-uksw-600/20"
      />
    </div>
  )
}
