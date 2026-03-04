import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ZAxis
} from "recharts";
import { Download, Filter } from "lucide-react";
import { suppliers } from "../data/mockData";

export function PortfolioView() {
  const navigate = useNavigate();
  const [showHighRisk, setShowHighRisk] = useState(false);
  const [showCriticalRevenue, setShowCriticalRevenue] = useState(false);
  const [showDependency, setShowDependency] = useState(false);

  const filtered = suppliers.filter(s => {
    if (showHighRisk && s.riskStatus !== "red") return false;
    if (showCriticalRevenue && s.revenueExposure <= 1_000_000) return false;
    return true;
  });

  const data = filtered.map(s => ({
    x: Math.round(s.revenueExposure / 1000),
    y: s.overallRiskScore,
    z: s.dependencyLevel === "High" && showDependency ? 140 : 80,
    name: s.name,
    status: s.riskStatus,
    dependency: s.dependencyLevel,
    id: s.id,
  }));

  const dotColor = (status: string) => {
    if (status === "red") return "#ef4444";
    if (status === "yellow") return "#f59e0b";
    return "#22c55e";
  };

  const summaryRed = suppliers.filter(s => s.riskStatus === "red").length;
  const summaryYellow = suppliers.filter(s => s.riskStatus === "yellow").length;
  const summaryGreen = suppliers.filter(s => s.riskStatus === "green").length;
  const totalExposure = suppliers.reduce((acc, s) => acc + s.revenueExposure, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Supplier Risk Portfolio</h1>
          <p className="text-sm text-gray-500 mt-0.5">Risk Score vs. Revenue Exposure across all suppliers</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm">
            <Download size={15} /> Export Portfolio Data
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs text-gray-500">Total Suppliers</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{suppliers.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-red-100 shadow-sm p-4">
          <p className="text-xs text-gray-500">High Risk</p>
          <p className="text-3xl font-bold text-red-600 mt-1">{summaryRed}</p>
        </div>
        <div className="bg-white rounded-xl border border-yellow-100 shadow-sm p-4">
          <p className="text-xs text-gray-500">Medium Risk</p>
          <p className="text-3xl font-bold text-yellow-600 mt-1">{summaryYellow}</p>
        </div>
        <div className="bg-white rounded-xl border border-green-100 shadow-sm p-4">
          <p className="text-xs text-gray-500">Total Exposure</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">€{(totalExposure / 1_000_000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Filters:</span>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={showHighRisk} onChange={e => setShowHighRisk(e.target.checked)} className="rounded" />
            <span className="text-sm text-gray-700">Show only High Risk</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={showCriticalRevenue} onChange={e => setShowCriticalRevenue(e.target.checked)} className="rounded" />
            <span className="text-sm text-gray-700">Show only Critical Revenue (&gt;€1M)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={showDependency} onChange={e => setShowDependency(e.target.checked)} className="rounded" />
            <span className="text-sm text-gray-700">Toggle Dependency Level (dot size)</span>
          </label>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-800">Risk Portfolio Map</h3>
            <p className="text-xs text-gray-400 mt-0.5">Click a supplier dot to view details</p>
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" />Low Risk</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />Medium Risk</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" />High Risk</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={420}>
          <ScatterChart margin={{ top: 10, right: 40, bottom: 40, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="x"
              name="Revenue (k€)"
              type="number"
              tick={{ fontSize: 12 }}
              label={{ value: "Revenue Exposure (k€)", position: "insideBottom", offset: -20, fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              dataKey="y"
              name="Risk Score"
              type="number"
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              label={{ value: "Risk Score", angle: -90, position: "insideLeft", offset: 10, fontSize: 12, fill: "#6b7280" }}
            />
            <ZAxis dataKey="z" range={[50, 200]} />
            <Tooltip
              content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0]?.payload;
                return (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-sm">
                    <p className="font-semibold text-gray-800">{d.name}</p>
                    <p className="text-gray-500">Revenue: €{d.x}k</p>
                    <p className="text-gray-500">Risk Score: {d.y}</p>
                    <p className="text-gray-500">Dependency: {d.dependency}</p>
                    <p className="text-blue-600 mt-1">Click to view details →</p>
                  </div>
                );
              }}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Scatter
              data={data}
              shape={(props: any) => {
                const { cx, cy, payload } = props;
                const color = dotColor(payload.status);
                const r = payload.z === 140 ? 12 : 8;
                return (
                  <g
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/supplier/${payload.id}`)}
                  >
                    <circle
                      cx={cx} cy={cy} r={r}
                      fill={color}
                      fillOpacity={0.75}
                      stroke="white"
                      strokeWidth={1.5}
                    />
                    <text
                      x={cx}
                      y={cy - r - 4}
                      textAnchor="middle"
                      fontSize={9}
                      fill="#374151"
                      className="select-none"
                    >
                      {payload.name.split(" ")[0]}
                    </text>
                  </g>
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Supplier Risk Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Supplier Risk Summary</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Supplier", "Industry", "Risk Score", "Status", "Revenue", "Dependency"].map(col => (
                <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.sort((a, b) => b.overallRiskScore - a.overallRiskScore).map(s => (
              <tr
                key={s.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/supplier/${s.id}`)}
              >
                <td className="px-4 py-3 font-medium text-gray-800">{s.name}</td>
                <td className="px-4 py-3 text-gray-500">{s.industry}</td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${s.riskStatus === "red" ? "text-red-600" : s.riskStatus === "yellow" ? "text-yellow-600" : "text-green-600"}`}>
                    {s.overallRiskScore}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    s.riskStatus === "red" ? "bg-red-100 text-red-700" :
                    s.riskStatus === "yellow" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"}`}>
                    {s.riskStatus === "red" ? "High Risk" : s.riskStatus === "yellow" ? "Medium Risk" : "Low Risk"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  €{s.revenueExposure >= 1_000_000 ? `${(s.revenueExposure / 1_000_000).toFixed(1)}M` : `${(s.revenueExposure / 1000).toFixed(0)}k`}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    s.dependencyLevel === "High" ? "bg-red-50 text-red-700" :
                    s.dependencyLevel === "Medium" ? "bg-yellow-50 text-yellow-700" :
                    "bg-gray-100 text-gray-600"}`}>{s.dependencyLevel}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
