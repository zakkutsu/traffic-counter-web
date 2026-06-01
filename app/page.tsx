"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "traffic-counter-theme";

const features = [
  {
    title: "Smart timestamps",
    desc: "Setiap tap terekam dengan presisi waktu yang tepat. Laporan otomatis terbagi ke dalam interval 15 menit.",
  },
  {
    title: "Kustomisasi cepat",
    desc: "Ubah ukuran tombol, label, kategori kendaraan, dan warna tanpa harus keluar dari sesi survei berjalan.",
  },
  {
    title: "Penyimpanan lokal",
    desc: "Data dan preferensi tetap aman secara lokal, walau aplikasi tertutup atau perangkat mati mendadak.",
  },
  {
    title: "Ekspor CSV",
    desc: "Format file siap diolah di Excel atau dibagikan dengan mudah lewat email dan WhatsApp.",
  },
  {
    title: "Layar tetap aktif",
    desc: "Dilengkapi mode Wake Lock sehingga survei durasi panjang tidak terhenti akibat layar meredup.",
  },
  {
    title: "Standar MKJI 1997",
    desc: "Struktur data, parameter, dan kategori diatur ketat mengikuti pedoman Manual Kapasitas Jalan Indonesia.",
  },
];

const modules = [
  {
    id: "1",
    title: "Volume",
    desc: "Klasifikasi kendaraan MC, LV, HV, UM.",
  },
  {
    id: "2",
    title: "Hambatan",
    desc: "Pejalan kaki, parkir, dan side friction.",
  },
  {
    id: "3",
    title: "Kecepatan",
    desc: "UX Stopwatch terintegrasi untuk spot speed.",
  },
  {
    id: "4",
    title: "Geometrik",
    desc: "Tipe jalan, drainase, dan tata guna lahan.",
  },
  {
    id: "5",
    title: "Keselamatan",
    desc: "Manuver konflik TCT pada persimpangan.",
  },
  {
    id: "6",
    title: "Pengaturan",
    desc: "Interval waktu dan kustomisasi antarmuka.",
  },
];

