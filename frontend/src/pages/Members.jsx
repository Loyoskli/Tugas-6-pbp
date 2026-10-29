import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'
import Modal from '../components/Modal'

const EMPTY_FORM = { name: '', email: '', phone: '', address: '' }

export default function Members() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [members, setMembers] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const fetchMembers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await client.get('/members', { params: { q: search, page } })
      setMembers(res.data.data)
      setMeta(res.data.meta)
    } catch {
      toast.error('Gagal memuat data anggota.')
    } finally {
      setLoading(false)
    }
  }, [search, page])

  useEffect(() => {
    fetchMembers()
  }, [fetchMembers])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    fetchMembers()
  }

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setModalOpen(true)
  }

  const openEdit = (member) => {
    setEditing(member)
    setForm({
      name: member.name ?? '',
      email: member.email ?? '',
      phone: member.phone ?? '',
      address: member.address ?? '',
    })
    setModalOpen(true)
  }

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) {
        await client.put(`/members/${editing.id}`, form)
        toast.success('Anggota berhasil diperbarui.')
      } else {
        await client.post('/members', form)
        toast.success('Anggota berhasil ditambahkan.')
      }
      setModalOpen(false)
      fetchMembers()
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})
          .flat()
          .join(' ') ||
        'Gagal menyimpan anggota.'
      toast.error(msg)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (member) => {
    if (!window.confirm(`Hapus anggota "${member.name}"?`)) return
    try {
      await client.delete(`/members/${member.id}`)
      toast.success('Anggota berhasil dihapus.')
      fetchMembers()
    } catch {
      toast.error('Gagal menghapus anggota.')
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <form onSubmit={handleSearch} className="flex w-full gap-2 sm:w-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama / email"
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
            + Tambah anggota
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-uksw-900 text-left text-xs uppercase tracking-wider text-uksw-100">
              <tr>
                <th className="px-4 py-3 font-semibold">Nama</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Telepon</th>
                <th className="px-4 py-3 font-semibold">Alamat</th>
                {isAdmin && <th className="px-4 py-3 text-right font-semibold">Aksi</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td colSpan={isAdmin ? 5 : 4} className="px-4 py-10 text-center text-slate-500">
                    Memuat…
                  </td>
                </tr>
              )}
              {!loading && members.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 5 : 4} className="px-4 py-10 text-center text-slate-500">
                    Tidak ada anggota yang cocok.
                  </td>
                </tr>
              )}
              {!loading &&
                members.map((m) => (
                  <tr key={m.id} className="hover:bg-uksw-50/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-uksw-100 text-sm font-bold text-uksw-800">
                          {m.name.charAt(0).toUpperCase()}
                        </span>
                        <span className="font-semibold text-uksw-900">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{m.email}</td>
                    <td className="px-4 py-3">{m.phone ?? '-'}</td>
                    <td className="px-4 py-3">{m.address ?? '-'}</td>
                    {isAdmin && (
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => openEdit(m)}
                            className="font-semibold text-uksw-700 hover:text-uksw-900 hover:underline"
                          >
                            Ubah
                          </button>
                          <button
                            onClick={() => handleDelete(m)}
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
        title={editing ? 'Ubah anggota' : 'Tambah anggota'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nama lengkap *" name="name" value={form.name} onChange={onChange} required />
          <Field label="Email *" name="email" type="email" value={form.email} onChange={onChange} required />
          <Field label="Telepon" name="phone" value={form.phone} onChange={onChange} />
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Alamat</label>
            <textarea
              name="address"
              value={form.address}
              onChange={onChange}
              rows={3}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-uksw-600 focus:outline-none focus:ring-2 focus:ring-uksw-600/20"
            />
          </div>

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
