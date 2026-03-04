import { useState } from "react";
import { Save, Users, Bell, Sliders, RotateCcw } from "lucide-react";
import React from "react";

const initialWeights = {
  financial: 35,
  compliance: 25,
  esg: 20,
  structural: 20,
};

const initialThresholds = {
  highRisk: 60,
  mediumRisk: 35,
  alertScoreChange: 5,
  expiryWarningDays: 30,
};

const users = [
  { name: "Anna Mueller", role: "Admin", email: "a.mueller@company.com" },
  { name: "Thomas Becker", role: "Viewer", email: "t.becker@company.com" },
  { name: "Sara Klein", role: "Risk Manager", email: "s.klein@company.com" },
  { name: "Max Richter", role: "Viewer", email: "m.richter@company.com" },
];

function SliderField({ label, value, onChange, min = 0, max = 100 }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-semibold text-blue-600">{value}%</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
}

export function Settings() {
  const [weights, setWeights] = useState(initialWeights);
  const [thresholds, setThresholds] = useState(initialThresholds);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"weights" | "thresholds" | "users">("weights");

  const total = weights.financial + weights.compliance + weights.esg + weights.structural;
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const resetWeights = () => setWeights(initialWeights);

  const tabs = [
    { key: "weights", label: "Risk Dimension Weights", icon: Sliders },
    { key: "thresholds", label: "Alert Thresholds", icon: Bell },
    { key: "users", label: "User Roles", icon: Users },
  ] as const;

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure risk weights, alert thresholds, and user access</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === key ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Weights */}
      {activeTab === "weights" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Risk Dimension Weights</h3>
              <p className="text-xs text-gray-400 mt-0.5">Adjust the contribution of each risk dimension to the overall score</p>
            </div>
            <button onClick={resetWeights} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="space-y-5">
            <SliderField label="Financial Risk" value={weights.financial} onChange={v => setWeights(w => ({ ...w, financial: v }))} />
            <SliderField label="Compliance Risk" value={weights.compliance} onChange={v => setWeights(w => ({ ...w, compliance: v }))} />
            <SliderField label="ESG Risk" value={weights.esg} onChange={v => setWeights(w => ({ ...w, esg: v }))} />
            <SliderField label="Structural Risk" value={weights.structural} onChange={v => setWeights(w => ({ ...w, structural: v }))} />
          </div>

          <div className={`flex items-center justify-between p-3 rounded-lg ${total === 100 ? "bg-green-50" : "bg-yellow-50"}`}>
            <span className="text-sm text-gray-600">Total Weight</span>
            <span className={`font-bold text-sm ${total === 100 ? "text-green-600" : "text-yellow-600"}`}>
              {total}% {total !== 100 ? `(must equal 100%)` : "✓"}
            </span>
          </div>

          {/* Visual breakdown */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Weight Distribution</p>
            <div className="flex rounded-lg overflow-hidden h-6">
              <div style={{ width: `${weights.financial}%` }} className="bg-blue-500 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">{weights.financial}%</span>
              </div>
              <div style={{ width: `${weights.compliance}%` }} className="bg-orange-400 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">{weights.compliance}%</span>
              </div>
              <div style={{ width: `${weights.esg}%` }} className="bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">{weights.esg}%</span>
              </div>
              <div style={{ width: `${weights.structural}%` }} className="bg-purple-500 flex items-center justify-center">
                <span className="text-white text-xs font-semibold">{weights.structural}%</span>
              </div>
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />Financial</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />Compliance</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" />ESG</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />Structural</span>
            </div>
          </div>
        </div>
      )}

      {/* Thresholds */}
      {activeTab === "thresholds" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
          <div>
            <h3 className="font-semibold text-gray-800">Alert Thresholds</h3>
            <p className="text-xs text-gray-400 mt-0.5">Define when alerts are triggered and how risk levels are classified</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "High Risk Threshold (Score ≥)", key: "highRisk", max: 100 },
              { label: "Medium Risk Threshold (Score ≥)", key: "mediumRisk", max: 100 },
              { label: "Alert on Score Change (± Points)", key: "alertScoreChange", max: 20 },
              { label: "Expiry Warning (Days Before)", key: "expiryWarningDays", max: 90 },
            ].map(({ label, key, max }) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-700">{label}</label>
                  <span className="text-sm font-semibold text-blue-600">{thresholds[key as keyof typeof thresholds]}</span>
                </div>
                <input
                  type="range" min={0} max={max}
                  value={thresholds[key as keyof typeof thresholds]}
                  onChange={e => setThresholds(t => ({ ...t, [key]: Number(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 mt-2">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Low Risk</p>
              <p className="font-semibold text-green-700 mt-0.5">0–{thresholds.mediumRisk - 1}</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">Medium Risk</p>
              <p className="font-semibold text-yellow-700 mt-0.5">{thresholds.mediumRisk}–{thresholds.highRisk - 1}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500">High Risk</p>
              <p className="font-semibold text-red-700 mt-0.5">≥{thresholds.highRisk}</p>
            </div>
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === "users" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">User Roles</h3>
              <p className="text-xs text-gray-400 mt-0.5">Manage team member access levels</p>
            </div>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              + Invite User
            </button>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Email", "Role", "Actions"].map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u.email}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">{u.name.split(" ").map(n => n[0]).join("")}</span>
                      </div>
                      <span className="font-medium text-gray-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <select defaultValue={u.role} className="text-sm border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 focus:outline-none">
                      <option>Admin</option>
                      <option>Risk Manager</option>
                      <option>Viewer</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-sm text-red-500 hover:text-red-700">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm"
      >
        <Save size={15} />
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
