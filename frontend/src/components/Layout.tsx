import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SignOut, SignIn, NotePencil } from "phosphor-react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/logo.png" className="h-9" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              BookReview
            </span>
          </Link>

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn ? (
              <>
                <span className="text-gray-500 font-semibold text-xl mr-2">
                  {user?.login.toUpperCase()}
                </span>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                  onClick={() => logout()}
                  title="Sair"
                >
                  <SignOut size={20} weight="bold" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
                  title="Login"
                >
                  <SignIn size={20} weight="bold" />
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
                  title="Cadastre-se"
                >
                  <NotePencil size={20} weight="bold" />
                </Link>
              </div>
            )}
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Home
                </Link>
              </li>
              {isAdmin() && (
                <>
                  <li>
                    <Link
                      to="/livros"
                      className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:p-0"
                    >
                      Livros
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/usuarios"
                      className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:p-0"
                    >
                      Usuários
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <main className="p-4 min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
}
