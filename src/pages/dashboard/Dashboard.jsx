import Footer from "../../components/Footer";
import DashboardNavbar from "../../components/DashboardNavbar";
import PortfolioDashboard from "../../components/PortfolioDashboard";

const Dashboard = () => {
  return (
    <div className="mt-20">
      <DashboardNavbar />
      <section
        className="text-white px-4 py-12 min-h-screen overflow-hidden relative"
        style={{
          backgroundImage: `
        radial-gradient(at top left, #1a1a1a 0%, transparent 60%),
        radial-gradient(at top right, #161616 0%, transparent 60%),
        radial-gradient(at bottom left, #0b0b0b 0%, transparent 60%),
        radial-gradient(at bottom right, #0b0b0b 0%, transparent 60%),
        linear-gradient(to bottom, #0b0b0b, #000)`,
          backgroundColor: "#000000",
        }}
      >
        {" "}
        <PortfolioDashboard />
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
