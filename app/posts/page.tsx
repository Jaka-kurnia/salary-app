import CardList from "../components/Posts/CardList";
// Mengimpor komponen CardList untuk membungkus tampilan setiap post

import ViewUserButton from "../components/Posts/ViewUserButton";
// Mengimpor tombol untuk melihat detail user dari post

const base_url = "https://jsonplaceholder.typicode.com/posts";
// URL API yang digunakan untuk mengambil data posts (dummy API JSONPlaceholder)

// Interface TypeScript untuk menentukan bentuk data post
interface Ipost {
  userId: number; // ID user pemilik post
  id: number;     // ID unik post
  title: string;  // Judul post
  body: string;   // Isi/konten post
}

// Komponen halaman menggunakan arrow function async (Server Component di Next.js App Router)
const Page = async () => {

  const response = await fetch(base_url, {
    cache: "no-store",
    // cache "no-store" → data selalu diambil ulang dari server (tidak disimpan cache)
    // Cocok untuk data yang harus selalu terbaru
  });

  if (!response.ok) {
    // Jika request gagal (status bukan 2xx)
    throw new Error("Gagal mengambil data posts");
    // Lempar error agar Next.js menampilkan halaman error
  }

  const posts: Ipost[] = await response.json();
  // Mengubah response JSON menjadi array posts sesuai tipe Ipost

  return (
    <>
      <h2 className="bg-amber-400 text-white font-bold h-12 flex items-center justify-center">
        POSTINGAN PAGE
      </h2>
      {/* Judul halaman dengan styling Tailwind */}

      {/* Looping semua data posts */}
      {posts.map((post) => {
        return (
          <CardList key={post.id}>
            {/* key wajib pada list React agar rendering efisien */}

            {/* Menampilkan judul post */}
            <p>{post.title}</p>

            {/* Menampilkan isi post dengan huruf miring */}
            <i>{post.body}</i>

            {/* Tombol untuk melihat user dari post */}
            <ViewUserButton />
          </CardList>
        );
      })}
    </>
  );
};

export default Page;
// Mengekspor komponen Page agar bisa digunakan sebagai halaman di Next.js
