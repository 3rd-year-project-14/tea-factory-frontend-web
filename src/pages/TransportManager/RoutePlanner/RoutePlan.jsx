import { useState } from "react";
import { CalendarDays, Map, UserCircle, Truck } from "lucide-react";

const routes = [
  { value: "A", label: "Route A - Galle Neluwa" },
  { value: "B", label: "Route B - Matara Neluwa" },
];

const drivers = [
  { value: "Mr.Perera", label: "Mr. Perera" },
  { value: "Mr.Kamal", label: "Mr. Kamal" },
];

const vehicles = [
  { value: "TRK-001", label: "TRK-001", capacity: "500kg" },
  { value: "TRK-002", label: "TRK-002", capacity: "750kg" },
  { value: "TRK-003", label: "TRK-003", capacity: "1000kg" },
];

export default function AssignRouteForm() {
  const [form, setForm] = useState({
    route: "",
    driver: "",
    vehicle: "",
    vehicleCapacity: "",
    date: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    // If vehicle changes, update capacity automatically
    if (name === "vehicle") {
      const selectedVehicle = vehicles.find((v) => v.value === value);
      setForm({
        ...form,
        vehicle: value,
        vehicleCapacity: selectedVehicle ? selectedVehicle.capacity : "",
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Route assigned!\n" + JSON.stringify(form, null, 2));
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
        <Map className="text-green-700" size={28} />
        Assign Route & Vehicle
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Route */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="route"
          >
            Select Route
          </label>
          <div className="relative">
            <Map className="absolute left-3 top-3 text-green-500" size={18} />
            <select
              id="route"
              name="route"
              value={form.route}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              required
            >
              <option value="">Choose a route</option>
              {routes.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Driver */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="driver"
          >
            Driver
          </label>
          <div className="relative">
            <UserCircle
              className="absolute left-3 top-3 text-blue-500"
              size={18}
            />
            <select
              id="driver"
              name="driver"
              value={form.driver}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              required
            >
              <option value="">Choose driver</option>
              {drivers.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vehicle */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="vehicle"
          >
            Vehicle
          </label>
          <div className="relative">
            <Truck
              className="absolute left-3 top-3 text-orange-500"
              size={18}
            />
            <select
              id="vehicle"
              name="vehicle"
              value={form.vehicle}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              required
            >
              <option value="">Choose vehicle</option>
              {vehicles.map((v) => (
                <option key={v.value} value={v.value}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vehicle Capacity (readonly) */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="vehicleCapacity"
          >
            Vehicle Capacity
          </label>
          <input
            type="text"
            id="vehicleCapacity"
            name="vehicleCapacity"
            value={form.vehicleCapacity}
            readOnly
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
            placeholder="Select a vehicle to see capacity"
          />
        </div>

        {/* Date of Issue */}
        <div>
          <label
            className="block mb-1 font-semibold text-gray-700"
            htmlFor="date"
          >
            Date of Issue
          </label>
          <div className="relative">
            <CalendarDays
              className="absolute left-3 top-3 text-gray-500"
              size={18}
            />
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg text-green-700 font-bold text-lg shadow hover:bg-green-800 transition"
        >
          Assign Route
        </button>
      </form>
    </div>
  );
}
