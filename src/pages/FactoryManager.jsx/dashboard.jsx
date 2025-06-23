export default function FactoryManagerDashboard() {
  return (
    <div className="main-content flex-1 bg-[#f8f9fa] overflow-y-auto text-black">
      <div className="header bg-white p-6 border-b border-[#e0e0e0] shadow-sm">
        <h1 className="text-2xl font-bold text-[#2c2c2c] mb-1">
          Dashboard Home
        </h1>
        <p className="text-[#666] text-sm">
          Display a snapshot of today's factory activity
        </p>
        <div className="filter-section float-right -mt-11 flex items-center gap-4">
          <div className="period-filter flex bg-white border border-[#ddd] rounded-lg overflow-hidden shadow-sm">
            <button className="period-btn px-4 py-2 bg-white text-[#666] font-medium text-sm border-r border-[#eee] transition-all duration-300 active:bg-[#4CAF50] active:text-white">
              Daily
            </button>
            <button className="period-btn px-4 py-2 bg-white text-[#666] font-medium text-sm border-r border-[#eee] transition-all duration-300">
              Weekly
            </button>
            <button className="period-btn px-4 py-2 bg-white text-[#666] font-medium text-sm border-r border-[#eee] transition-all duration-300">
              Monthly
            </button>
            <button className="period-btn px-4 py-2 bg-white text-[#666] font-medium text-sm transition-all duration-300">
              Yearly
            </button>
          </div>
          <div className="date-filter flex items-center">
            <span className="filter-label text-sm text-[#666] font-medium mr-2">
              Date:
            </span>
            <input
              type="date"
              id="dateFilter"
              defaultValue="2025-06-11"
              className="p-2 border border-[#ddd] rounded-md text-sm min-w-[140px]"
            />
          </div>
        </div>
      </div>
      <div className="dashboard-content p-8">
        {/* Summary Cards */}
        <div className="summary-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="summary-card bg-white p-6 rounded-xl shadow-md border-l-4 border-[#4CAF50] transition-transform hover:-translate-y-0.5 hover:shadow-lg">
            <span className="card-icon text-3xl mb-4 block">📦</span>
            <div className="card-value text-3xl font-bold text-[#2c2c2c] mb-2">
              2,847
            </div>
            <div className="card-label text-sm text-[#666] font-medium">
              Total Tea Collected Today (kg)
            </div>
            <div className="card-change text-xs mt-2 px-2 py-1 rounded bg-[#e8f5e8] text-[#4CAF50] inline-block">
              ↗ +12.5% from yesterday
            </div>
          </div>
          <div className="summary-card bg-white p-6 rounded-xl shadow-md border-l-4 border-[#4CAF50] transition-transform hover:-translate-y-0.5 hover:shadow-lg">
            <span className="card-icon text-3xl mb-4 block">👥</span>
            <div className="card-value text-3xl font-bold text-[#2c2c2c] mb-2">
              28
            </div>
            <div className="card-label text-sm text-[#666] font-medium">
              Active Suppliers Today
            </div>
            <div className="card-change text-xs mt-2 px-2 py-1 rounded bg-[#e8f5e8] text-[#4CAF50] inline-block">
              ↗ +3 from yesterday
            </div>
          </div>
          <div className="summary-card bg-white p-6 rounded-xl shadow-md border-l-4 border-[#4CAF50] transition-transform hover:-translate-y-0.5 hover:shadow-lg">
            <span className="card-icon text-3xl mb-4 block">🚛</span>
            <div className="card-value text-3xl font-bold text-[#2c2c2c] mb-2">
              12
            </div>
            <div className="card-label text-sm text-[#666] font-medium">
              Drivers on Duty
            </div>
            <div className="card-change text-xs mt-2 px-2 py-1 rounded bg-[#e8f5e8] text-[#4CAF50] inline-block">
              → Same as yesterday
            </div>
          </div>
          <div className="summary-card bg-white p-6 rounded-xl shadow-md border-l-4 border-[#4CAF50] transition-transform hover:-translate-y-0.5 hover:shadow-lg">
            <span className="card-icon text-3xl mb-4 block">💰</span>
            <div className="card-value text-3xl font-bold text-[#2c2c2c] mb-2">
              Rs. 425,680
            </div>
            <div className="card-label text-sm text-[#666] font-medium">
              Today's Total Payable Amount
            </div>
            <div className="card-change text-xs mt-2 px-2 py-1 rounded bg-[#e8f5e8] text-[#4CAF50] inline-block">
              ↗ +8.3% from yesterday
            </div>
          </div>
        </div>
        {/* Charts Section */}
        <div className="charts-section grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="chart-card bg-white p-6 rounded-xl shadow-md col-span-2">
            <h3 className="chart-title text-lg font-semibold text-[#2c2c2c] mb-5">
              Monthly Supply Chart
            </h3>
            <div className="chart-placeholder h-52 bg-gradient-to-br from-[#f0f8f0] to-[#e8f5e8] rounded flex items-center justify-center text-[#4CAF50] font-medium border-2 border-dashed border-[#4CAF50]">
              📈 Monthly Tea Supply Trend Chart
              <br />
              <small>(Chart implementation would go here)</small>
            </div>
          </div>
          <div className="chart-card bg-white p-6 rounded-xl shadow-md">
            <h3 className="chart-title text-lg font-semibold text-[#2c2c2c] mb-5">
              Top 5 Suppliers (by weight)
            </h3>
            <div className="supplier-item flex justify-between items-center py-3 border-b border-[#f0f0f0]">
              <span className="supplier-name font-medium text-[#333]">
                Supplier - A
              </span>
              <span className="supplier-weight font-semibold text-[#4CAF50]">
                485 kg
              </span>
            </div>
            <div className="supplier-item flex justify-between items-center py-3 border-b border-[#f0f0f0]">
              <span className="supplier-name font-medium text-[#333]">
                Supplier - B
              </span>
              <span className="supplier-weight font-semibold text-[#4CAF50]">
                412 kg
              </span>
            </div>
            <div className="supplier-item flex justify-between items-center py-3 border-b border-[#f0f0f0]">
              <span className="supplier-name font-medium text-[#333]">
                Supplier - C
              </span>
              <span className="supplier-weight font-semibold text-[#4CAF50]">
                387 kg
              </span>
            </div>
            <div className="supplier-item flex justify-between items-center py-3 border-b border-[#f0f0f0]">
              <span className="supplier-name font-medium text-[#333]">
                Supplier - D
              </span>
              <span className="supplier-weight font-semibold text-[#4CAF50]">
                342 kg
              </span>
            </div>
            <div className="supplier-item flex justify-between items-center py-3">
              <span className="supplier-name font-medium text-[#333]">
                Supplier - E
              </span>
              <span className="supplier-weight font-semibold text-[#4CAF50]">
                298 kg
              </span>
            </div>
          </div>
        </div>
        {/* Quick Links Section */}
        <div className="section-title text-xl font-semibold text-[#2c2c2c] mb-5">
          Quick Links
        </div>
        <div className="quick-links grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            className="quick-link-card bg-white p-5 rounded-xl shadow-md cursor-pointer transition-all border-l-4 border-[#4CAF50] hover:-translate-y-0.5 hover:shadow-lg hover:border-l-[#388E3C]"
            onClick={() => navigateTo("supplier-approvals")}
          >
            <div className="quick-link-title text-base font-semibold text-[#2c2c2c] mb-2">
              👤 Supplier Approvals
            </div>
            <div className="quick-link-desc text-sm text-[#666]">
              Review and approve new supplier registrations
            </div>
          </div>
          <div
            className="quick-link-card bg-white p-5 rounded-xl shadow-md cursor-pointer transition-all border-l-4 border-[#4CAF50] hover:-translate-y-0.5 hover:shadow-lg hover:border-l-[#388E3C]"
            onClick={() => navigateTo("payment-panel")}
          >
            <div className="quick-link-title text-base font-semibold text-[#2c2c2c] mb-2">
              💳 Payment Panel
            </div>
            <div className="quick-link-desc text-sm text-[#666]">
              Process payments and manage supplier dues
            </div>
          </div>
          <div
            className="quick-link-card bg-white p-5 rounded-xl shadow-md cursor-pointer transition-all border-l-4 border-[#4CAF50] hover:-translate-y-0.5 hover:shadow-lg hover:border-l-[#388E3C]"
            onClick={() => navigateTo("fertilizer-requests")}
          >
            <div className="quick-link-title text-base font-semibold text-[#2c2c2c] mb-2">
              🌱 Fertilizer Requests
            </div>
            <div className="quick-link-desc text-sm text-[#666]">
              Manage fertilizer distribution requests
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function navigateTo(page) {
  // Here you would typically navigate to the specified page
  alert(`Navigating to ${page.replace("-", " ").toUpperCase()} page`);
}
