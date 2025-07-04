import RoutesView from "./RoutesView";
import SuppliersView from "./SuppliersView";
import SupplierDetailView from "./SupplierDetailView";

export default function MainContent({
  currentView,
  filteredData,
  summary,
  getCurrentData,
  onViewRoute,
  onViewSupplierDetail,
  selectedSupplier,
  selectedRoute,
}) {
  if (currentView === "routes") {
    return (
      <RoutesView
        filteredData={filteredData}
        summary={summary}
        getCurrentData={getCurrentData}
        onViewRoute={onViewRoute}
      />
    );
  } else if (currentView === "suppliers") {
    return (
      <SuppliersView
        filteredData={filteredData}
        summary={summary}
        getCurrentData={getCurrentData}
        onViewSupplierDetail={onViewSupplierDetail}
        selectedRoute={selectedRoute}
      />
    );
  } else if (currentView === "detail") {
    return <SupplierDetailView supplier={selectedSupplier} />;
  }

  return null;
}
