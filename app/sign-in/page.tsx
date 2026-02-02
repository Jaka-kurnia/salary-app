import Image from "next/image";

export default function Home() {
  return (
    // Background utama: Menggunakan Slate-900 agar lebih deep dan modern
    <div className="flex items-center justify-center min-h-screen bg-slate-900 px-4">
      
      {/* Card Form: Efek border halus dan backdrop blur sering digunakan di UI modern */}
      <main className="flex flex-col items-center gap-8 w-full max-w-md p-10 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-slate-700 rounded-full shadow-inner">
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={40}
              height={40}
              className="invert" // Membuat logo hitam menjadi putih agar terlihat di dark mode
              priority
            />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-4">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm">Please enter your details</p>
        </div>

        {/* Form Section */}
        <form className="flex flex-col gap-5 w-full">
          
          {/* Input Group: Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full p-3 bg-slate-900 border border-slate-600 rounded-xl text-white 
                         placeholder:text-slate-500 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Input Group: Password */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition">Forgot?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-slate-900 border border-slate-600 rounded-xl text-white 
                         placeholder:text-slate-500 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Button: Menggunakan warna biru agar menjadi Call to Action (CTA) yang jelas */}
          <button
            type="submit"
            className="w-full mt-2 p-3 bg-blue-600 text-white font-semibold rounded-xl 
                       hover:bg-blue-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20"
          >
            Sign In
          </button>
        </form>

        {/* Footer Card */}
        <p className="text-slate-400 text-sm">
          Don't have an account?{" "}
          <a href="#" className="text-blue-400 font-medium hover:underline">Sign up</a>
        </p>

      </main>
    </div>
  );
}