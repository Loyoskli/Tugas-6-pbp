import { useEffect, useState } from 'react'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const STAT_ICONS = {
  books: 'M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5zm2 14h12',
  stock: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
  cats: 'M7 7h.01M7 3h5a1.99 1.99 0 011.41.59l7 7a2 2 0 010 2.82l-5 5a2 2 0 01-2.82 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z',
  members: 'M16 11a4 4 0 10-8 0m-4 9a8 8 0 0116 0',
}

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const isAdmin = user?.role === 'admin'

  useEffect(() => {
    client
      .get('/dashboard')
      .then((res) => setStats(res.data.data))
      .catch(() => toast.error('Gagal memuat dashboard.'))
  }, [])

  if (!stats) {
    return (
      <div className="grid place-items-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-uksw-200 border-t-uksw-700" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-uksw-900 via-uksw-800 to-uksw-600 px-6 py-8 text-white shadow-sm sm:px-8">
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gold-400/20" />
        <div className="absolute -bottom-16 right-24 h-40 w-40 rounded-full border-[20px] border-white/5" />
        <div className="relative">
          <p className="text-sm font-semibold text-gold-300">Selamat datang</p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
            Halo, {user?.name}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-uksw-100">
            {isAdmin
              ? 'Kamu bisa menambah, mengubah, dan menghapus data perpustakaan.'
              : 'Kamu bisa melihat data buku dan anggota.'}
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Judul buku" value={stats.totalBooks} tone="uksw" icon={STAT_ICONS.books} />
        <StatCard label="Total eksemplar" value={stats.totalStock} tone="gold" icon={STAT_ICONS.stock} />
        <StatCard label="Kategori" value={stats.totalCats} tone="emerald" icon={STAT_ICONS.cats} />
        <StatCard label="Anggota" value={stats.totalMembers} tone="rose" icon={STAT_ICONS.members} />
      </div>

      {/* Latest books */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold text-uksw-900">Buku terbaru</h2>
        </div>
        <ul className="divide-y divide-slate-100">
          {stats.latestBooks.length === 0 && (
            <li className="px-5 py-8 text-center text-slate-500">Belum ada buku.</li>
          )}
          {stats.latestBooks.map((b) => (
            <li
              key={b.id}
              className="flex items-center justify-between gap-4 px-5 py-3.5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-uksw-900 text-sm font-bold text-gold-300">
                  {b.title.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800">{b.title}</p>
                  <p className="truncate text-sm text-slate-500">{b.author}</p>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                  b.stock <= 2
                    ? 'bg-gold-100 text-gold-700 ring-gold-300'
                    : 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                }`}
              >
                Stok {b.stock}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function StatCard({ label, value, tone, icon }) {
  const tones = {
    uksw: 'bg-uksw-50 text-uksw-700',
    gold: 'bg-gold-100 text-gold-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    rose: 'bg-rose-50 text-rose-700',
  }
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tones[tone]}`}>
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </span>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-3xl font-extrabold tracking-tight text-uksw-900">{value}</p>
      </div>
    </div>
  )
}
