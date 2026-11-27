import PortfolioGrid from "./PortfolioGrid";
import Atelier from "./atelier/Atelier";

export default function App() {
  const path = window.location.pathname;

  if (path.startsWith("/atelier")) {
    return <Atelier />;
  }

  return <PortfolioGrid />;
}