import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { SupplierOverview } from "./pages/SupplierOverview";
import { SupplierDetail } from "./pages/SupplierDetail";
import { PortfolioView } from "./pages/PortfolioView";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
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
