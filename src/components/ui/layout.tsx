import { Link, Outlet } from "react-router-dom";
import { Button } from "./button";
import { useAuthStore } from "../../store/AuthStore";
import { LogOut } from "lucide-react";

const Layout = () => {
  const { user, logout } = useAuthStore();
  return (
    <div className="min-h-screen flex flex-col bg-amber-100">
      {/* Header */}
      <header className="bg-amber-500 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            My Blog App
          </Link>
          <nav>
            {/* You can add nav links here */}
            <Link to="/" className="mr-4 hover:underline">
              Home
            </Link>
            {user && (
              <Link to="/my-blogs" className="hover:underline">
                My Blogs
              </Link>
            )}
            {!user ? (
              <>
                {" "}
                <Link to="/login" className="hover:underline">
                  Login
                </Link>{" "}
                <Link to="/signup" className="hover:underline">
                  Signup
                </Link>
              </>
            ) : (
              // <Button onClick={logout}>Logout</Button>

              <Button 
  onClick={logout}
  variant="ghost" 
  className="w-full justify-start gap-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-2xl py-6 px-4 transition-colors font-semibold"
>
  <div className="p-2 bg-slate-100 group-hover:bg-red-100 rounded-lg transition-colors">
    <LogOut size={18} /> {/* Using Lucide-React */}
  </div>
  Logout
</Button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-10 container mx-auto">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-amber-500 text-white p-4 text-center"></footer>
    </div>
  );
};

export default Layout;

