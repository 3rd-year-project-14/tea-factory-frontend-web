
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash, X } from "lucide-react";
import {
  getFertilizerCompanies,
  createFertilizerCompany,
  updateFertilizerCompany,
  deleteFertilizerCompany,
} from "../../../api/owner";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/ui/EmptyState";

const inputClass =
  "w-full p-2 rounded-lg border border-tea-100 dark:border-card-border-dark bg-surface dark:bg-white/5 text-ink dark:text-ink-dark placeholder:text-ink/40 dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-tea-500/40";

// Form component
const CompanyForm = ({ company, categories, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactPerson: "",
    contactNumber: "",
    email: "",
    categories: [],
    newCategory: "",
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        address: company.address || "",
        contactPerson: company.contactPerson || "",
        contactNumber: company.contactNumber || "",
        email: company.email || "",
        categories: [...(company.categories || [])],
        newCategory: "",
      });
    } else {
      setFormData({
        name: "",
        address: "",
        contactPerson: "",
        contactNumber: "",
        email: "",
        categories: [],
        newCategory: "",
      });
    }
  }, [company]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategorySelect = (e) => {
    const selectedCategory = e.target.value;
    if (
      selectedCategory &&
      !formData.categories.includes(selectedCategory) &&
      selectedCategory !== "select"
    ) {
      setFormData({
        ...formData,
        categories: [...formData.categories, selectedCategory],
      });
    }
  };

  const handleAddNewCategory = () => {
    if (
      formData.newCategory.trim() !== "" &&
      !formData.categories.includes(formData.newCategory) &&
      !categories.includes(formData.newCategory)
    ) {
      setFormData({
        ...formData,
        categories: [...formData.categories, formData.newCategory],
        newCategory: "",
      });
    }
  };

  const handleRemoveCategory = (category) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((c) => c !== category),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { newCategory: _, ...cleanData } = formData;
    onSave(cleanData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card dark:bg-card-dark rounded-2xl shadow-card max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-heading font-bold text-ink dark:text-ink-dark">
              {company ? "Edit Fertilizer Company" : "Add New Fertilizer Company"}
            </h2>
            <button onClick={onClose} className="text-ink/50 dark:text-muted-dark hover:text-ink dark:hover:text-ink-dark transition-colors">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1" htmlFor="name">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1" htmlFor="address">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              {/* Contact Person */}
              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1" htmlFor="contactPerson">
                  Contact Person *
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1" htmlFor="contactNumber">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1" htmlFor="email">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-ink/70 dark:text-ink-dark/70 mb-1">
                  Fertilizer Categories *
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.categories.map((category, idx) => (
                    <div key={idx} className="bg-tea-100 dark:bg-tea-900/30 px-3 py-1 rounded-full flex items-center">
                      <span className="text-sm text-tea-800 dark:text-tea-200">{category}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category)}
                        className="ml-2 text-tea-600 dark:text-tea-300 hover:text-tea-800 dark:hover:text-tea-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  {formData.categories.length === 0 && (
                    <p className="text-sm text-ink/50 dark:text-muted-dark italic">No categories selected</p>
                  )}
                </div>
                <div className="flex gap-2 mb-3">
                  <select
                    className={inputClass}
                    onChange={handleCategorySelect}
                    value="select"
                  >
                    <option value="select" disabled>
                      Select existing category
                    </option>
                    {categories
                      .filter((cat) => !formData.categories.includes(cat))
                      .map((category, idx) => (
                        <option key={idx} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="newCategory"
                    value={formData.newCategory}
                    onChange={handleInputChange}
                    placeholder="Add new category"
                    className={`flex-grow ${inputClass}`}
                  />
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleAddNewCategory}
                    disabled={!formData.newCategory.trim()}
                  >
                    <Plus size={20} />
                  </Button>
                </div>
                {formData.categories.length === 0 && (
                  <p className="text-sm text-red-500 dark:text-red-400 mt-1">
                    Please add at least one fertilizer category
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={formData.categories.length === 0}
              >
                {company ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const FertilizerCompany = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);
  const [categories, setCategories] = useState([]);
  const [totalFertilizers, setTotalFertilizers] = useState(0);

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getFertilizerCompanies();
      setCompanies(data);
      const allCategories = Array.from(
        new Set(data.flatMap((company) => company.categories))
      );
      setCategories(allCategories);
      setTotalFertilizers(allCategories.length);
    };
    fetchCompanies();
  }, []);

  const handleOpenModal = (company = null) => {
    setEditingCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCompany(null);
  };

  const handleSaveCompany = async (companyData) => {
    if (editingCompany) {
      const updated = await updateFertilizerCompany(editingCompany.id, companyData);
      setCompanies((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c))
      );
      const newCategories = Array.from(
        new Set([...categories, ...companyData.categories])
      );
      setCategories(newCategories);
      setTotalFertilizers(newCategories.length);
      handleCloseModal();
    } else {
      const created = await createFertilizerCompany(companyData);
      setCompanies((prev) => [...prev, created]);
      const newCategories = Array.from(
        new Set([...categories, ...companyData.categories])
      );
      setCategories(newCategories);
      setTotalFertilizers(newCategories.length);
      handleCloseModal();
    }
  };

  const handleDeleteCompany = async (id) => {
    await deleteFertilizerCompany(id);
    const remainingCompanies = companies.filter((company) => company.id !== id);
    setCompanies(remainingCompanies);
    const remainingCategories = Array.from(
      new Set(remainingCompanies.flatMap((company) => company.categories))
    );
    setCategories(remainingCategories);
    setTotalFertilizers(remainingCategories.length);
  };

  return (
    <div className="min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300">
          Fertilizer Companies
        </h1>
        <Button variant="primary" icon={Plus} onClick={() => handleOpenModal()}>
          Add Company
        </Button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card hoverable>
          <h2 className="text-sm font-medium text-ink/60 dark:text-muted-dark mb-2">
            Total Companies
          </h2>
          <p className="text-3xl font-heading font-bold text-tea-700 dark:text-tea-300">
            {companies.length}
          </p>
        </Card>
        <Card hoverable>
          <h2 className="text-sm font-medium text-ink/60 dark:text-muted-dark mb-2">
            Total Fertilizer Types
          </h2>
          <p className="text-3xl font-heading font-bold text-tea-700 dark:text-tea-300">
            {totalFertilizers}
          </p>
        </Card>
      </div>
      {/* Companies Table */}
      <Card className="!p-0 overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-tea-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Contact Person
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Contact Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Categories
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tea-100 dark:divide-card-border-dark">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-tea-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-ink dark:text-ink-dark">
                    {company.name}
                  </div>
                  <div className="text-sm text-ink/50 dark:text-muted-dark">{company.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/70 dark:text-ink-dark/70">
                  {company.contactPerson}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/70 dark:text-ink-dark/70">
                  {company.contactNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-ink/70 dark:text-ink-dark/70">
                  {company.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {company.categories.map((category, index) => (
                      <Badge key={index} variant="success">{category}</Badge>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      className="text-tea-700 dark:text-tea-300 hover:text-tea-800 dark:hover:text-tea-200"
                      onClick={() => handleOpenModal(company)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      onClick={() => handleDeleteCompany(company.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr>
                <td colSpan="6">
                  <EmptyState title="No companies found" description="Add a company to get started." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
      {/* Company Form Modal */}
      {isModalOpen && (
        <CompanyForm
          company={editingCompany}
          categories={categories}
          onSave={handleSaveCompany}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default FertilizerCompany;
