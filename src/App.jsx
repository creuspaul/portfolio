import PortfolioGrid from "./PortfolioGrid";
import atelier from "./atelier/atelier";

export default function App() {
  const path = window.location.pathname;

  if (path.startsWith("/atelier")) {
    return <Atelier />;
  }

  return <PortfolioGrid />;
}