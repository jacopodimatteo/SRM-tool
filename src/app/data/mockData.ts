export type RiskStatus = "green" | "yellow" | "red";
export type Trend = "up" | "down" | "neutral";
export type DependencyLevel = "Low" | "Medium" | "High";
export type ABCClass = "A" | "B" | "C";

export interface Alert {
  id: string;
  type: "financial" | "compliance" | "esg" | "structural";
  description: string;
  severity: "Low" | "Medium" | "High";
  dateDetected: string;
  resolved: boolean;
}

export interface Document {
  name: string;
  status: "Valid" | "Expiring" | "Missing";
  expiryDate: string;
  lastUploaded: string;
  daysRemaining?: number;
}

export interface Supplier {
  id: string;
  name: string;
  industry: string;
  contractStart: string;
  lastReview: string;
  overallRiskScore: number;
  riskStatus: RiskStatus;
  revenueExposure: number;
  dependencyLevel: DependencyLevel;
  abcClass: ABCClass;
  financialRiskScore: number;
  complianceRiskScore: number;
  esgRiskScore: number;
  structuralRiskScore: number;
  trend: Trend;
  schufaRating: string;
  schufaHistory: { month: string; score: number }[];
  documentCompletion: number;
  expiringDocuments: number;
  esgStatus: RiskStatus;
  openEsgIssues: number;
  lastEsgAssessment: string;
  insolvencyFlags: boolean;
  alerts: Alert[];
  documents: Document[];
  openAlerts: number;
  creditTrendVelocity: number;
}

