document.addEventListener('DOMContentLoaded', () => {
    const formTentang = document.getElementById('form-tentang');
    const inputJudul = document.getElementById('input-judul');
    const inputParagraf1 = document.getElementById('input-paragraf1');
    const inputParagraf2 = document.getElementById('input-paragraf2');
    const tombolHapus = document.getElementById('tombol-hapus-konten');
    
    const judulTampil = document.getElementById('judul-tampil');
    const paragraf1Tampil = document.getElementById('paragraf1-tampil');
    const paragraf2Tampil = document.getElementById('paragraf2-tampil');

    // Dapatkan ID unik untuk pengguna saat ini (menggunakan Session Storage)
    let userId = sessionStorage.getItem('userId');
    if (!userId) {
        userId = 'user-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
        sessionStorage.setItem('userId', userId);
    }
    
    // Kunci local storage yang unik untuk setiap pengguna
    const localStorageKey = 'kontenTentang-' + userId;

    // Memuat konten dari local storage saat halaman dimuat
    const muatKonten = () => {
        const kontenTersimpan = JSON.parse(localStorage.getItem(localStorageKey));
        if (kontenTersimpan) {
            inputJudul.value = kontenTersimpan.judul || '';
            inputParagraf1.value = kontenTersimpan.paragraf1 || '';
            inputParagraf2.value = kontenTersimpan.paragraf2 || '';
            
            tampilkanKonten(kontenTersimpan);
        } else {
            // Konten default jika belum ada
            const kontenDefault = {
                judul: "Selamat Datang!",
                paragraf1: "Silakan gunakan formulir di atas untuk menulis konten halaman ini. Setiap pengguna akan memiliki halaman tentang yang berbeda!",
                paragraf2: ""
            };
            tampilkanKonten(kontenDefault);
        }
    };

    // Fungsi untuk menampilkan konten di halaman
    const tampilkanKonten = (konten) => {
        judulTampil.textContent = konten.judul;
        paragraf1Tampil.textContent = konten.paragraf1;
        paragraf2Tampil.textContent = konten.paragraf2;
    };

    // Fungsi untuk menyimpan konten saat formulir disubmit
    const simpanKonten = (event) => {
        event.preventDefault(); // Mencegah halaman reload
        
        const kontenBaru = {
            judul: inputJudul.value,
            paragraf1: inputParagraf1.value,
            paragraf2: inputParagraf2.value
        };

        localStorage.setItem(localStorageKey, JSON.stringify(kontenBaru));
        tampilkanKonten(kontenBaru);
        alert('Konten berhasil disimpan!');
    };

    // Fungsi untuk menghapus konten
    const hapusKonten = () => {
        if (confirm("Apakah Anda yakin ingin menghapus konten ini?")) {
            localStorage.removeItem(localStorageKey);
            muatKonten(); // Muat ulang konten (akan kembali ke default)
            alert('Konten berhasil dihapus.');
        }
    };

    // Menambahkan event listener
    formTentang.addEventListener('submit', simpanKonten);
    tombolHapus.addEventListener('click', hapusKonten);

    // Panggil fungsi untuk memuat konten
    muatKonten();
});