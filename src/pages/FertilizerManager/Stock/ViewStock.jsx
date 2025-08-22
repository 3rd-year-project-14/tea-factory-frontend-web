import React, { useState, useEffect } from "react";
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
import axios from "axios";

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
  // const dummyFertilizers = useMemo(
  //   () => ({
      
  //   }),
  //   []
  // );
   useEffect(() => {
    const fetchFertilizerDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/stocks/${id}`);
        setFertilizer(res.data);
      } catch (error) {
        console.error("Error fetching fertilizer details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFertilizerDetails();
    }
  }, [id]);


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
                      Warehouse Name
                    </TableCell>
                    <TableCell>{fertilizer.warehouseName || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Weight per Unit
                    </TableCell>
                    <TableCell>
                      {fertilizer.weight ? `${fertilizer.weight} kg` : "N/A"}
                    </TableCell>
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
                        ? new Date(fertilizer.manufactureDate).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Expiry Date</TableCell>
                    <TableCell>
                      {fertilizer.expiryDate
                        ? new Date(fertilizer.expiryDate).toLocaleDateString()
                        : "N/A"}
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
