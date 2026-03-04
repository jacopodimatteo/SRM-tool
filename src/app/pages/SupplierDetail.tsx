import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  TrendingUp, TrendingDown, Minus, AlertTriangle, FileText,
  ChevronRight, Info, X, Download, Upload, Send, BarChart2,
  Shield, Leaf, Activity, ExternalLink, Clock, CheckCircle, XCircle
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, ZAxis, ReferenceLine
} from "recharts";
import { suppliers, type Supplier, type RiskStatus } from "../data/mockData";

function RiskBadge({ status, large }: { status: RiskStatus; large?: boolean }) {
  const map = {
    green: "bg-green-100 text-green-700 border border-green-200",
    yellow: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    red: "bg-red-100 text-red-700 border border-red-200"
  };
  const label = { green: "Low Risk", yellow: "Medium Risk", red: "High Risk" };
  return (
    <span className={`${map[status]} ${large ? "px-4 py-1.5 text-sm" : "px-2.5 py-1 text-xs"} rounded-full font-semibold`}>
      {label[status]}
    </span>
  );
}

function TrendIcon({ trend, size = 16 }: { trend: "up" | "down" | "neutral"; size?: number }) {
  if (trend === "up") return <TrendingUp size={size} className="text-red-500" />;
  if (trend === "down") return <TrendingDown size={size} className="text-green-500" />;
  return <Minus size={size} className="text-gray-400" />;
}

