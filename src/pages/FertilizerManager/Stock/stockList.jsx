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
//backend - 01
import axios from "axios";

const StockList = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFertilizer, setNewFertilizer] = useState({
    companyName: "",
    categoryName: "",
    manufactureDate: "",
    expiryDate: "",
    weight: "",
    quantity: "",
    warehouseName: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();
  const [allCompanies, setAllCompanies] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  //backend - 02
  useEffect(() => {
    // Fetch stock data
    axios
      .get("http://localhost:8080/api/stocks")
      .then((res) => setFertilizers(res.data))
      .catch((err) => console.error(err));

    // Fetch companies
    axios
      .get("http://localhost:8080/api/fertilizer-companies")
      .then((res) => setAllCompanies(res.data))
      .catch((err) => console.error(err));

    // Fetch categories
    axios
      .get("http://localhost:8080/api/fertilizer-categories")
      .then((res) => {
        // Ensure the response is always an array
        if (Array.isArray(res.data)) {
          setAllCategories(res.data);
        } else if (res.data) {
          setAllCategories([res.data]);
        } else {
          setAllCategories([]);
        }
      })
      .catch((err) => {
        setAllCategories([]);
        console.error(err);
      });
  }, []);

  const handleAddNewClick = () => {
    setShowAddForm(true);
  };

  //backend - 03
  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Find selected company and category objects
      const selectedCompany = allCompanies.find(
        (c) => c.name === newFertilizer.companyName
      );
      const selectedCategory = allCategories.find(
        (c) => c.name === newFertilizer.categoryName
      );

      // Build payload for backend
      const payload = {
        companyId: selectedCompany ? selectedCompany.id : null,
        categoryId: selectedCategory ? selectedCategory.id : null,
        weight: newFertilizer.weight ? parseFloat(newFertilizer.weight) : 0,
        quantity: newFertilizer.quantity ? parseInt(newFertilizer.quantity) : 0,
        warehouseName: newFertilizer.warehouseName,
        manufactureDate: newFertilizer.manufactureDate, // "YYYY-MM-DD"
        expiryDate: newFertilizer.expiryDate, // "YYYY-MM-DD"
      };

      const response = await axios.post(
        "http://localhost:8080/api/stocks",
        payload
      );
      setFertilizers([response.data, ...fertilizers]);
      setShowAddForm(false);
      setNewFertilizer({
        companyName: "",
        categoryName: "",
        manufactureDate: "",
        expiryDate: "",
        weight: "",
        quantity: "",
        warehouseName: "",
      });
    } catch (err) {
      console.error(err);
    }
  };
  //

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setNewFertilizer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
    setNewFertilizer({
      companyName: "",
      categoryName: "",
      manufactureDate: "",
      expiryDate: "",
      weight: "",
      quantity: "",
      warehouseName: "",
    });
  };

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
        <Button color="primary" onPress={handleAddNewClick} className="ml-4">
          Add New Fertilizer
        </Button>
      </div>

      {showAddForm && (
        <Card className="mb-6">
          <CardBody>
            <form
              onSubmit={handleAddFormSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* Fertilizer Name field removed as requested */}
              <div>
                <label className="block font-medium mb-1">Company Name</label>
                <select
                  name="companyName"
                  value={newFertilizer.companyName}
                  onChange={handleAddFormChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Select company</option>
                  {(() => {
                    // If category selected, filter companies by that category
                    if (newFertilizer.categoryName) {
                      return allCompanies
                        .filter(
                          (c) =>
                            c.categories &&
                            c.categories.includes(newFertilizer.categoryName)
                        )
                        .map((company) => (
                          <option key={company.name} value={company.name}>
                            {company.name}
                          </option>
                        ));
                    }
                    // Otherwise show all
                    return allCompanies.map((company) => (
                      <option key={company.name} value={company.name}>
                        {company.name}
                      </option>
                    ));
                  })()}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Category</label>
                <select
                  name="categoryName"
                  value={newFertilizer.categoryName}
                  onChange={handleAddFormChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="">Select category</option>
                  {(() => {
                    // If company selected, filter categories by that company
                    if (newFertilizer.companyName) {
                      const company = allCompanies.find(
                        (c) => c.name === newFertilizer.companyName
                      );
                      if (company && company.categories) {
                        return company.categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ));
                      }
                    }
                    // Otherwise show all
                    return allCategories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ));
                  })()}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Weight Per Unit (kg)
                </label>
                <Input
                  name="weight"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter weight"
                  value={newFertilizer.weight}
                  onChange={handleAddFormChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Quantity</label>
                <Input
                  name="quantity"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="Enter quantity"
                  value={newFertilizer.quantity}
                  onChange={handleAddFormChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Warehouse Name</label>
                <Input
                  name="warehouseName"
                  placeholder="Enter warehouse name"
                  value={newFertilizer.warehouseName}
                  onChange={handleAddFormChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Manufactured Date
                </label>
                <Input
                  name="manufactureDate"
                  type="date"
                  value={newFertilizer.manufactureDate}
                  onChange={handleAddFormChange}
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Expired Date</label>
                <Input
                  name="expiryDate"
                  type="date"
                  value={newFertilizer.expiryDate}
                  onChange={handleAddFormChange}
                  required
                />
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button color="primary" type="submit" onPress={() => {}}>
                  Add Fertilizer
                </Button>
                <Button color="default" type="button" onPress={handleCancelAdd}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

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
                      onPress={() => handleViewDetails(fertilizer.id)}
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
