import { useLocation } from "react-router-dom";

const AdminPanel = () => {
  const location = useLocation();
  const { user } = location.state || {}; // Destructure user data from location state

  if (!user) {
    return <p className="pt-32">No user data available.</p>;
  }

  return (
    <div className="flex h-screen pt-32 bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#" className="hover:text-indigo-200">
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-indigo-200">
                Manage Users
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-indigo-200">
                Settings
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-indigo-200">
                Reports
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-200">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to Admin Panel
          </h1>
          <div className="flex items-center space-x-4">
            <span className="font-medium text-gray-600">
              Hello, {user.name}
            </span>
            <img
              src="https://via.placeholder.com/40"
              alt="Avatar"
              className="w-10 h-10 rounded-full border-2 border-white shadow-md"
            />
          </div>
        </div>

        {/* Admin Info Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Admin Information
          </h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              Name: <span className="font-semibold">{user.name}</span>
            </p>
            <p className="text-gray-600">
              Email: <span className="font-semibold">{user.email}</span>
            </p>
            {/* Additional admin info can be added here */}
          </div>
        </div>

        {/* Placeholder for additional content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Manage Content
          </h2>
          <p className="text-gray-600">
            You can manage users, content, and settings from here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