const moduleContents: Record<string, React.ReactNode> = {
  "1": (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Survei Volume Lalu Lintas</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">Klasifikasi Kendaraan berdasarkan MKJI 1997</p>
      </div>
      <p className="text-base leading-relaxed text-[var(--muted)]">
        MKJI 1997 secara resmi membagi kendaraan ke dalam 4 golongan utama (ini yang menjadi fokus pada tombol aplikasi):
      </p>
      <ul className="space-y-4">
        <li className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <strong className="text-lg font-bold">LV (Light Vehicle / Kendaraan Ringan)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Mobil penumpang, minibus, pikap, angkot.</p>
        </li>
        <li className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <strong className="text-lg font-bold">HV (Heavy Vehicle / Kendaraan Berat)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Bus, truk 2 as, truk 3 as, truk gandeng/trailer.</p>
        </li>
        <li className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <strong className="text-lg font-bold">MC (Motor Cycle / Sepeda Motor)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Kendaraan bermotor roda dua atau tiga.</p>
        </li>
        <li className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <strong className="text-lg font-bold">UM (Unmotorised / Kendaraan Tak Bermotor)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Sepeda, becak, andong, kereta dorong.</p>
          <div className="mt-3 rounded-lg bg-orange-500/10 p-3 text-xs font-medium text-orange-600 dark:text-orange-400">
            *Perhatikan: UM tidak dimasukkan dalam perhitungan volume total atau SMP, melainkan dipindah menjadi salah satu unsur Hambatan Samping.
          </div>
        </li>
      </ul>
    </div>
  ),
  "2": (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Survei Hambatan Samping</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">Side Friction Parameter (Kejadian per 200m/jam)</p>
      </div>
      <p className="text-base leading-relaxed text-[var(--muted)]">
        Dihitung jumlah kejadiannya per 200 meter per jam untuk menentukan Kelas Hambatan Samping (Rendah, Sedang, Tinggi, Sangat Tinggi). Parameter standarnya adalah:
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <strong className="text-base font-bold text-blue-500">PED (Pedestrian)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Pejalan kaki yang berjalan di tepi jalan atau menyeberang.</p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <strong className="text-base font-bold text-red-500">PSV (Parking & Stopped Vehicles)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Kendaraan parkir atau berhenti sesaat (seperti angkot ngetem).</p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <strong className="text-base font-bold text-green-500">EEV (Entry & Exit Vehicles)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Kendaraan yang masuk atau keluar dari lahan samping jalan.</p>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
          <strong className="text-base font-bold text-orange-500">SMV (Slow Moving Vehicles)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Kendaraan lambat atau tak bermotor (Golongan UM masuk ke sini).</p>
        </div>
      </div>
    </div>
  ),
  "3": (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Survei Kecepatan (Spot Speed)</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">Evaluasi Pengalaman Pengguna (UX) di Lapangan</p>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl border border-blue-500/30 bg-[var(--surface)] p-5">
          <h4 className="text-lg font-bold">1. Jarak (S) Bersifat Statis / Dikunci</h4>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Di lapangan, surveyor tidak mengukur jarak untuk setiap kendaraan. Aplikasi memindahkan input "Jarak (m)" ke bagian atas sebagai <strong>Global Setting</strong>. Surveyor cukup mengetik jarak (misal 50m) satu kali di awal survei, dan input terkunci otomatis.
          </p>
        </div>
        <div className="rounded-2xl border border-green-500/30 bg-[var(--surface)] p-5">
          <h4 className="text-lg font-bold">2. UX Stopwatch Terintegrasi (Waktu T)</h4>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Mengetik waktu secara manual sangat membuang waktu. Alur UX diubah menjadi ketukan tombol yang responsif:
          </p>
          <ul className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--muted)] font-medium">
            <li>Kunci jarak (Misal: 50 m)</li>
            <li>Pilih kategori kendaraan (Misal: LV)</li>
            <li>Saat kendaraan melewati garis awal &rarr; Tap <strong>MULAI</strong></li>
            <li>Saat kendaraan melewati garis akhir &rarr; Tap <strong>STOP & CATAT</strong></li>
            <li>Aplikasi otomatis mengambil selisih waktu <em>(timestamps)</em> dan menghitung kecepatan.</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  "4": (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Survei Geometrik & Inventarisasi</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">Parameter MKJI 1997 vs Data Laporan Visual (Andalalin)</p>
      </div>
      <p className="text-base leading-relaxed text-[var(--muted)]">
        Form geometrik dipisah menjadi dua bagian visual agar surveyor mudah mengisinya di React Native/Expo:
      </p>
      <div className="space-y-5">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h4 className="font-bold text-[var(--text)]">Bagian 1: Parameter Geometrik Utama (Sesuai MKJI)</h4>
          <p className="mt-1 text-xs text-blue-500">Wajib untuk kebutuhan hitungan kapasitas C = C0 × FCw × FCsp × FCsf × FCcs.</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            <li><strong>Tipe Jalan:</strong> 2/2 UD, 4/2 D, 1-Arah, dll (Dropdown).</li>
            <li><strong>Lebar Jalur Efektif (Wc):</strong> Lebar aspal (Meter / Numeric Input).</li>
            <li><strong>Lebar Bahu / Kereb (Ws):</strong> Jarak ke penghalang (Meter / Numeric Input).</li>
            <li><strong>Tata Guna Lahan:</strong> Komersial (COM), Pemukiman (RES), Akses Terbatas (RA).</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h4 className="font-bold text-[var(--text)]">Bagian 2: Inventarisasi Perlengkapan & Kondisi Jalan</h4>
          <p className="mt-1 text-xs text-orange-500">Kolom tambahan yang disukai konsultan untuk laporan visual kondisi lapangan.</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
            <li><strong>Kondisi Perkerasan:</strong> Baik, Sedang, Rusak Ringan/Berat.</li>
            <li><strong>Trotoar (Pejalan Kaki):</strong> Ada & Berfungsi, Beralih Fungsi, Tidak Ada.</li>
            <li><strong>Sistem Drainase:</strong> Baik/Lancar, Tersumbat, Tidak Ada Drainase.</li>
            <li><strong>Marka Jalan & Rambu:</strong> Jelas, Pudar, Lengkap, Kurang Memadai, Tidak Ada.</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  "5": (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Survei Konflik Lalu Lintas (TCT)</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">Traffic Conflict Technique (Di Persimpangan / U-Turn)</p>
      </div>
      <p className="text-base leading-relaxed text-[var(--muted)]">
        Surveyor menekan tombol jika melihat kendaraan harus <strong>mengerem mendadak atau menghindar</strong> akibat manuver kendaraan lain.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-red-500/20 bg-[var(--surface-alt)] p-4">
          <strong className="text-base font-bold">⚔️ Memotong (Crossing)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Kendaraan dari arah berbeda saling memotong jalur tegak lurus atau serong.</p>
        </div>
        <div className="rounded-2xl border border-blue-500/20 bg-[var(--surface-alt)] p-4">
          <strong className="text-base font-bold">↗️ Bergabung (Merging)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Dua arus kendaraan menyatu ke satu lajur yang sama secara bersamaan.</p>
        </div>
        <div className="rounded-2xl border border-yellow-500/20 bg-[var(--surface-alt)] p-4">
          <strong className="text-base font-bold">↖️ Memencar (Diverging)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Kendaraan di depan melambat drastis untuk belok ke kiri/kanan.</p>
        </div>
        <div className="rounded-2xl border border-orange-500/20 bg-[var(--surface-alt)] p-4">
          <strong className="text-base font-bold">💥 Tabrak Belakang (Rear-end)</strong>
          <p className="mt-1 text-sm text-[var(--muted)]">Pengereman panik untuk menghindari menabrak pantat mobil di depannya.</p>
        </div>
      </div>
    </div>
  ),
  "6": (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Pengaturan Aplikasi</h3>
        <p className="mt-2 text-sm text-[var(--muted)]">Kustomisasi Preferensi & Output Laporan</p>
      </div>
      <p className="text-base leading-relaxed text-[var(--muted)]">
        Modul pengaturan memungkinkan surveyor untuk menyesuaikan antarmuka dan mengekspor data yang direkam di lapangan.
      </p>
      <ul className="mt-4 list-disc space-y-4 pl-5 text-sm text-[var(--muted)]">
        <li><strong>Interval Waktu Data:</strong> Kustomisasi pemecahan rekap data otomatis (misal: dirangkum per 15 menit atau 60 menit).</li>
        <li><strong>Ekspor CSV:</strong> Semua data terstruktur (termasuk timestamp per kendaraan) siap diunduh dan dibagikan.</li>
        <li><strong>Mode Tampilan:</strong> Penyesuaian ukuran tombol dan kontras layar (High-Contrast/Dark Mode) untuk di bawah terik matahari.</li>
        <li><strong>Backup Lokal:</strong> Sistem memastikan riwayat survei tidak hilang walau layar ponsel terkunci atau aplikasi dimatikan.</li>
      </ul>
    </div>
  ),
};

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = prefersDark ? "dark" : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] selection:bg-[var(--text)] selection:text-[var(--bg)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-8">
          <a
            href="#"
            className="flex flex-col leading-tight transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="text-xl font-bold tracking-tight">Traffic Counter</span>
            <span className="text-sm font-medium text-[var(--muted)]">MKJI 1997</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--muted)] md:flex">
            <a href="#fitur" className="transition-colors hover:text-[var(--text)]">Fitur</a>
            <a href="#modul" className="transition-colors hover:text-[var(--text)]">Modul</a>
            <a href="#profil" className="transition-colors hover:text-[var(--text)]">Developer</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-solid)] text-base shadow-sm transition-all hover:scale-105 hover:bg-[var(--surface-alt)]"
              aria-label="Ganti mode tampilan"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <a
              href="https://github.com/zakkutsu/traffic-counter-web/releases/download/v1.0.0/TrafficCounter-v1.0.0.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--accent-contrast)] shadow-md transition-all duration-300 hover:scale-105 hover:bg-[var(--accent-hover)] hover:shadow-[var(--accent)]/30 hover:shadow-lg"
            >
              Unduh APK
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-14 px-6 py-20 md:flex-row md:px-8 md:py-32">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <p className="inline-block rounded-full bg-[var(--surface-alt)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--muted)] shadow-sm">
                Digitalisasi Survei Lalu Lintas
              </p>
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl text-balance">
                Pencatatan volume jalan jadi lebih <span className="text-[var(--muted)]">presisi.</span>
              </h1>
              <p className="mx-auto max-w-xl text-lg leading-relaxed text-[var(--muted)] md:mx-0">
                Traffic Counter adalah aplikasi mobile untuk survei lapangan berstandar MKJI 1997. Dirancang khusus untuk kecepatan input, konsistensi data, dan ekspor laporan yang efisien.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
              <a
                id="download"
                href="https://github.com/zakkutsu/traffic-counter-web/releases/download/v1.0.0/TrafficCounter-v1.0.0.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-8 text-base font-semibold text-[var(--accent-contrast)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--accent-hover)] hover:shadow-xl sm:w-auto"
              >
                Unduh Aplikasi (APK)
              </a>
              <a
                href="#fitur"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-solid)] px-8 text-base font-semibold text-[var(--text)] shadow-sm transition-all duration-300 hover:scale-105 hover:border-[var(--muted)] hover:bg-[var(--surface-alt)] sm:w-auto"
              >
                Pelajari Fitur
              </a>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="mx-auto w-full rounded-[2rem] border border-[var(--border)] bg-[var(--surface-solid)] p-8 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <div className="mb-6 flex items-center justify-between text-sm font-medium text-[var(--muted)]">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
                  Survei berjalan
                </span>
                <span className="rounded-full bg-[var(--surface-alt)] px-3 py-1">Modul volume</span>
              </div>
              <div className="space-y-4">
                <div className="group rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6 transition-all hover:border-[var(--text)]">
                  <div className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">MC (Motor)</div>
                  <div className="mt-2 text-5xl font-bold tracking-tight">142</div>
                </div>
                <div className="group rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6 transition-all hover:border-[var(--text)]">
                  <div className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">LV (Mobil)</div>
                  <div className="mt-2 text-5xl font-bold tracking-tight">58</div>
                </div>
              </div>
              <div className="mt-6 rounded-2xl bg-[var(--surface-alt)] px-5 py-4 text-center text-sm font-medium text-[var(--muted)]">
                Interval pencatatan aktif: <strong className="text-[var(--text)]">15 Menit</strong>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION FITUR */}
        <section id="fitur" className="bg-[var(--surface-alt)]">
          <div className="mx-auto w-full max-w-6xl px-6 py-24 md:px-8">
            <div className="mb-14 max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Fitur unggulan lapangan</h2>
              <p className="text-lg text-[var(--muted)] leading-relaxed">
                Dirancang untuk mengatasi berbagai kendala pada kondisi jalan Indonesia yang padat dan sangat dinamis.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-[var(--border)] bg-[var(--surface-solid)] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--border)]"
                >
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION MODUL DENGAN TABS UI */}
        <section id="modul" className="bg-[var(--bg)]">
          <div className="mx-auto w-full max-w-6xl px-6 py-24 md:px-8">
            <div className="mb-14 max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Panduan & Modul Survei</h2>
              <p className="text-lg text-[var(--muted)] leading-relaxed">
                Setiap tab dirancang spesifik untuk fokus pada jenis data berbeda agar pencatatan tetap rapi. Pilih modul di bawah ini untuk melihat pedoman teknis lapangan.
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Sidebar Tabs Kiri */}
              <div className="flex w-full flex-col gap-3 lg:w-1/3">
                {modules.map((modul) => (
                  <button
                    key={modul.id}
                    onClick={() => setActiveTab(modul.id)}
                    className={`flex items-center gap-4 rounded-3xl border p-4 text-left transition-all duration-300 hover:scale-[1.02] ${activeTab === modul.id
                        ? "border-[var(--text)] bg-[var(--surface-solid)] shadow-lg"
                        : "border-[var(--border)] bg-[var(--surface-solid)] hover:border-[var(--muted)] hover:shadow-md"
                      }`}
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-bold text-lg transition-colors duration-300 ${activeTab === modul.id ? "bg-[var(--text)] text-[var(--bg)]" : "bg-[var(--surface-alt)] text-[var(--muted)]"
                      }`}>
                      {modul.id}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold transition-colors ${activeTab === modul.id ? "text-[var(--text)]" : "text-[var(--text)]"}`}>
                        {modul.title}
                      </h3>
                      <p className="mt-0.5 line-clamp-1 text-sm text-[var(--muted)] opacity-90">
                        {modul.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Content Panel Kanan */}
              <div className="w-full lg:w-2/3">
                <div className="min-h-[500px] rounded-[2rem] border border-[var(--border)] bg-[var(--surface-solid)] p-8 shadow-xl sm:p-10 transition-all duration-300">
                  {moduleContents[activeTab]}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION PROFIL / DONASI */}
        <section id="profil" className="bg-[var(--bg)]">
          <div className="mx-auto w-full max-w-4xl px-6 py-24 text-center md:px-8">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Dukung Pengembangan Aplikasi</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[var(--muted)]">
              Traffic Counter dikembangkan secara independen untuk membantu mahasiswa dan engineer sipil. Dukungan Anda sangat berarti.
            </p>

            <div className="mx-auto mt-10 flex max-w-lg flex-col items-center justify-between gap-6 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-solid)] p-8 shadow-xl sm:flex-row sm:p-10">
              <div className="flex items-center gap-5 text-left">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[var(--border)] bg-[var(--surface-alt)] shadow-inner">

                  <img
                    src="/images/profile.png"
                    alt="Zakkutsu"
                    className="h-full w-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div>
                  <div className="text-xl font-extrabold">
                    <a
                      href="https://github.com/zakkutsu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors"
                    >
                      zakkutsu
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  </div>
                  <div className="text-sm font-medium text-[var(--muted)]">Developer & Maintainer</div>
                </div>
              </div>

              <a
                href="https://trakteer.id/zakkutsu/tip"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-[#E53935] px-8 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105 sm:w-auto"
              >
                <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
                ☕ Traktir Kopi
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] bg-[var(--surface-alt)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm font-medium text-[var(--muted)] md:flex-row md:px-8">
          <div>
            © {new Date().getFullYear()} Traffic Counter MKJI.
          </div>
          <div className="flex items-center gap-6">
            <span>Built with Next.js & Tailwind CSS.</span>
            <span>Hosted on Vercel.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
