import React from "react";
const NetworkStatistics = () => {
  return (
    <section
      id="trading-chart"
      className="network-bg text-white  relative min-h-[100vh]"
    >
      <div className="container relative z-10 text-center space-y-8 py-20">
        <h1 className="text-p2 sm:text-p1 md:text-h6 lg:text-h5 xl:text-h4 2xl:text-h3 lg:text-5xl font-bold text-primary">
          <span className="text-white"> WHERE YOUR </span>NETWORK
          <span className="text-white">, IS YOUR </span>NET WORTH
        </h1>
      </div>
      <div className="network-statistics-bg h-[365px]"></div>
    </section>
  );
};

export default NetworkStatistics;
