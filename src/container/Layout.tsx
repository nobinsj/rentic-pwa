import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-white dark:bg-gray-950">
      {/* Fixed Header */}
      <Header />

      {/* Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-4 py-4 outline-none">
        <div className="mx-auto max-w-[600px]">
          <Outlet />
        </div>
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
