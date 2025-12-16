  const SkeletonCard = () => (
    <div className="w-full md:max-w-[350px] shadow-md rounded-md overflow-hidden animate-pulse">
      <div className="bg-gray-300 w-full h-[200px]" />
      <div className="p-5 space-y-3">
        <div className="bg-gray-300 h-4 w-3/4" />
        <div className="bg-gray-300 h-3 w-1/2" />
        <div className="bg-gray-300 h-3 w-1/4" />
        <div className="bg-gray-300 h-5 w-1/3" />
      </div>
    </div>
  );