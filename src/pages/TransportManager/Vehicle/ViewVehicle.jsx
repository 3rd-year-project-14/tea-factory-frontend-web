import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../../components/ui/Card";

export default function ViewVehicle({ vehicles }) {
  const { vehicleNumber } = useParams();
  const navigate = useNavigate();

  const vehicle = vehicles.find((v) => v.vehicleNumber === vehicleNumber);

  if (!vehicle)
    return <div className="p-8 text-center text-ink/60 dark:text-muted-dark">Vehicle not found.</div>;

  return (
    <Card className="max-w-2xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-tea-700 dark:text-tea-300 mb-4 hover:underline"
      >
        &larr; Back
      </button>

      {/* Vehicle Info Section */}
      <div className="flex items-center gap-6">
        {vehicle.vehicleImage ? (
          <img
            src={
              typeof vehicle.vehicleImage === "string"
                ? vehicle.vehicleImage
                : URL.createObjectURL(vehicle.vehicleImage)
            }
            alt="Vehicle"
            className="w-32 h-32 object-cover rounded-lg border border-tea-100 dark:border-card-border-dark"
          />
        ) : (
          <div className="w-32 h-32 bg-tea-50 dark:bg-white/10 flex items-center justify-center rounded-lg border border-tea-100 dark:border-card-border-dark text-ink/40 dark:text-muted-dark">
            No Image
          </div>
        )}

        <div>
          <h2 className="text-2xl font-heading font-bold mb-2 text-ink dark:text-ink-dark">
            {vehicle.vehicleType}{" "}
            <span className="text-ink/50 dark:text-muted-dark">({vehicle.vehicleNumber})</span>
          </h2>
          <div className="mt-2 text-ink/80 dark:text-ink-dark/80">
            <span className="font-semibold text-ink dark:text-ink-dark">Capacity:</span> {vehicle.capacity}
          </div>
          <div className="text-ink/80 dark:text-ink-dark/80">
            <span className="font-semibold text-ink dark:text-ink-dark">Status:</span> {vehicle.status}
          </div>
          <div className="text-ink/80 dark:text-ink-dark/80">
            <span className="font-semibold text-ink dark:text-ink-dark">Last Service:</span>{" "}
            {vehicle.lastServiceDate}
          </div>
        </div>
      </div>

      {/* Driver Info Section */}
      <div>
        <h3 className="font-semibold mb-2 text-tea-700 dark:text-tea-300">Assigned Driver</h3>
        {vehicle.assignedDriver ? (
          <div className="flex items-center gap-4">
            {vehicle.driverImage ? (
              <img
                src={vehicle.driverImage}
                alt={vehicle.assignedDriver}
                className="w-16 h-16 rounded-full border border-tea-100 dark:border-card-border-dark object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-tea-50 dark:bg-white/10 rounded-full flex items-center justify-center text-tea-700 dark:text-tea-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.12 17.804z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            )}
            <span className="text-lg text-ink dark:text-ink-dark">{vehicle.assignedDriver}</span>
          </div>
        ) : (
          <div className="text-ink/50 dark:text-muted-dark">No driver assigned</div>
        )}
      </div>
    </Card>
  );
}
