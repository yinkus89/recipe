import React, { useEffect, useState } from "react";
import { fetchUsers } from "../utils/api"; // Assuming fetchUsers is a function that makes the API call
import "../styles/tailwind.css";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch users from the API
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const UserData = await fetchUsers();
        setUsers(users);
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Error fetching users.";
        setError(errorMsg);
        console.error("Error fetching users:", err); // For debugging purposes
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <div className="flex justify-center items-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500" role="alert">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Users</h2>

      {users.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No users available
        </div>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <p className="text-xl font-semibold text-gray-900">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
