import { useState, useEffect } from 'react';
import { usersAPI } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Users() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [search]);

  async function fetchUsers() {
    try {
      const data = await usersAPI.getUsers({ search, page: 1, limit: 50 });
      setUsers(data.users);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage system users and their permissions
          </p>
        </div>
        {user?.role === 'admin' && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        )}
      </div>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
        />
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Unit</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {u.first_name} {u.last_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{u.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                          {u.role}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{u.unit_name || '-'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${u.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {u.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
