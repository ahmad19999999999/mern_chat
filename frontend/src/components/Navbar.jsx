import { Link, useNavigate } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  // Mutation لتسجيل الخروج
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // استدعاء API إذا عندك endpoint لتسجيل الخروج
       await axios.post("http://localhost:5001/api/v1/logout", {}, {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
       });

      // مسح التوكن محليًا
      localStorage.removeItem("token");
    },
    onSuccess: () => {
      navigate("/"); // إعادة التوجيه بعد تسجيل الخروج
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Logout failed");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to={"/settings"} className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            <Link to={"/profile"} className="btn btn-sm gap-2">
              <User className="size-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex gap-2 items-center btn btn-sm"
              disabled={logoutMutation.isLoading}
            >
              <LogOut className="size-5" />
              <span className="hidden sm:inline">
                {logoutMutation.isLoading ? "Logging out..." : "Logout"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
