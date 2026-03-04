import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { SupplierOverview } from "./pages/SupplierOverview";
import { SupplierDetail } from "./pages/SupplierDetail";
import { PortfolioView } from "./pages/PortfolioView";
import { Settings } from "./pages/Settings";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: SupplierOverview },
      { path: "supplier/:id", Component: SupplierDetail },
      { path: "portfolio", Component: PortfolioView },
      { path: "settings", Component: Settings },
    ],
  },
]);
