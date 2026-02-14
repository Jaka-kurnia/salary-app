// Membuat komponen React bernama CardList
// ({ children } : any) artinya komponen menerima props "children"
// children adalah isi komponen yang dibungkus oleh <CardList> ... </CardList>
// Tipe data dibuat "any" (bebas), walaupun sebaiknya nanti pakai tipe ReactNode
const CardList = ({ children }: any) => {
  return (
    // Elemen div sebagai pembungkus utama
    <div className="w-full p-4 bg-indigo-600">

      {/* Menampilkan isi yang dikirim dari luar komponen */}
      <div className="text-white"> {children}</div>
     

    </div>
  );
};

// Mengekspor komponen agar bisa digunakan di file lain
export default CardList;
