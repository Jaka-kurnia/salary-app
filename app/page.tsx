import { redirect } from "next/navigation";

export default function Home() {
  redirect("/sign-in");

  redirect("/sign-up");

  redirect("/posts")
}

// export default function Tes(){
//   redirect
// }