import { Outlet, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const linkStyle = ({ isActive }) =>
    isActive ? 'bg-teal-600 text-white px-4 py-2 rounded' : 'px-4 py-2 hover:bg-gray-100 rounded';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-lg p-4 space-y-4">
        <div className="text-xl font-bold text-teal-600 mb-4">Admin Dashboard</div>
        <nav className="flex flex-col space-y-2">
          <NavLink to="profile" className={linkStyle}>Admin Profile</NavLink>
          <NavLink to="manageMembers" className={linkStyle}>Manage Members</NavLink>
          <NavLink to="announcement" className={linkStyle}>Make Announcement</NavLink>
          <NavLink to="agreementRequests" className={linkStyle}>Agreement Requests</NavLink>
          <NavLink to="coupons" className={linkStyle}>Manage Coupons</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
