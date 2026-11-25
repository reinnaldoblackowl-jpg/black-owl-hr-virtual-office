# Black Owl HR Virtual Office V1.0
Pilot menggunakan data dummy saja. Source code boleh public, tetapi jangan commit data HR atau secret. Website pilot belum memiliki Google Login, whitelist, database bersama, automasi atau integrasi HRIS. Riwayat tersimpan pada browser masing-masing. Mode demo tidak menjalankan AI. Mode AI membutuhkan secret PILOT_TOKEN dan binding Workers AI; kode bersama hanya untuk pilot, bukan kontrol akses produksi.

## GitHub
Extract ZIP. Upload isi folder ini ke root repository, termasuk folder public dan src. Commit changes. Jangan upload ZIP sebagai satu-satunya file.

## Cloudflare
Workers & Pages > Create > Import a repository / Connect to GitHub. Pilih repository dan branch main. Root directory /, deploy command `npx wrangler deploy`. Jika build command diminta gunakan `npm install`. Deploy sebagai Worker baru (jangan mengganti People Data Center). Alternatif lokal: npm install, npx wrangler login, npm run deploy. Periksa URL workers.dev yang diberikan. Buka website dan coba mode demo.

## AI pilot (opsional)
Worker Settings > Variables and Secrets > Add secret PILOT_TOKEN dengan nilai acak panjang yang hanya dibagikan ke tester. Jangan masukkan secret dalam GitHub. Pastikan binding AI tersedia (wrangler.toml sudah mendeklarasikan). Model yang dipakai @cf/meta/llama-3.1-8b-instruct; cek ketersediaannya di akun Cloudflare jika request gagal. Masukkan kode di UI dan klik Jalankan AI dengan instruksi dummy. Pemakaian AI tunduk pada kuota dan biaya akun. Jangan membuka AI kepada publik tanpa pembatasan akses dan rate limiting yang memadai.

## Sebelum production
Pasang autentikasi Google/Cloudflare Access dan validasi identitas di backend, role-based access, database D1 dengan isolasi data, audit log, rate limit, retensi data dan review keamanan. Jangan gunakan data asli sebelum langkah ini selesai.
