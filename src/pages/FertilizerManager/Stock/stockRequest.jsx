import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
// Commented out Firebase imports for now
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { db } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

const StockRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize form with pre-filled data if available
  const initialFormData = location.state || {
    categoryName: "",
    companyName: "",
    currentQuantity: 0,
    requestedQuantity: "",
    urgency: "normal",
    notes: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create request object
      const requestData = {
        categoryName: formData.categoryName,
        companyName: formData.companyName,
        currentQuantity: formData.currentQuantity,
        requestedQuantity: Number(formData.requestedQuantity),
        urgency: formData.urgency,
        notes: formData.notes,
        status: "pending",
        requestedBy: {
          uid: currentUser?.uid || "dummy-user-id",
          email: currentUser?.email || "dummy@example.com",
          displayName: currentUser?.displayName || "Fertilizer Manager",
        },
        createdAt: new Date().toISOString(),
      };

      // In a real app, we would save to Firestore:
      // await addDoc(collection(db, "fertilizerRequests"), requestData);

      // For demo, just log the data
      console.log("Request submitted:", requestData);

      // Show success message
      setFormSubmitted(true);

      // Reset form after 3 seconds and navigate back
      setTimeout(() => {
        navigate("/fertilizerManager/stock");
      }, 3000);
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/fertilizerManager/stock");
  };

  if (formSubmitted) {
    return (
      <div className="container mx-auto py-10">
        <Card className="shadow-md border-none">
          <CardBody className="text-center py-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Request Submitted Successfully!
            </h2>
            <p className="mb-6 text-gray-600 max-w-md mx-auto">
              Your fertilizer stock request has been submitted and is pending
              approval. You will be notified when your request is processed.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="primary"
                onClick={handleBack}
                size="lg"
                className="px-8"
              >
                Return to Stock List
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center">
        <Button
          color="default"
          variant="light"
          startContent={<ArrowLeft size={16} />}
          onClick={handleBack}
          className="font-medium"
        >
          Back to Stock List
        </Button>
        <h2 className="text-xl font-bold ml-auto">New Stock Request</h2>
      </div>

      <Card className="shadow-none border-none">
        <CardHeader className="flex gap-3 bg-primary-100 rounded-t-lg">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold">Fertilizer Stock Request</h1>
            <p className="text-small text-default-500">
              Request additional fertilizer stock
            </p>
          </div>
        </CardHeader>
        <Divider className="opacity-0" />
        <CardBody className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Stock Information */}
            <div className="bg-white rounded-md p-4">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 items-center pb-2">
                  <div className="font-medium text-gray-700">Category Name</div>
                  <div className="text-gray-900">
                    {formData.categoryName || "Nitrogen Fertilizer"}
                  </div>
                </div>

                <div className="grid grid-cols-2 items-center pb-2">
                  <div className="font-medium text-gray-700">Company Name</div>
                  <div className="text-gray-900">
                    {formData.companyName || "GreenGrow Inc."}
                  </div>
                </div>

                <div className="grid grid-cols-2 items-center pb-2">
                  <div className="font-medium text-gray-700">
                    Warehouse Number
                  </div>
                  <div className="text-gray-900">WH-001</div>
                </div>

                <div className="grid grid-cols-2 items-center pb-2">
                  <div className="font-medium text-gray-700">
                    Warehouse Name
                  </div>
                  <div className="text-gray-900">Main Storage</div>
                </div>

                <div className="grid grid-cols-2 items-center pb-2">
                  <div className="font-medium text-gray-700">
                    Current Stock Quantity
                  </div>
                  <div className="text-gray-900">
                    {formData.currentQuantity} units
                  </div>
                </div>

                <div className="grid grid-cols-2 items-center">
                  <div className="font-medium text-gray-700">
                    Requested Quantity
                  </div>
                  <Input
                    aria-label="Requested Quantity"
                    name="requestedQuantity"
                    type="number"
                    placeholder="Enter amount"
                    value={formData.requestedQuantity}
                    onChange={handleInputChange}
                    isRequired
                    variant="flat"
                    endContent={
                      <div className="text-sm text-gray-500">units</div>
                    }
                    size="sm"
                  />
                </div>
              </div>
            </div>

            {/* Request Details */}
            <div className="space-y-2">
              <h3 className="text-md font-medium text-gray-700">
                Request Details
              </h3>
              <div className="rounded-lg p-4 bg-gray-50">
                <Select
                  label="Urgency Level"
                  name="urgency"
                  selectedKeys={[formData.urgency]}
                  onChange={(e) =>
                    setFormData({ ...formData, urgency: e.target.value })
                  }
                  className="mb-4 w-full"
                  variant="flat"
                  labelPlacement="outside"
                >
                  <SelectItem key="low" value="low" className="text-success">
                    Low - Not Urgent
                  </SelectItem>
                  <SelectItem
                    key="normal"
                    value="normal"
                    className="text-primary"
                  >
                    Normal - Standard Resupply
                  </SelectItem>
                  <SelectItem key="high" value="high" className="text-warning">
                    High - Limited Stock
                  </SelectItem>
                  <SelectItem
                    key="critical"
                    value="critical"
                    className="text-danger"
                  >
                    Critical - Immediate Attention Required
                  </SelectItem>
                </Select>

                <Textarea
                  label="Additional Notes"
                  name="notes"
                  placeholder="Provide any additional information about this request, including specific usage details, delivery preferences, or other requirements."
                  value={formData.notes}
                  onChange={handleInputChange}
                  minRows={4}
                  variant="flat"
                  labelPlacement="outside"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                color="default"
                variant="flat"
                onClick={handleBack}
                size="lg"
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={isSubmitting}
                size="lg"
                startContent={isSubmitting ? null : <span>📝</span>}
              >
                Submit Request
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default StockRequest;
