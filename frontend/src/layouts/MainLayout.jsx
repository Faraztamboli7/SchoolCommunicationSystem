import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">

      <Sidebar />

      <div className="flex-1 min-w-0">

        <Navbar />

        <main>
          {children}
        </main>

      </div>

    </div>
  );
}