export const suppliers: Supplier[] = [
  {
    id: "sup-001",
    name: "TechCorp Industries",
    industry: "Electronics Manufacturing",
    contractStart: "2021-03-15",
    lastReview: "2025-11-10",
    overallRiskScore: 72,
    riskStatus: "red",
    revenueExposure: 2400000,
    dependencyLevel: "High",
    abcClass: "A",
    financialRiskScore: 68,
    complianceRiskScore: 55,
    esgRiskScore: 80,
    structuralRiskScore: 75,
    trend: "up",
    schufaRating: "C+",
    schufaHistory: [
      { month: "Mar 25", score: 62 }, { month: "Apr 25", score: 60 }, { month: "May 25", score: 58 },
      { month: "Jun 25", score: 61 }, { month: "Jul 25", score: 63 }, { month: "Aug 25", score: 65 },
      { month: "Sep 25", score: 64 }, { month: "Oct 25", score: 67 }, { month: "Nov 25", score: 70 },
      { month: "Dec 25", score: 69 }, { month: "Jan 26", score: 71 }, { month: "Feb 26", score: 72 },
    ],
    documentCompletion: 62,
    expiringDocuments: 3,
    esgStatus: "red",
    openEsgIssues: 5,
    lastEsgAssessment: "2025-09-01",
    insolvencyFlags: true,
    creditTrendVelocity: 4.2,
    openAlerts: 4,
    alerts: [
      { id: "a1", type: "financial", description: "Credit score declined by 8 points in last 30 days", severity: "High", dateDetected: "2026-02-20", resolved: false },
      { id: "a2", type: "compliance", description: "ISO 9001 certification expiring in 18 days", severity: "Medium", dateDetected: "2026-02-15", resolved: false },
      { id: "a3", type: "esg", description: "Environmental audit overdue by 45 days", severity: "High", dateDetected: "2026-01-20", resolved: false },
      { id: "a4", type: "structural", description: "Single-source dependency identified in critical component", severity: "Medium", dateDetected: "2026-02-01", resolved: false },
    ],
    documents: [
      { name: "ISO 9001 Certificate", status: "Expiring", expiryDate: "2026-03-22", lastUploaded: "2024-03-22", daysRemaining: 18 },
      { name: "Trade License", status: "Valid", expiryDate: "2026-12-31", lastUploaded: "2025-01-10", daysRemaining: 302 },
      { name: "Environmental Compliance", status: "Missing", expiryDate: "—", lastUploaded: "—" },
      { name: "GDPR Data Processing Agreement", status: "Valid", expiryDate: "2027-01-01", lastUploaded: "2025-01-01", daysRemaining: 303 },
      { name: "Insurance Certificate", status: "Expiring", expiryDate: "2026-03-30", lastUploaded: "2025-03-30", daysRemaining: 26 },
    ],
  },
  {
    id: "sup-002",
    name: "Meridian Logistics",
    industry: "Supply Chain & Logistics",
    contractStart: "2019-07-01",
    lastReview: "2025-12-05",
    overallRiskScore: 41,
    riskStatus: "yellow",
    revenueExposure: 890000,
    dependencyLevel: "Medium",
    abcClass: "B",
    financialRiskScore: 45,
    complianceRiskScore: 38,
    esgRiskScore: 42,
    structuralRiskScore: 40,
    trend: "neutral",
    schufaRating: "B",
    schufaHistory: [
      { month: "Mar 25", score: 44 }, { month: "Apr 25", score: 43 }, { month: "May 25", score: 45 },
      { month: "Jun 25", score: 42 }, { month: "Jul 25", score: 41 }, { month: "Aug 25", score: 43 },
      { month: "Sep 25", score: 44 }, { month: "Oct 25", score: 42 }, { month: "Nov 25", score: 40 },
      { month: "Dec 25", score: 41 }, { month: "Jan 26", score: 42 }, { month: "Feb 26", score: 41 },
    ],
    documentCompletion: 85,
    expiringDocuments: 1,
    esgStatus: "yellow",
    openEsgIssues: 2,
    lastEsgAssessment: "2025-11-15",
    insolvencyFlags: false,
    creditTrendVelocity: -0.5,
    openAlerts: 2,
    alerts: [
      { id: "a5", type: "compliance", description: "Workers compensation policy renewal needed", severity: "Medium", dateDetected: "2026-02-10", resolved: false },
      { id: "a6", type: "esg", description: "Carbon reporting incomplete for Q4 2025", severity: "Low", dateDetected: "2026-01-28", resolved: false },
    ],
    documents: [
      { name: "ISO 14001 Certificate", status: "Valid", expiryDate: "2027-06-30", lastUploaded: "2025-07-01", daysRemaining: 483 },
      { name: "Workers Compensation Policy", status: "Expiring", expiryDate: "2026-04-01", lastUploaded: "2025-04-01", daysRemaining: 28 },
      { name: "Trade License", status: "Valid", expiryDate: "2026-09-30", lastUploaded: "2025-10-01", daysRemaining: 210 },
      { name: "Data Processing Agreement", status: "Valid", expiryDate: "2028-01-01", lastUploaded: "2025-01-15" },
    ],
  },
  {
    id: "sup-003",
    name: "GreenPath Materials",
    industry: "Raw Materials",
    contractStart: "2022-01-10",
    lastReview: "2026-01-20",
    overallRiskScore: 18,
    riskStatus: "green",
    revenueExposure: 450000,
    dependencyLevel: "Low",
    abcClass: "C",
    financialRiskScore: 20,
    complianceRiskScore: 15,
    esgRiskScore: 12,
    structuralRiskScore: 22,
    trend: "down",
    schufaRating: "A-",
    schufaHistory: [
      { month: "Mar 25", score: 26 }, { month: "Apr 25", score: 24 }, { month: "May 25", score: 22 },
      { month: "Jun 25", score: 23 }, { month: "Jul 25", score: 21 }, { month: "Aug 25", score: 20 },
      { month: "Sep 25", score: 19 }, { month: "Oct 25", score: 18 }, { month: "Nov 25", score: 19 },
      { month: "Dec 25", score: 18 }, { month: "Jan 26", score: 17 }, { month: "Feb 26", score: 18 },
    ],
    documentCompletion: 96,
    expiringDocuments: 0,
    esgStatus: "green",
    openEsgIssues: 0,
    lastEsgAssessment: "2026-01-10",
    insolvencyFlags: false,
    creditTrendVelocity: -1.8,
    openAlerts: 0,
    alerts: [],
    documents: [
      { name: "ISO 9001 Certificate", status: "Valid", expiryDate: "2027-01-10", lastUploaded: "2025-01-10", daysRemaining: 312 },
      { name: "Environmental Permit", status: "Valid", expiryDate: "2027-03-01", lastUploaded: "2025-03-01", daysRemaining: 362 },
      { name: "Trade License", status: "Valid", expiryDate: "2026-12-01", lastUploaded: "2025-12-01", daysRemaining: 272 },
    ],
  },
  {
    id: "sup-004",
    name: "Nexus Software AG",
    industry: "Software & IT Services",
    contractStart: "2020-05-20",
    lastReview: "2025-10-15",
    overallRiskScore: 55,
    riskStatus: "yellow",
    revenueExposure: 1300000,
    dependencyLevel: "High",
    abcClass: "A",
    financialRiskScore: 50,
    complianceRiskScore: 60,
    esgRiskScore: 48,
    structuralRiskScore: 62,
    trend: "up",
    schufaRating: "B+",
    schufaHistory: [
      { month: "Mar 25", score: 48 }, { month: "Apr 25", score: 49 }, { month: "May 25", score: 50 },
      { month: "Jun 25", score: 51 }, { month: "Jul 25", score: 52 }, { month: "Aug 25", score: 53 },
      { month: "Sep 25", score: 53 }, { month: "Oct 25", score: 54 }, { month: "Nov 25", score: 54 },
      { month: "Dec 25", score: 55 }, { month: "Jan 26", score: 55 }, { month: "Feb 26", score: 55 },
    ],
    documentCompletion: 74,
    expiringDocuments: 2,
    esgStatus: "yellow",
    openEsgIssues: 1,
    lastEsgAssessment: "2025-10-01",
    insolvencyFlags: false,
    creditTrendVelocity: 1.2,
    openAlerts: 3,
    alerts: [
      { id: "a7", type: "compliance", description: "GDPR audit report overdue", severity: "High", dateDetected: "2026-02-01", resolved: false },
      { id: "a8", type: "structural", description: "Key personnel dependency risk identified", severity: "Medium", dateDetected: "2026-01-15", resolved: false },
      { id: "a9", type: "financial", description: "Delayed invoice payments detected (30+ days)", severity: "Low", dateDetected: "2026-02-18", resolved: false },
    ],
    documents: [
      { name: "GDPR DPA", status: "Expiring", expiryDate: "2026-04-10", lastUploaded: "2024-04-10", daysRemaining: 37 },
      { name: "ISO 27001 Certificate", status: "Valid", expiryDate: "2027-05-01", lastUploaded: "2025-05-01", daysRemaining: 422 },
      { name: "Cyber Security Policy", status: "Expiring", expiryDate: "2026-03-15", lastUploaded: "2025-03-15", daysRemaining: 11 },
      { name: "Business Continuity Plan", status: "Valid", expiryDate: "2027-01-01", lastUploaded: "2025-01-01" },
    ],
  },
  {
    id: "sup-005",
    name: "Baltic Steel Works",
    industry: "Steel & Metal Production",
    contractStart: "2018-11-01",
    lastReview: "2025-08-20",
    overallRiskScore: 63,
    riskStatus: "red",
    revenueExposure: 3100000,
    dependencyLevel: "High",
    abcClass: "A",
    financialRiskScore: 70,
    complianceRiskScore: 58,
    esgRiskScore: 66,
    structuralRiskScore: 60,
    trend: "up",
    schufaRating: "C",
    schufaHistory: [
      { month: "Mar 25", score: 55 }, { month: "Apr 25", score: 57 }, { month: "May 25", score: 58 },
      { month: "Jun 25", score: 59 }, { month: "Jul 25", score: 60 }, { month: "Aug 25", score: 61 },
      { month: "Sep 25", score: 61 }, { month: "Oct 25", score: 62 }, { month: "Nov 25", score: 63 },
      { month: "Dec 25", score: 63 }, { month: "Jan 26", score: 63 }, { month: "Feb 26", score: 63 },
    ],
    documentCompletion: 70,
    expiringDocuments: 4,
    esgStatus: "red",
    openEsgIssues: 7,
    lastEsgAssessment: "2025-07-01",
    insolvencyFlags: false,
    creditTrendVelocity: 2.1,
    openAlerts: 5,
    alerts: [
      { id: "a10", type: "esg", description: "Carbon emissions exceeding contractual limits", severity: "High", dateDetected: "2026-02-05", resolved: false },
      { id: "a11", type: "financial", description: "Revenue decline reported in Q3 financials", severity: "High", dateDetected: "2026-01-30", resolved: false },
      { id: "a12", type: "compliance", description: "Multiple documents approaching expiry", severity: "Medium", dateDetected: "2026-02-12", resolved: false },
      { id: "a13", type: "esg", description: "Labor rights audit finding unresolved", severity: "High", dateDetected: "2025-12-20", resolved: false },
      { id: "a14", type: "structural", description: "Geopolitical risk flag – Baltic region", severity: "Medium", dateDetected: "2026-01-10", resolved: false },
    ],
    documents: [
      { name: "ISO 14001 Certificate", status: "Expiring", expiryDate: "2026-03-25", lastUploaded: "2024-03-25", daysRemaining: 21 },
      { name: "Emissions Report 2025", status: "Missing", expiryDate: "—", lastUploaded: "—" },
      { name: "Trade License", status: "Expiring", expiryDate: "2026-04-15", lastUploaded: "2025-04-15", daysRemaining: 42 },
      { name: "Quality Certificate", status: "Valid", expiryDate: "2027-02-01", lastUploaded: "2025-02-01" },
      { name: "Safety Audit Report", status: "Expiring", expiryDate: "2026-03-10", lastUploaded: "2025-03-10", daysRemaining: 6 },
    ],
  },
  {
    id: "sup-006",
    name: "Alpine Packaging GmbH",
    industry: "Packaging & Containers",
    contractStart: "2023-02-14",
    lastReview: "2026-01-05",
    overallRiskScore: 29,
    riskStatus: "green",
    revenueExposure: 220000,
    dependencyLevel: "Low",
    abcClass: "C",
    financialRiskScore: 28,
    complianceRiskScore: 30,
    esgRiskScore: 25,
    structuralRiskScore: 32,
    trend: "down",
    schufaRating: "A",
    schufaHistory: [
      { month: "Mar 25", score: 35 }, { month: "Apr 25", score: 33 }, { month: "May 25", score: 32 },
      { month: "Jun 25", score: 31 }, { month: "Jul 25", score: 30 }, { month: "Aug 25", score: 30 },
      { month: "Sep 25", score: 29 }, { month: "Oct 25", score: 29 }, { month: "Nov 25", score: 28 },
      { month: "Dec 25", score: 29 }, { month: "Jan 26", score: 28 }, { month: "Feb 26", score: 29 },
    ],
    documentCompletion: 92,
    expiringDocuments: 0,
    esgStatus: "green",
    openEsgIssues: 0,
    lastEsgAssessment: "2025-12-10",
    insolvencyFlags: false,
    creditTrendVelocity: -1.5,
    openAlerts: 1,
    alerts: [
      { id: "a15", type: "compliance", description: "Annual review document submission pending", severity: "Low", dateDetected: "2026-02-22", resolved: false },
    ],
    documents: [
      { name: "ISO 9001 Certificate", status: "Valid", expiryDate: "2028-02-14", lastUploaded: "2025-02-14" },
      { name: "Environmental Permit", status: "Valid", expiryDate: "2027-06-01", lastUploaded: "2025-06-01" },
      { name: "Trade License", status: "Valid", expiryDate: "2026-12-31", lastUploaded: "2025-12-31" },
    ],
  },
  {
    id: "sup-007",
    name: "Vantage Chemicals Ltd",
    industry: "Chemical Distribution",
    contractStart: "2020-09-01",
    lastReview: "2025-09-10",
    overallRiskScore: 47,
    riskStatus: "yellow",
    revenueExposure: 670000,
    dependencyLevel: "Medium",
    abcClass: "B",
    financialRiskScore: 44,
    complianceRiskScore: 52,
    esgRiskScore: 50,
    structuralRiskScore: 44,
    trend: "neutral",
    schufaRating: "B-",
    schufaHistory: [
      { month: "Mar 25", score: 46 }, { month: "Apr 25", score: 47 }, { month: "May 25", score: 46 },
      { month: "Jun 25", score: 48 }, { month: "Jul 25", score: 47 }, { month: "Aug 25", score: 47 },
      { month: "Sep 25", score: 46 }, { month: "Oct 25", score: 47 }, { month: "Nov 25", score: 48 },
      { month: "Dec 25", score: 47 }, { month: "Jan 26", score: 47 }, { month: "Feb 26", score: 47 },
    ],
    documentCompletion: 80,
    expiringDocuments: 1,
    esgStatus: "yellow",
    openEsgIssues: 2,
    lastEsgAssessment: "2025-08-20",
    insolvencyFlags: false,
    creditTrendVelocity: 0.1,
    openAlerts: 2,
    alerts: [
      { id: "a16", type: "esg", description: "Chemical waste disposal permit renewal needed", severity: "Medium", dateDetected: "2026-02-08", resolved: false },
      { id: "a17", type: "compliance", description: "REACH compliance documentation incomplete", severity: "Medium", dateDetected: "2026-01-25", resolved: false },
    ],
    documents: [
      { name: "Chemical Handling License", status: "Valid", expiryDate: "2027-09-01", lastUploaded: "2025-09-01" },
      { name: "REACH Compliance Docs", status: "Expiring", expiryDate: "2026-03-28", lastUploaded: "2024-03-28", daysRemaining: 24 },
      { name: "Safety Data Sheets", status: "Valid", expiryDate: "2027-01-01", lastUploaded: "2025-01-01" },
    ],
  },
  {
    id: "sup-008",
    name: "Nordic Precision Tools",
    industry: "Industrial Tools",
    contractStart: "2021-11-15",
    lastReview: "2025-11-30",
    overallRiskScore: 23,
    riskStatus: "green",
    revenueExposure: 340000,
    dependencyLevel: "Low",
    abcClass: "C",
    financialRiskScore: 22,
    complianceRiskScore: 20,
    esgRiskScore: 28,
    structuralRiskScore: 25,
    trend: "neutral",
    schufaRating: "A",
    schufaHistory: [
      { month: "Mar 25", score: 25 }, { month: "Apr 25", score: 24 }, { month: "May 25", score: 24 },
      { month: "Jun 25", score: 23 }, { month: "Jul 25", score: 23 }, { month: "Aug 25", score: 24 },
      { month: "Sep 25", score: 23 }, { month: "Oct 25", score: 22 }, { month: "Nov 25", score: 23 },
      { month: "Dec 25", score: 23 }, { month: "Jan 26", score: 23 }, { month: "Feb 26", score: 23 },
    ],
    documentCompletion: 98,
    expiringDocuments: 0,
    esgStatus: "green",
    openEsgIssues: 0,
    lastEsgAssessment: "2025-11-01",
    insolvencyFlags: false,
    creditTrendVelocity: -0.2,
    openAlerts: 0,
    alerts: [],
    documents: [
      { name: "ISO 9001 Certificate", status: "Valid", expiryDate: "2027-11-15", lastUploaded: "2025-11-15" },
      { name: "CE Marking Documentation", status: "Valid", expiryDate: "2028-01-01", lastUploaded: "2025-01-01" },
      { name: "Trade License", status: "Valid", expiryDate: "2026-11-30", lastUploaded: "2025-11-30" },
    ],
  },
];
