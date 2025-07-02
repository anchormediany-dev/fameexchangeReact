const AMLBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#b8962d]/10 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b8962d]/5 rounded-full filter blur-3xl opacity-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-[#b8962d]/15 rounded-full filter blur-3xl opacity-15 animate-pulse-medium"></div>
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#e2cb68]/20 particle"
          style={{
            width: `${Math.random() * 5 + 1}px`,
            height: `${Math.random() * 5 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AMLBackground;
