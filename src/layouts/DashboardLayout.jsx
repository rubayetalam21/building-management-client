import { Outlet, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useUserRole from '../hooks/useUserRole';

// React Icons
import {
  FaHome,
  FaUser,
  FaUserTie,
  FaUsersCog,
  FaBullhorn,
  FaFileContract,
  FaTags,
} from 'react-icons/fa';

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const { role, isLoading: roleLoading } = useUserRole();

  const linkStyle = ({ isActive }) =>
    isActive
      ? 'bg-teal-600 text-white px-4 py-2 rounded flex items-center space-x-2'
      : 'px-4 py-2 hover:bg-gray-100 rounded flex items-center space-x-2';

  if (loading || roleLoading) {
    return <div className="text-center py-10">Loading dashboard...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 shadow-lg p-4 space-y-4">
        <div className="text-xl font-bold text-teal-600 mb-4">Dashboard</div>
        <nav className="flex flex-col space-y-2">
          {/* Home Link */}
          <NavLink to="/" className={linkStyle}>
            <FaHome /> <span>Home</span>
          </NavLink>

          {/* Common for all */}


          {/* Admin-only links */}
          {role === 'admin' && (
            <>
              <NavLink to="userProfile" className={linkStyle}>
                <FaUser /> <span>My Profile</span>
              </NavLink>
              <NavLink to="manageMembers" className={linkStyle}>
                <FaUsersCog /> <span>Manage Members</span>
              </NavLink>
              <NavLink to="announcements" className={linkStyle}>
                <FaBullhorn /> <span>Make Announcement</span>
              </NavLink>
              <NavLink to="agreementRequests" className={linkStyle}>
                <FaFileContract /> <span>Agreement Requests</span>
              </NavLink>
              <NavLink to="coupons" className={linkStyle}>
                <FaTags /> <span>Manage Coupons</span>
              </NavLink>
            </>
          )}

          {/* Member-only links */}
          {role === 'member' && (
            <>
              <NavLink to="memberProfile" className={linkStyle}>
                <FaUserTie /> <span>Member Profile</span>
              </NavLink>
              <NavLink to="announcements" className={linkStyle}>
                <FaBullhorn /> <span>View Announcements</span>
              </NavLink>
                <NavLink to="makePayment" className={linkStyle}>
                <FaBullhorn /> <span>Make Payment</span>
              </NavLink>
            </>
          )}

          {/* User-only links */}
          {role === 'user' && (
            <>
              <NavLink to="userProfile" className={linkStyle}>
                <FaUser /> <span>User Profile</span>
              </NavLink>
              <NavLink to="announcements" className={linkStyle}>
                <FaBullhorn /> <span>View Announcements</span>
              </NavLink>
            </>
          )}
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
