# 📋 Panduan Admin — Wedding Invitation App

## Login

1. Buka: **https://wedding-invitation-app-nine.vercel.app/admin**
2. Masukkan password: `admin123`
3. Klik **Masuk**

---

## Fitur Admin

### 📊 Dashboard Statistik
Setelah login, Anda langsung melihat 3 angka penting:
- **Total RSVP** — Jumlah orang yang sudah konfirmasi
- **Hadir** — Jumlah yang konfirmasi hadir
- **Total Tamu** — Total orang yang akan datang (termasuk +1, +2, dll)

---

### 👥 Tab: RSVP
Daftar semua konfirmasi kehadiran dari tamu. Berisi:
- Nama tamu
- Status (**Hadir** / **Tidak**)
- Jumlah tamu yang dibawa
- Tanggal konfirmasi

---

### 🎫 Tab: Tamu (Kelola Undangan)

#### Tambah Tamu Baru
1. Klik tombol **+ Tambah Tamu**
2. Isi **Nama Lengkap** → slug otomatis dibuat
3. Cek preview **URL undangan** yang muncul
4. Klik **Simpan Tamu**
5. Klik icon 📋 di kolom URL untuk **copy link undangan**
6. **Kirim link tersebut ke tamu** via WhatsApp / SMS

#### Hapus Tamu
Arahkan mouse ke baris tamu → klik icon 🗑️ merah di sebelah kanan.

---

### 💬 Tab: Ucapan
Semua doa dan ucapan dari tamu yang mengisi guestbook. Ditampilkan dari yang terbaru.

---

## Cara Kerja Link Undangan

Setiap tamu punya link unik:
```
https://wedding-invitation-app-nine.vercel.app/?to=nama-tamu
```

- Jika link **terdaftar** → Undangan terbuka dengan nama personal
- Jika link **tidak terdaftar** → Muncul halaman "Undangan Tidak Ditemukan"
- Jika tanpa parameter → Muncul sebagai "Tamu Undangan"

---

> ⚠️ **Penting**: Jangan bagikan link `/admin` ke tamu. Halaman ini hanya untuk admin!
