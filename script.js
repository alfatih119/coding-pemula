document.addEventListener('DOMContentLoaded', () => {
    const formAktivitas = document.getElementById('form-aktivitas');
    const inputAktivitas = document.getElementById('input-aktivitas');
    const daftarAktivitas = document.getElementById('daftar-aktivitas');

    // Memuat aktivitas dari local storage saat halaman pertama kali dimuat
    let aktivitasTersimpan = JSON.parse(localStorage.getItem('aktivitas')) || [];

    // Fungsi untuk menampilkan aktivitas di halaman
    const renderAktivitas = () => {
        daftarAktivitas.innerHTML = ''; // Mengosongkan daftar sebelum diisi ulang
        aktivitasTersimpan.forEach((aktivitas, index) => {
            const li = document.createElement('li');
            li.textContent = aktivitas;

            // Tambahkan tombol hapus
            const tombolHapus = document.createElement('button');
            tombolHapus.textContent = 'Hapus';
            tombolHapus.className = 'tombol-hapus';
            tombolHapus.onclick = () => {
                hapusAktivitas(index);
            };

            li.appendChild(tombolHapus);
            daftarAktivitas.appendChild(li);
        });
    };

    // Fungsi untuk menambahkan aktivitas baru
    const tambahAktivitas = (event) => {
        event.preventDefault();
        const aktivitasBaru = inputAktivitas.value.trim();
        if (aktivitasBaru !== '') {
            aktivitasTersimpan.push(aktivitasBaru);
            localStorage.setItem('aktivitas', JSON.stringify(aktivitasTersimpan));
            inputAktivitas.value = ''; // Mengosongkan input
            renderAktivitas(); // Memperbarui tampilan
        }
    };

    // Fungsi untuk menghapus aktivitas
    const hapusAktivitas = (index) => {
        aktivitasTersimpan.splice(index, 1);
        localStorage.setItem('aktivitas', JSON.stringify(aktivitasTersimpan));
        renderAktivitas(); // Memperbarui tampilan
    };

    // Menambahkan event listener pada form
    formAktivitas.addEventListener('submit', tambahAktivitas);

    // Panggil fungsi render untuk menampilkan aktivitas yang sudah ada
    renderAktivitas();
});