function ProgressBar({ value, status }: { value: number; status: RiskStatus }) {
  const color = { green: "bg-green-500", yellow: "bg-yellow-400", red: "bg-red-500" }[status];
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
      <div className={`${color} h-1.5 rounded-full transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}

function formatEuro(n: number) {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}k`;
  return `€${n}`;
}

function scoreStatus(score: number): RiskStatus {
  if (score >= 60) return "red";
  if (score >= 35) return "yellow";
  return "green";
}

type Modal = "financial" | "compliance" | "esg" | null;

export function SupplierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const supplier = suppliers.find(s => s.id === id) || suppliers[0];
  const [modal, setModal] = useState<Modal>(null);
  const [resolvedAlerts, setResolvedAlerts] = useState<string[]>([]);

  const portfolioData = suppliers.map(s => ({
    x: s.revenueExposure / 1000,
    y: s.overallRiskScore,
    z: s.id === supplier.id ? 120 : 60,
    name: s.name,
    status: s.riskStatus,
    isCurrent: s.id === supplier.id,
  }));

  const dotColor = (d: typeof portfolioData[0]) => {
    if (d.status === "red") return "#ef4444";
    if (d.status === "yellow") return "#f59e0b";
    return "#22c55e";
  };

  const activeAlerts = supplier.alerts.filter(a => !resolvedAlerts.includes(a.id));

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
        <ChevronRight size={14} />
        <Link to="/" className="hover:text-blue-600">Suppliers</Link>
        <ChevronRight size={14} />
        <span className="text-gray-800 font-medium">{supplier.name}</span>
      </nav>

      {/* Global Actions */}
      <div className="flex gap-2 justify-end">
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm">
          <Download size={14} /> Generate Risk Report (PDF)
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 shadow-sm">
          <FileText size={14} /> Download Supplier Summary
        </button>
      </div>

      {/* Supplier Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Supplier Info */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{supplier.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{supplier.industry}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-400">Contract Start</p>
                  <p className="text-sm font-medium text-gray-700 mt-0.5">{supplier.contractStart}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Last Review</p>
                  <p className="text-sm font-medium text-gray-700 mt-0.5">{supplier.lastReview}</p>
                </div>
              </div>
            </div>
            <div className="text-right space-y-2">
              <div>
                <p className="text-xs text-gray-400">Revenue Exposure</p>
                <p className="text-lg font-bold text-gray-800 mt-0.5">{formatEuro(supplier.revenueExposure)}</p>
              </div>
              <div className="flex gap-2 justify-end">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  supplier.dependencyLevel === "High" ? "bg-red-100 text-red-700" :
                  supplier.dependencyLevel === "Medium" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-600"}`}>
                  {supplier.dependencyLevel} Dependency
                </span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  supplier.abcClass === "A" ? "bg-blue-100 text-blue-700" :
                  supplier.abcClass === "B" ? "bg-purple-100 text-purple-700" :
                  "bg-gray-100 text-gray-600"}`}>
                  Class {supplier.abcClass}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Overall Score */}
        <div className={`bg-white rounded-xl border shadow-sm p-5 flex flex-col items-center justify-center gap-2 ${
          supplier.riskStatus === "red" ? "border-red-200 bg-red-50/30" :
          supplier.riskStatus === "yellow" ? "border-yellow-200 bg-yellow-50/30" :
          "border-green-200 bg-green-50/30"}`}>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Overall Risk Score</p>
          <p className={`text-6xl font-bold ${
            supplier.riskStatus === "red" ? "text-red-600" :
            supplier.riskStatus === "yellow" ? "text-yellow-600" :
            "text-green-600"}`}>{supplier.overallRiskScore}</p>
          <RiskBadge status={supplier.riskStatus} large />
          <div className="flex items-center gap-1.5 mt-1">
            <TrendIcon trend={supplier.trend} size={18} />
            <span className="text-sm text-gray-500">
              {supplier.trend === "up" ? "Increasing" : supplier.trend === "down" ? "Improving" : "Stable"}
            </span>
          </div>
          <p className="text-xs text-gray-400">Last updated: {supplier.lastReview}</p>
        </div>
      </div>

      {/* MODULE 1: Risk Dimension Breakdown */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Risk Dimension Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Structural Risk */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Activity size={16} className="text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Structural Risk</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600"><Info size={14} /></button>
            </div>
            <div className="flex items-end justify-between">
              <span className={`text-2xl font-bold ${scoreStatus(supplier.structuralRiskScore) === "red" ? "text-red-600" : scoreStatus(supplier.structuralRiskScore) === "yellow" ? "text-yellow-600" : "text-green-600"}`}>
                {supplier.structuralRiskScore}
              </span>
              <RiskBadge status={scoreStatus(supplier.structuralRiskScore)} />
            </div>
            <ProgressBar value={supplier.structuralRiskScore} status={scoreStatus(supplier.structuralRiskScore)} />
            <p className="text-xs text-gray-400 mt-2">ABC Class: {supplier.abcClass} • Dependency: {supplier.dependencyLevel}</p>
            <button className="mt-3 w-full px-3 py-1.5 text-xs font-medium text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50">
              View Details
            </button>
          </div>

          {/* Financial Risk */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart2 size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Financial Risk</span>
              </div>
              <TrendIcon trend={supplier.trend} />
            </div>
            <div className="flex items-end justify-between">
              <span className={`text-2xl font-bold ${scoreStatus(supplier.financialRiskScore) === "red" ? "text-red-600" : scoreStatus(supplier.financialRiskScore) === "yellow" ? "text-yellow-600" : "text-green-600"}`}>
                {supplier.financialRiskScore}
              </span>
              <RiskBadge status={scoreStatus(supplier.financialRiskScore)} />
            </div>
            <ProgressBar value={supplier.financialRiskScore} status={scoreStatus(supplier.financialRiskScore)} />
            <p className="text-xs text-gray-400 mt-2">Schufa: {supplier.schufaRating} • {supplier.insolvencyFlags ? "⚠ Insolvency Flag" : "No insolvency flags"}</p>
            <button onClick={() => setModal("financial")} className="mt-3 w-full px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
              View Financial Details
            </button>
          </div>

          {/* Compliance Risk */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Shield size={16} className="text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Compliance Risk</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className={`text-2xl font-bold ${scoreStatus(supplier.complianceRiskScore) === "red" ? "text-red-600" : scoreStatus(supplier.complianceRiskScore) === "yellow" ? "text-yellow-600" : "text-green-600"}`}>
                {supplier.complianceRiskScore}
              </span>
              <RiskBadge status={scoreStatus(supplier.complianceRiskScore)} />
            </div>
            <ProgressBar value={supplier.complianceRiskScore} status={scoreStatus(supplier.complianceRiskScore)} />
            <p className="text-xs text-gray-400 mt-2">Docs: {supplier.documentCompletion}% complete • {supplier.expiringDocuments} expiring</p>
            <button onClick={() => setModal("compliance")} className="mt-3 w-full px-3 py-1.5 text-xs font-medium text-orange-600 border border-orange-200 rounded-lg hover:bg-orange-50">
              View Compliance Details
            </button>
          </div>

          {/* ESG Risk */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf size={16} className="text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">ESG Risk</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <span className={`text-2xl font-bold ${scoreStatus(supplier.esgRiskScore) === "red" ? "text-red-600" : scoreStatus(supplier.esgRiskScore) === "yellow" ? "text-yellow-600" : "text-green-600"}`}>
                {supplier.esgRiskScore}
              </span>
              <RiskBadge status={scoreStatus(supplier.esgRiskScore)} />
            </div>
            <ProgressBar value={supplier.esgRiskScore} status={scoreStatus(supplier.esgRiskScore)} />
            <div className="flex items-center gap-1.5 mt-2">
              <div className={`w-2.5 h-2.5 rounded-full ${supplier.esgStatus === "red" ? "bg-red-500" : supplier.esgStatus === "yellow" ? "bg-yellow-400" : "bg-green-500"}`} />
              <p className="text-xs text-gray-400">IntegrityNext • {supplier.openEsgIssues} open issues</p>
            </div>
            <button onClick={() => setModal("esg")} className="mt-3 w-full px-3 py-1.5 text-xs font-medium text-green-600 border border-green-200 rounded-lg hover:bg-green-50">
              View ESG Details
            </button>
          </div>
        </div>
      </div>

      {/* MODULE 2 & 3 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* MODULE 2: Alerts */}
        <div className="xl:col-span-2 space-y-4">
          {/* Active Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Active Risk Alerts</h3>
              <p className="text-xs text-gray-400 mt-0.5">{activeAlerts.length} unresolved alerts</p>
            </div>
            <div className="divide-y divide-gray-50">
              {activeAlerts.length === 0 && (
                <div className="px-5 py-6 text-center text-sm text-gray-400">No active alerts</div>
              )}
              {activeAlerts.map(alert => (
                <div key={alert.id} className="px-5 py-3.5 flex items-start gap-3">
                  <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    alert.type === "financial" ? "bg-blue-100" :
                    alert.type === "compliance" ? "bg-orange-100" :
                    alert.type === "esg" ? "bg-green-100" : "bg-purple-100"}`}>
                    <AlertTriangle size={13} className={
                      alert.type === "financial" ? "text-blue-600" :
                      alert.type === "compliance" ? "text-orange-600" :
                      alert.type === "esg" ? "text-green-600" : "text-purple-600"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{alert.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{alert.dateDetected}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      alert.severity === "High" ? "bg-red-100 text-red-700" :
                      alert.severity === "Medium" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-600"}`}>{alert.severity}</span>
                    <button onClick={() => setResolvedAlerts(r => [...r, alert.id])} className="px-2.5 py-1 text-xs font-medium text-green-600 border border-green-200 rounded-lg hover:bg-green-50">Resolve</button>
                    <button className="px-2.5 py-1 text-xs font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50">Escalate</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Expirations */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Upcoming Expirations</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {supplier.documents.filter(d => d.status === "Expiring" || d.status === "Missing").map(doc => (
                <div key={doc.name} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <FileText size={15} className="text-gray-400 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{doc.name}</p>
                      <p className="text-xs text-gray-400">Expires: {doc.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {doc.daysRemaining !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        doc.daysRemaining <= 14 ? "bg-red-100 text-red-700" :
                        doc.daysRemaining <= 30 ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-600"}`}>{doc.daysRemaining}d left</span>
                    )}
                    {doc.status === "Missing" && <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">Missing</span>}
                    <button className="px-2.5 py-1 text-xs font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">Request Update</button>
                  </div>
                </div>
              ))}
              {supplier.documents.filter(d => d.status !== "Valid").length === 0 && (
                <div className="px-5 py-4 text-sm text-gray-400 text-center">No upcoming expirations</div>
              )}
            </div>
          </div>
        </div>

        {/* MODULE 3: Portfolio Position */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-1">Risk Portfolio Position</h3>
          <p className="text-xs text-gray-400 mb-3">Revenue Exposure vs. Risk Score</p>
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart margin={{ top: 5, right: 5, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="x" name="Revenue (k€)" tick={{ fontSize: 10 }} label={{ value: "Revenue (k€)", position: "insideBottom", offset: -10, fontSize: 10 }} />
              <YAxis dataKey="y" name="Risk Score" tick={{ fontSize: 10 }} />
              <ZAxis dataKey="z" range={[40, 160]} />
              <Tooltip content={({ payload }) => {
                if (!payload?.length) return null;
                const d = payload[0]?.payload;
                return (
                  <div className="bg-white border border-gray-200 rounded-lg p-2 shadow text-xs">
                    <p className="font-medium">{d.name}</p>
                    <p>Revenue: €{(d.x).toFixed(0)}k</p>
                    <p>Risk: {d.y}</p>
                  </div>
                );
              }} />
              <Scatter
                data={portfolioData}
                shape={(props: any) => {
                  const { cx, cy, payload } = props;
                  const color = dotColor(payload);
                  const r = payload.isCurrent ? 10 : 6;
                  return (
                    <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity={0.8}
                      stroke={payload.isCurrent ? "#1d4ed8" : "white"}
                      strokeWidth={payload.isCurrent ? 2 : 1} />
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />Low</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />Medium</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />High</span>
          </div>
          <button onClick={() => navigate("/portfolio")} className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50">
            <ExternalLink size={14} /> Open Full Portfolio View
          </button>
        </div>
      </div>

      {/* MODALS */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Financial Modal */}
            {modal === "financial" && (
              <div>
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Financial Risk Details – {supplier.name}</h2>
                  <button onClick={() => setModal(null)}><X size={18} className="text-gray-400 hover:text-gray-600" /></button>
                </div>
                <div className="p-5 space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Schufa Score – Last 12 Months</h3>
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={supplier.schufaHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500">Current Schufa Rating</p>
                      <p className="text-2xl font-bold text-gray-800 mt-1">{supplier.schufaRating}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500">Credit Trend Velocity</p>
                      <p className={`text-2xl font-bold mt-1 ${supplier.creditTrendVelocity > 0 ? "text-red-600" : "text-green-600"}`}>
                        {supplier.creditTrendVelocity > 0 ? "+" : ""}{supplier.creditTrendVelocity}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Insolvency Flags</h3>
                    <div className={`flex items-center gap-2 p-3 rounded-lg ${supplier.insolvencyFlags ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                      {supplier.insolvencyFlags ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
                      <span className="text-sm">{supplier.insolvencyFlags ? "Active insolvency flag detected" : "No insolvency flags"}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Uploaded Financial Documents</h3>
                    <div className="space-y-2">
                      {["Annual Report 2024", "Q3 Financial Statement", "Credit Reference Letter"].map(d => (
                        <div key={d} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-700">{d}</span>
                          </div>
                          <button className="text-xs text-blue-600 hover:underline">View</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                    <Download size={15} /> Download Credit Report
                  </button>
                </div>
              </div>
            )}

            {/* Compliance Modal */}
            {modal === "compliance" && (
              <div>
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Compliance Details – {supplier.name}</h2>
                  <button onClick={() => setModal(null)}><X size={18} className="text-gray-400 hover:text-gray-600" /></button>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-50 rounded-xl p-3 text-center flex-1">
                      <p className="text-xs text-gray-500">Completion</p>
                      <p className="text-2xl font-bold text-blue-600">{supplier.documentCompletion}%</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-3 text-center flex-1">
                      <p className="text-xs text-gray-500">Expiring</p>
                      <p className="text-2xl font-bold text-orange-600">{supplier.expiringDocuments}</p>
                    </div>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-3 py-2 text-left text-xs text-gray-500 font-semibold">Document</th>
                        <th className="px-3 py-2 text-left text-xs text-gray-500 font-semibold">Status</th>
                        <th className="px-3 py-2 text-left text-xs text-gray-500 font-semibold">Expiry</th>
                        <th className="px-3 py-2 text-left text-xs text-gray-500 font-semibold">Uploaded</th>
                        <th className="px-3 py-2 text-left text-xs text-gray-500 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {supplier.documents.map(doc => (
                        <tr key={doc.name}>
                          <td className="px-3 py-2.5 font-medium text-gray-700">{doc.name}</td>
                          <td className="px-3 py-2.5">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                              doc.status === "Valid" ? "bg-green-100 text-green-700" :
                              doc.status === "Expiring" ? "bg-yellow-100 text-yellow-700" :
                              "bg-red-100 text-red-700"}`}>{doc.status}</span>
                          </td>
                          <td className="px-3 py-2.5 text-gray-500">{doc.expiryDate}</td>
                          <td className="px-3 py-2.5 text-gray-500">{doc.lastUploaded}</td>
                          <td className="px-3 py-2.5">
                            <div className="flex gap-1.5">
                              <button className="px-2 py-1 text-xs text-blue-600 border border-blue-200 rounded hover:bg-blue-50">Upload New</button>
                              <button className="px-2 py-1 text-xs text-gray-600 border border-gray-200 rounded hover:bg-gray-50">Remind</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ESG Modal */}
            {modal === "esg" && (
              <div>
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">ESG Details – {supplier.name}</h2>
                  <button onClick={() => setModal(null)}><X size={18} className="text-gray-400 hover:text-gray-600" /></button>
                </div>
                <div className="p-5 space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">IntegrityNext Traffic Light</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className={`w-10 h-10 rounded-full ${supplier.esgStatus === "red" ? "bg-red-500" : supplier.esgStatus === "yellow" ? "bg-yellow-400" : "bg-green-500"}`} />
                      <div>
                        <p className="font-medium text-gray-800">{supplier.esgStatus === "red" ? "Critical ESG Issues" : supplier.esgStatus === "yellow" ? "Moderate ESG Concerns" : "ESG Compliant"}</p>
                        <p className="text-sm text-gray-500">{supplier.openEsgIssues} open findings</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Open ESG Findings</h3>
                    {supplier.openEsgIssues === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-4">No open ESG findings</p>
                    ) : (
                      <div className="space-y-2">
                        {Array.from({ length: supplier.openEsgIssues }, (_, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                            <XCircle size={14} className="text-red-500 shrink-0" />
                            <p className="text-sm text-red-700">ESG Finding #{i + 1}: {["Carbon emissions exceeded", "Labor rights concern", "Waste disposal issue", "Supply chain transparency gap", "Energy efficiency non-compliance", "Environmental permit gap", "Social audit overdue"][i % 7]}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Clock size={15} className="text-gray-400" />
                    <span>Last ESG Assessment: <strong>{supplier.lastEsgAssessment}</strong></span>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700">
                    <Send size={15} /> Request Reassessment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
