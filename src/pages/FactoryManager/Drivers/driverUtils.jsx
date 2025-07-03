// Utility functions for driver management

export const getDriverSummary = (drivers) => {
  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter((d) => d.status === "active").length;
  const availableToday = drivers.filter(
    (d) => d.availabilityToday && d.status === "active"
  ).length;
  const expiredLicenses = drivers.filter(
    (d) => d.licenseStatus === "expired"
  ).length;
  const assignedDrivers = drivers.filter(
    (d) => d.assignedRoutes.length > 0
  ).length;
  const onLeaveDrivers = drivers.filter((d) => d.status === "on_leave").length;

  return {
    totalDrivers,
    activeDrivers,
    availableToday,
    expiredLicenses,
    assignedDrivers,
    onLeaveDrivers,
  };
};

export const filterDrivers = (drivers, filters) => {
  return drivers.filter((driver) => {
    const matchesSearch =
      !filters.search ||
      driver.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      driver.assignedVehicle
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      driver.contact.includes(filters.search);

    const matchesStatus =
      filters.status === "All" || driver.status === filters.status;

    return matchesSearch && matchesStatus;
  });
};

export const sortDrivers = (drivers, sortBy, sortOrder) => {
  return [...drivers].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Handle special cases
    if (sortBy === "assignedRoutes") {
      aValue = a.assignedRoutes.length;
      bValue = b.assignedRoutes.length;
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const generateDriverId = (drivers) => {
  const existingIds = drivers.map((d) => d.id);
  let counter = 1;
  let newId;

  do {
    newId = `DRV-${String(counter).padStart(3, "0")}`;
    counter++;
  } while (existingIds.includes(newId));

  return newId;
};

export const validateDriver = (driver) => {
  const errors = {};

  if (!driver.name?.trim()) {
    errors.name = "Driver name is required";
  }

  if (!driver.nic?.trim()) {
    errors.nic = "NIC number is required";
  } else if (!/^\d{9}[vVxX]$|^\d{12}$/.test(driver.nic)) {
    errors.nic = "Invalid NIC format";
  }

  if (!driver.contact?.trim()) {
    errors.contact = "Contact number is required";
  } else if (!/^\+94\s\d{2}\s\d{3}\s\d{4}$/.test(driver.contact)) {
    errors.contact = "Invalid contact format (+94 XX XXX XXXX)";
  }

  if (!driver.assignedVehicle?.trim()) {
    errors.assignedVehicle = "Vehicle assignment is required";
  }

  if (!driver.type) {
    errors.type = "Driver type is required";
  }

  if (!driver.licenseExpiry) {
    errors.licenseExpiry = "License expiry date is required";
  }

  if (!driver.bagQuota || driver.bagQuota < 1) {
    errors.bagQuota = "Valid bag quota is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const isLicenseExpiringSoon = (expiryDate, daysThreshold = 30) => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const timeDiff = expiry - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff <= daysThreshold && daysDiff > 0;
};

export const formatDriverForExport = (drivers) => {
  return drivers.map((driver) => ({
    "Driver ID": driver.id,
    Name: driver.name,
    Type: driver.type,
    Vehicle: driver.assignedVehicle,
    Contact: driver.contact,
    NIC: driver.nic,
    "License Status": driver.licenseStatus,
    "License Expiry": driver.licenseExpiry,
    Status: driver.status,
    "Routes Assigned": driver.assignedRoutes.join(", ") || "None",
    "Bag Quota": driver.bagQuota,
    "Available Today": driver.availabilityToday ? "Yes" : "No",
  }));
};
