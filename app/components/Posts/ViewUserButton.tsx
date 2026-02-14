"use client"; 
// Directive khusus di Next.js (App Router)
// Menandakan bahwa komponen ini dijalankan di sisi client (browser),
// sehingga boleh menggunakan event handler, state, dan interaksi DOM.

// Membuat komponen React bernama ViewUserButton
const ViewUserButton = () => {

  // Fungsi yang akan dijalankan saat tombol diklik
  // alert() akan menampilkan popup pesan di browser
  const testClick = () => alert("Aku di klik");

  return (
    <>
      {/* Tombol HTML dengan event onClick */}
      {/* Saat tombol ditekan, fungsi testClick akan dipanggil */}
      <button onClick={testClick}>Cek User</button>
    </>
  );
};

// Mengekspor komponen agar bisa digunakan di file lain
export default ViewUserButton;
