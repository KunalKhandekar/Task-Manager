import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-6 h-14">
      <span className="text-base sm:text-lg font-bold text-indigo-600 shrink-0">Task Manager</span>
      {user && (
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="text-xs sm:text-sm text-slate-500 truncate max-w-30 sm:max-w-none">
            Hello, {user.name}
          </span>
          <button
            className="shrink-0 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-50 cursor-pointer transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
