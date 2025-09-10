import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <section className="w-full bg-gradient-to-br py-12 2xl:py-16 flex flex-col 2xl:gap-16 gap-12 px-4 sm:px-6 lg:px-8">
      <div className="container mt-10 lg:mt-16 2xl:mt-20">
        {" "}
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr] bg-[#0f0f0f]">
          <aside className="bg-black/40 border-r border-white/10 p-4 space-y-4">
            <h2 className="text-lg font-semibold text-white">
              Admin Dashboard
            </h2>
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                Users
              </NavLink>
              <NavLink
                to="/admin/events"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                Events
              </NavLink>
              <NavLink
                to="/admin/inverse"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                Inverse
              </NavLink>
              <NavLink
                to="/admin/reviews"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                Customer Reviews
              </NavLink>
              <NavLink
                to="/admin/teams"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                Teams
              </NavLink>
              <NavLink
                to="/admin/newsletter"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                Newsletter
              </NavLink>
              <NavLink
                to="/admin/contact"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/admin/faq"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:bg-white/5"
                  }`
                }
              >
                FAQ's
              </NavLink>
            </nav>
          </aside>

          <main className="p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
}
