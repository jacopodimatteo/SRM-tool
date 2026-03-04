import { useState } from "react";
import { useNavigate } from "react-router";
import {
  TrendingUp, TrendingDown, Minus, ChevronLeft, ChevronRight,
  Plus, Download, Eye
} from "lucide-react";
import { suppliers, type Supplier, type RiskStatus } from "../data/mockData";

const PAGE_SIZE = 6;

function RiskBadge({ status }: { status: RiskStatus }) {
  const map = { green: "bg-green-100 text-green-700", yellow: "bg-yellow-100 text-yellow-700", red: "bg-red-100 text-red-700" };
  const label = { green: "Low Risk", yellow: "Medium Risk", red: "High Risk" };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[status]}`}>{label[status]}</span>;
}

function TrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
  if (trend === "up") return <TrendingUp size={15} className="text-red-500" />;
  if (trend === "down") return <TrendingDown size={15} className="text-green-500" />;
  return <Minus size={15} className="text-gray-400" />;
}

function formatEuro(n: number) {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}k`;
  return `€${n}`;
}

const summaryStats = [
  { label: "Total Suppliers", value: suppliers.length, color: "text-gray-800" },
  { label: "High Risk", value: suppliers.filter(s => s.riskStatus === "red").length, color: "text-red-600" },
  { label: "Medium Risk", value: suppliers.filter(s => s.riskStatus === "yellow").length, color: "text-yellow-600" },
  { label: "Low Risk", value: suppliers.filter(s => s.riskStatus === "green").length, color: "text-green-600" },
];

export function SupplierOverview() {
  const navigate = useNavigate();
  const [riskFilter, setRiskFilter] = useState("All");
  const [revenueFilter, setRevenueFilter] = useState("All");
  const [dependencyFilter, setDependencyFilter] = useState("All");
  const [appliedFilters, setAppliedFilters] = useState({ risk: "All", revenue: "All", dependency: "All" });
  const [page, setPage] = useState(1);

  const filtered = suppliers.filter(s => {
    if (appliedFilters.risk !== "All" && s.riskStatus !== appliedFilters.risk.toLowerCase()) return false;
    if (appliedFilters.revenue === "<100k" && s.revenueExposure >= 100_000) return false;
    if (appliedFilters.revenue === "100k–1M" && (s.revenueExposure < 100_000 || s.revenueExposure > 1_000_000)) return false;
    if (appliedFilters.revenue === ">1M" && s.revenueExposure <= 1_000_000) return false;
    if (appliedFilters.dependency !== "All" && s.dependencyLevel !== appliedFilters.dependency) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const apply = () => { setAppliedFilters({ risk: riskFilter, revenue: revenueFilter, dependency: dependencyFilter }); setPage(1); };
  const reset = () => { setRiskFilter("All"); setRevenueFilter("All"); setDependencyFilter("All"); setAppliedFilters({ risk: "All", revenue: "All", dependency: "All" }); setPage(1); };

  const scoreColor = (s: Supplier) => s.riskStatus === "red" ? "text-red-600" : s.riskStatus === "yellow" ? "text-yellow-600" : "text-green-600";

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Supplier Risk Overview</h1>
          <p className="text-sm text-gray-500 mt-0.5">Monitor and manage supplier risk across your procurement portfolio</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm">
            <Download size={15} /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
            <Plus size={15} /> Add Supplier
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {summaryStats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Filters:</span>
          <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>All</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Red">Red</option>
          </select>
          <select value={revenueFilter} onChange={e => setRevenueFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>All</option>
            <option value="<100k">&lt;100k</option>
            <option value="100k–1M">100k–1M</option>
            <option value=">1M">&gt;1M</option>
          </select>
          <select value={dependencyFilter} onChange={e => setDependencyFilter(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100">
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button onClick={apply} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Apply Filters</button>
          <button onClick={reset} className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">Reset</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Supplier Name", "Risk Score", "Risk Status", "Revenue Exposure", "Dependency", "Financial", "Compliance", "ESG", "Trend", ""].map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map(s => (
                <tr
                  key={s.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/supplier/${s.id}`)}
                >
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.industry}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-bold ${scoreColor(s)}`}>{s.overallRiskScore}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <RiskBadge status={s.riskStatus} />
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700 whitespace-nowrap">{formatEuro(s.revenueExposure)}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      s.dependencyLevel === "High" ? "bg-red-50 text-red-700" :
                      s.dependencyLevel === "Medium" ? "bg-yellow-50 text-yellow-700" :
                      "bg-gray-100 text-gray-600"}`}>{s.dependencyLevel}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{s.financialRiskScore}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{s.complianceRiskScore}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-700">{s.esgRiskScore}</td>
                  <td className="px-4 py-3.5">
                    <TrendIcon trend={s.trend} />
                  </td>
                  <td className="px-4 py-3.5" onClick={e => { e.stopPropagation(); navigate(`/supplier/${s.id}`); }}>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 whitespace-nowrap">
                      <Eye size={13} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} suppliers
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium ${p === page ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
