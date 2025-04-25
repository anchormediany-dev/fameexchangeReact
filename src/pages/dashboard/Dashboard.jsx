import Footer from "../../components/Footer";
import DashboardNavbar from "../../components/DashboardNavbar";
import PortfolioDashboard from "../../components/PortfolioDashboard";

const Dashboard = () => {
  return (
    <div className="mt-20">
      <DashboardNavbar />
      <PortfolioDashboard />
      <Footer />
    </div>
  );
};

export default Dashboard;
