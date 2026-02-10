import CardList from "../components/Posts/CardList";
import ViewUserButton from "../components/Posts/ViewUserButton";

const base_url = "https://jsonplaceholder.typicode.com/posts";

interface Ipost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Tetap pakai arrow function
const Page = async () => {
  const response = await fetch(base_url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Gagal mengambil data posts");
  }

  const posts: Ipost[] = await response.json();

  return (
    <>
      <h2 className="bg-amber-400 text-white font-bold">POSTINGAN PAGE</h2>

      {/* Looping data posts */}
      {posts.map((post) => {
        return (
          <CardList key={post.id}>
            {/* Contoh tampilkan data asli dari API */}
            <p>{post.title}</p>
            <i>{post.body}</i>
            <ViewUserButton />
          </CardList>
        );
      })}
    </>
  );
};

export default Page;
