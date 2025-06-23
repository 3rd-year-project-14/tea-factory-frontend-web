import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("SUPPLIER"); // dropdown default
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setUser({ username, role });

    // Redirect to role-based dashboard
    navigate(`/${role.toLowerCase()}/dashboard`);
  };

  return (
    <form onSubmit={handleLogin} className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">Login</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option value="SUPPLIER">Supplier</option>
        <option value="DRIVER">Driver</option>
      </select>

      <button type="submit" className="bg-green-700 text-white px-4 py-2 w-full">
        Login
      </button>
    </form>
  );
}
