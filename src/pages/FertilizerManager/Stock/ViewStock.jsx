import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
// Commented out Firebase imports for now
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../../firebase";
import { ArrowLeft } from "lucide-react";

const ViewStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fertilizer, setFertilizer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dummy fertilizer data
  const dummyFertilizers = useMemo(
    () => ({
      f1: {
        id: "f1",
        categoryName: "Nitrogen Fertilizer",
        companyName: "GreenGrow Inc.",
        quantity: 120,
        warehouseNumber: "WH-001",
        warehouseName: "Main Storage",
        unit: "kg",
        description: "High nitrogen content fertilizer for leafy growth",
        manufactureDate: { seconds: 1682035200 }, // April 21, 2023
        expiryDate: { seconds: 1713571200 }, // April 20, 2024
        npkRatio: "30-10-10",
        recommendedCrops: ["Tea", "Vegetables", "Rice"],
        applicationMethod: "Spread evenly around plants",
        lastUpdated: { seconds: 1691596800 }, // August 9, 2023
      },
      f2: {
        id: "f2",
        categoryName: "Phosphate Fertilizer",
        companyName: "AgriBoost Ltd.",
        quantity: 15,
        warehouseNumber: "WH-002",
        warehouseName: "Secondary Storage",
        unit: "kg",
        description: "Promotes root development and flowering",
        manufactureDate: { seconds: 1688169600 }, // July 1, 2023
        expiryDate: { seconds: 1719792000 }, // July 1, 2024
        npkRatio: "10-30-10",
        recommendedCrops: ["Tea", "Fruits", "Flowers"],
        applicationMethod: "Mix with soil before planting",
        lastUpdated: { seconds: 1691596800 }, // August 9, 2023
      },
      f3: {
        id: "f3",
        categoryName: "Potassium Fertilizer",
        companyName: "HarvestMax",
        quantity: 85,
        warehouseNumber: "WH-001",
        warehouseName: "Main Storage",
        unit: "kg",
        description: "Enhances overall plant health and disease resistance",
        manufactureDate: { seconds: 1693526400 }, // September 1, 2023
        expiryDate: { seconds: 1725148800 }, // September 1, 2024
        npkRatio: "10-10-30",
        recommendedCrops: ["Tea", "Fruits", "Root vegetables"],
        applicationMethod: "Apply during growing season",
        lastUpdated: { seconds: 1691596800 }, // August 9, 2023
      },
      f4: {
        id: "f4",
        categoryName: "Complete NPK",
        companyName: "GreenGrow Inc.",
        quantity: 200,
        warehouseNumber: "WH-003",
        warehouseName: "Bulk Storage",
        unit: "kg",
        description: "Balanced nutrients for all-round plant growth",
        manufactureDate: { seconds: 1696204800 }, // October 2, 2023
        expiryDate: { seconds: 1727827200 }, // October 2, 2024
        npkRatio: "20-20-20",
        recommendedCrops: ["Tea", "All crops"],
        applicationMethod: "Apply as needed throughout growing season",
        lastUpdated: { seconds: 1691596800 }, // August 9, 2023
      },
      f5: {
        id: "f5",
        categoryName: "Organic Compost",
        companyName: "NatureFarm Organics",
        quantity: 350,
        warehouseNumber: "WH-004",
        warehouseName: "Organic Storage",
        unit: "kg",
        description: "Natural organic matter for soil improvement",
        manufactureDate: { seconds: 1698883200 }, // November 2, 2023
        expiryDate: { seconds: 1761955200 }, // November 2, 2025
        npkRatio: "5-5-5",
        recommendedCrops: ["Tea", "All crops"],
        applicationMethod: "Mix with soil or use as top dressing",
        lastUpdated: { seconds: 1691596800 }, // August 9, 2023
      },
    }),
    []
  );

  useEffect(() => {
    // Use dummy data instead of fetching from Firestore
    const fetchFertilizerDetails = () => {
      try {
        // Get the fertilizer from our dummy data using the ID
        if (dummyFertilizers[id]) {
          setFertilizer(dummyFertilizers[id]);
        } else {
          console.error("Fertilizer not found");
        }
      } catch (error) {
        console.error("Error fetching fertilizer details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFertilizerDetails();
    }
  }, [id, dummyFertilizers]);

  const handleRequestUpdate = () => {
    navigate("/fertilizerManager/stock/request", {
      state: {
        categoryName: fertilizer.categoryName,
        companyName: fertilizer.companyName,
        currentQuantity: fertilizer.quantity,
      },
    });
  };

  const handleBack = () => {
    navigate("/fertilizerManager/stock");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!fertilizer) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardBody>
            <p>Fertilizer not found</p>
            <Button color="primary" onClick={handleBack} className="mt-4">
              Back to Stock List
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Button
        color="default"
        variant="light"
        startContent={<ArrowLeft size={16} />}
        onClick={handleBack}
        className="mb-4"
      >
        Back to Stock List
      </Button>

      <Card className="mb-6">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">{fertilizer.categoryName}</h1>
            <p className="text-small text-default-500">
              {fertilizer.companyName}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Fertilizer Details</h2>
              <Table aria-label="Fertilizer details" hideHeader>
                <TableHeader>
                  <TableColumn>Property</TableColumn>
                  <TableColumn>Value</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Category Name</TableCell>
                    <TableCell>{fertilizer.categoryName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Company Name</TableCell>
                    <TableCell>{fertilizer.companyName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Warehouse Number
                    </TableCell>
                    <TableCell>{fertilizer.warehouseNumber || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Warehouse Name
                    </TableCell>
                    <TableCell>{fertilizer.warehouseName || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Quantity</TableCell>
                    <TableCell>
                      {fertilizer.quantity} {fertilizer.unit || "units"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Last Updated</TableCell>
                    <TableCell>
                      {fertilizer.lastUpdated
                        ? new Date(
                            fertilizer.lastUpdated.seconds * 1000
                          ).toLocaleString()
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Description</TableCell>
                    <TableCell>
                      {fertilizer.description || "No description available"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">
                Additional Information
              </h2>
              <Table aria-label="Additional fertilizer information" hideHeader>
                <TableHeader>
                  <TableColumn>Property</TableColumn>
                  <TableColumn>Value</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Manufacturer Date
                    </TableCell>
                    <TableCell>
                      {fertilizer.manufactureDate
                        ? new Date(
                            fertilizer.manufactureDate.seconds * 1000
                          ).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Expiry Date</TableCell>
                    <TableCell>
                      {fertilizer.expiryDate
                        ? new Date(
                            fertilizer.expiryDate.seconds * 1000
                          ).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">NPK Ratio</TableCell>
                    <TableCell>{fertilizer.npkRatio || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Recommended Crops
                    </TableCell>
                    <TableCell>
                      {fertilizer.recommendedCrops
                        ? fertilizer.recommendedCrops.join(", ")
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Application Method
                    </TableCell>
                    <TableCell>
                      {fertilizer.applicationMethod || "N/A"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              color="primary"
              onClick={handleRequestUpdate}
              className="mr-2"
            >
              Update Request
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ViewStock;
