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

const REQUIRED_SUPPLIER_DOCUMENTS = [
  "Business Registration",
  "Entry In The Register Of Skilled Trades",
  "Commercial Register Extract",
  "Social Security Clearence Certificates",
  "Certificates Of Compliance From The Employers' Liability Insurance Association",
  "Certificate In Tax Matters",
  "Business Liability Insurance",
  "Business Partner Code Of Conduct",
  "Payment Terms",
] as const;

type RequiredSupplierDocumentName = (typeof REQUIRED_SUPPLIER_DOCUMENTS)[number];
type RequiredDocumentOverrides = Partial<Record<RequiredSupplierDocumentName, Omit<Document, "name">>>;

function buildRequiredDocuments(overrides: RequiredDocumentOverrides): Document[] {
  return REQUIRED_SUPPLIER_DOCUMENTS.map((name) => {
    const override = overrides[name];
    if (override) {
      return { name, ...override };
    }
    return {
      name,
      status: "Missing",
      expiryDate: "—",
      lastUploaded: "—",
    };
  });
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
    documents: buildRequiredDocuments({
      "Business Registration": { status: "Valid", expiryDate: "2027-01-15", lastUploaded: "2025-01-15", daysRemaining: 317 },
      "Commercial Register Extract": { status: "Valid", expiryDate: "2026-12-01", lastUploaded: "2025-12-01", daysRemaining: 272 },
      "Social Security Clearence Certificates": { status: "Expiring", expiryDate: "2026-03-22", lastUploaded: "2025-03-22", daysRemaining: 18 },
      "Certificate In Tax Matters": { status: "Expiring", expiryDate: "2026-03-30", lastUploaded: "2025-03-30", daysRemaining: 26 },
      "Business Liability Insurance": { status: "Expiring", expiryDate: "2026-03-18", lastUploaded: "2025-03-18", daysRemaining: 14 },
      "Business Partner Code Of Conduct": { status: "Valid", expiryDate: "2027-05-01", lastUploaded: "2025-05-01", daysRemaining: 422 },
      "Payment Terms": { status: "Valid", expiryDate: "2027-01-01", lastUploaded: "2025-01-01", daysRemaining: 303 },
    }),
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
    documents: buildRequiredDocuments({
      "Business Registration": { status: "Valid", expiryDate: "2027-06-30", lastUploaded: "2025-07-01", daysRemaining: 483 },
      "Entry In The Register Of Skilled Trades": { status: "Valid", expiryDate: "2027-03-01", lastUploaded: "2025-03-01", daysRemaining: 362 },
      "Commercial Register Extract": { status: "Valid", expiryDate: "2026-09-30", lastUploaded: "2025-10-01", daysRemaining: 210 },
      "Social Security Clearence Certificates": { status: "Expiring", expiryDate: "2026-04-01", lastUploaded: "2025-04-01", daysRemaining: 28 },
      "Certificate In Tax Matters": { status: "Valid", expiryDate: "2027-01-10", lastUploaded: "2025-01-10", daysRemaining: 312 },
      "Business Liability Insurance": { status: "Valid", expiryDate: "2027-12-01", lastUploaded: "2025-12-01", daysRemaining: 637 },
      "Payment Terms": { status: "Valid", expiryDate: "2027-01-01", lastUploaded: "2025-01-15", daysRemaining: 303 },
    }),
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
    documents: buildRequiredDocuments({
      "Business Registration": { status: "Valid", expiryDate: "2027-01-10", lastUploaded: "2025-01-10", daysRemaining: 312 },
      "Entry In The Register Of Skilled Trades": { status: "Valid", expiryDate: "2027-03-01", lastUploaded: "2025-03-01", daysRemaining: 362 },
      "Commercial Register Extract": { status: "Valid", expiryDate: "2026-12-01", lastUploaded: "2025-12-01", daysRemaining: 272 },
      "Social Security Clearence Certificates": { status: "Valid", expiryDate: "2027-02-15", lastUploaded: "2025-02-15", daysRemaining: 348 },
      "Certificates Of Compliance From The Employers' Liability Insurance Association": { status: "Valid", expiryDate: "2027-04-01", lastUploaded: "2025-04-01", daysRemaining: 393 },
      "Certificate In Tax Matters": { status: "Valid", expiryDate: "2027-01-20", lastUploaded: "2025-01-20", daysRemaining: 322 },
      "Business Liability Insurance": { status: "Valid", expiryDate: "2027-06-30", lastUploaded: "2025-06-30", daysRemaining: 483 },
      "Business Partner Code Of Conduct": { status: "Valid", expiryDate: "2027-07-01", lastUploaded: "2025-07-01", daysRemaining: 484 },
      "Payment Terms": { status: "Valid", expiryDate: "2027-05-01", lastUploaded: "2025-05-01", daysRemaining: 422 },
    }),
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
    documents: buildRequiredDocuments({
      "Business Registration": { status: "Valid", expiryDate: "2027-05-01", lastUploaded: "2025-05-01", daysRemaining: 422 },
      "Commercial Register Extract": { status: "Valid", expiryDate: "2026-11-20", lastUploaded: "2025-11-20", daysRemaining: 261 },
      "Social Security Clearence Certificates": { status: "Expiring", expiryDate: "2026-03-15", lastUploaded: "2025-03-15", daysRemaining: 11 },
      "Certificate In Tax Matters": { status: "Expiring", expiryDate: "2026-04-10", lastUploaded: "2024-04-10", daysRemaining: 37 },
      "Business Partner Code Of Conduct": { status: "Valid", expiryDate: "2027-01-01", lastUploaded: "2025-01-01", daysRemaining: 303 },
      "Payment Terms": { status: "Valid", expiryDate: "2027-02-01", lastUploaded: "2025-02-01", daysRemaining: 334 },
    }),
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
    documents: buildRequiredDocuments({
      "Business Registration": { status: "Expiring", expiryDate: "2026-03-25", lastUploaded: "2024-03-25", daysRemaining: 21 },
      "Commercial Register Extract": { status: "Expiring", expiryDate: "2026-04-15", lastUploaded: "2025-04-15", daysRemaining: 42 },
      "Social Security Clearence Certificates": { status: "Expiring", expiryDate: "2026-03-10", lastUploaded: "2025-03-10", daysRemaining: 6 },
      "Certificates Of Compliance From The Employers' Liability Insurance Association": { status: "Expiring", expiryDate: "2026-03-28", lastUploaded: "2025-03-28", daysRemaining: 24 },
      "Certificate In Tax Matters": { status: "Valid", expiryDate: "2027-02-01", lastUploaded: "2025-02-01", daysRemaining: 334 },
      "Business Partner Code Of Conduct": { status: "Valid", expiryDate: "2026-10-01", lastUploaded: "2025-10-01", daysRemaining: 211 },
      "Payment Terms": { status: "Valid", expiryDate: "2027-01-10", lastUploaded: "2025-01-10", daysRemaining: 312 },
    }),
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
    documents: buildRequiredDocuments({
      "Business Registration": { status: "Valid", expiryDate: "2028-02-14", lastUploaded: "2025-02-14", daysRemaining: 811 },
      "Entry In The Register Of Skilled Trades": { status: "Valid", expiryDate: "2027-06-01", lastUploaded: "2025-06-01", daysRemaining: 454 },
      "Commercial Register Extract": { status: "Valid", expiryDate: "2026-12-31", lastUploaded: "2025-12-31", daysRemaining: 302 },
      "Social Security Clearence Certificates": { status: "Valid", expiryDate: "2027-02-20", lastUploaded: "2025-02-20", daysRemaining: 353 },
      "Certificates Of Compliance From The Employers' Liability Insurance Association": { status: "Valid", expiryDate: "2027-08-01", lastUploaded: "2025-08-01", daysRemaining: 515 },
      "Certificate In Tax Matters": { status: "Valid", expiryDate: "2027-03-10", lastUploaded: "2025-03-10", daysRemaining: 371 },
      "Business Liability Insurance": { status: "Valid", expiryDate: "2027-09-30", lastUploaded: "2025-09-30", daysRemaining: 575 },
      "Business Partner Code Of Conduct": { status: "Valid", expiryDate: "2027-01-31", lastUploaded: "2025-01-31", daysRemaining: 333 },
    }),
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
    documents: buildRequiredDocuments({
      "Business Registration": { status: "Valid", expiryDate: "2027-09-01", lastUploaded: "2025-09-01", daysRemaining: 546 },
      "Commercial Register Extract": { status: "Valid", expiryDate: "2027-01-01", lastUploaded: "2025-01-01", daysRemaining: 303 },
      "Social Security Clearence Certificates": { status: "Expiring", expiryDate: "2026-03-28", lastUploaded: "2024-03-28", daysRemaining: 24 },
      "Certificates Of Compliance From The Employers' Liability Insurance Association": { status: "Valid", expiryDate: "2026-11-01", lastUploaded: "2025-11-01", daysRemaining: 242 },
      "Certificate In Tax Matters": { status: "Valid", expiryDate: "2027-02-15", lastUploaded: "2025-02-15", daysRemaining: 348 },
      "Business Partner Code Of Conduct": { status: "Valid", expiryDate: "2027-01-15", lastUploaded: "2025-01-15", daysRemaining: 317 },
      "Payment Terms": { status: "Valid", expiryDate: "2027-04-01", lastUploaded: "2025-04-01", daysRemaining: 393 },
    }),
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
    documents: buildRequiredDocuments({
      "Business Registration": { status: "Valid", expiryDate: "2027-11-15", lastUploaded: "2025-11-15", daysRemaining: 621 },
      "Entry In The Register Of Skilled Trades": { status: "Valid", expiryDate: "2028-01-01", lastUploaded: "2025-01-01", daysRemaining: 668 },
      "Commercial Register Extract": { status: "Valid", expiryDate: "2026-11-30", lastUploaded: "2025-11-30", daysRemaining: 271 },
      "Social Security Clearence Certificates": { status: "Valid", expiryDate: "2027-02-01", lastUploaded: "2025-02-01", daysRemaining: 334 },
      "Certificates Of Compliance From The Employers' Liability Insurance Association": { status: "Valid", expiryDate: "2027-03-15", lastUploaded: "2025-03-15", daysRemaining: 376 },
      "Certificate In Tax Matters": { status: "Valid", expiryDate: "2027-01-31", lastUploaded: "2025-01-31", daysRemaining: 333 },
      "Business Liability Insurance": { status: "Valid", expiryDate: "2027-08-20", lastUploaded: "2025-08-20", daysRemaining: 534 },
      "Business Partner Code Of Conduct": { status: "Valid", expiryDate: "2027-05-10", lastUploaded: "2025-05-10", daysRemaining: 432 },
      "Payment Terms": { status: "Valid", expiryDate: "2027-04-15", lastUploaded: "2025-04-15", daysRemaining: 407 },
    }),
  },
];
