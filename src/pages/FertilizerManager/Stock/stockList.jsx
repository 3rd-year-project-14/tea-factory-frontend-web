import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Card,
  CardBody,
  Chip,
  Pagination,
} from "@nextui-org/react";
import { Search } from "lucide-react";
// Commented out Firebase imports for now
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../../firebase";

const StockList = () => {
  // Dummy data for fertilizer stock
  const dummyFertilizers = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  const [fertilizers, _setFertilizers] = useState(dummyFertilizers);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    // If we had real data fetching, it would go here
    // For now, we're using the dummy data directly
    console.log("Using dummy fertilizer data");
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const filteredFertilizers = fertilizers.filter(
    (fertilizer) =>
      fertilizer.categoryName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      fertilizer.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pages = Math.ceil(filteredFertilizers.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredFertilizers.slice(start, end);
  }, [page, filteredFertilizers]);

  const handleViewDetails = (fertilizerId) => {
    navigate(`/fertilizerManager/stock/view/${fertilizerId}`);
  };

  const getStockStatus = (quantity) => {
    // Define what constitutes "low" stock
    const lowThreshold = 20; // Example threshold
    return quantity < lowThreshold ? "low" : "normal";
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Fertilizer Stock Management</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            className="pl-10"
            placeholder="Search by category or company..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <Card>
        <CardBody>
          <Table
            aria-label="Fertilizer stock table"
            bottomContent={
              pages > 0 ? (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn>CATEGORY</TableColumn>
              <TableColumn>COMPANY</TableColumn>
              <TableColumn>STOCK STATUS</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(fertilizer) => (
                <TableRow key={fertilizer.id}>
                  <TableCell>{fertilizer.categoryName}</TableCell>
                  <TableCell>{fertilizer.companyName}</TableCell>
                  <TableCell>
                    <Chip
                      color={
                        getStockStatus(fertilizer.quantity) === "low"
                          ? "danger"
                          : "success"
                      }
                      variant="flat"
                    >
                      {getStockStatus(fertilizer.quantity) === "low"
                        ? "Low Stock"
                        : "In Stock"}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => handleViewDetails(fertilizer.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default StockList;
