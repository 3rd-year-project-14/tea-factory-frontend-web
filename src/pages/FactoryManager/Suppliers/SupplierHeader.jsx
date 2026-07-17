import Card from "../../../components/ui/Card";

export default function SupplierHeader() {
  return (
    <Card className="mb-6">
      <h1 className="text-2xl font-heading font-bold text-tea-700 dark:text-tea-300 mb-1">
        Supplier Management
      </h1>
      <p className="text-ink/60 dark:text-muted-dark text-sm">
        Manage supplier registrations and approvals
      </p>
    </Card>
  );
}
