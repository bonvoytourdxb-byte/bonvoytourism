function SkeletonCard() {
    return (
        <div className="w-full md:max-w-[350px] flex-shrink-0 shadow-md rounded-md overflow-hidden flex flex-col animate-pulse">
            <div className="w-full h-[250px] bg-gray-300"></div>

            <div className="py-4 px-3 flex flex-col gap-3">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div> {/* Title */}
                
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                        <div className="w-full h-2 bg-gray-300 rounded"></div>
                        <div className="w-full h-1 bg-gray-300 rounded"></div>
                        <div className="w-2/3 h-1 bg-gray-300 rounded"></div>
                    </div>
                    
                    <div className="w-1/3 space-y-2">
                        <div className="w-full h-3 bg-gray-300 rounded"></div>
                        <div className="w-full h-3 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkeletonCard;