export default function LoadingService() {
  return (
    <div className="flex-1 bg-white animate-pulse">
      {/* Skeleton Hero */}
      <div className="h-[50vh] bg-stone-200 flex items-end">
        <div className="container mx-auto px-4 relative z-10 pb-12">
          <div className="h-4 w-32 bg-stone-300 rounded mb-6"></div>
          <div className="h-12 w-3/4 md:w-1/2 bg-stone-300 rounded mb-4"></div>
          <div className="h-6 w-full md:w-2/3 bg-stone-300 rounded"></div>
        </div>
      </div>

      {/* Skeleton Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="h-8 w-48 bg-stone-200 rounded mb-8"></div>
          <div className="h-4 w-full bg-stone-200 rounded"></div>
          <div className="h-4 w-full bg-stone-200 rounded"></div>
          <div className="h-4 w-5/6 bg-stone-200 rounded"></div>
          <div className="h-4 w-full bg-stone-200 rounded mt-4"></div>
          <div className="h-4 w-4/5 bg-stone-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
