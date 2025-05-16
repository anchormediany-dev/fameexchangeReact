const NetworkStatistics = () => {
  return (
    <section
      id="trading-chart"
      className="network-bg 2xl:h-[800px] text-white  relative"
    >
      <div className="container relative z-10 text-center space-y-8 py-12">
        <h1 className="font-heading-xxl text-primary">
          <span className="text-white"> WHERE YOUR </span>NETWORK
          <span className="text-white">, IS YOUR </span>NET WORTH
        </h1>
      </div>
      <div className="network-statistics-bg h-[365px]"></div>
    </section>
  );
};

export default NetworkStatistics;
