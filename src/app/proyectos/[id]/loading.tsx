export default function LoadingProject() {
  return (
    <div className="flex-1 bg-stone-50 animate-pulse">
      <div className="container mx-auto px-4 py-8">
        <div className="h-4 w-32 bg-stone-200 rounded mb-8"></div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skeleton Image */}
          <div className="h-[60vh] lg:h-[80vh] bg-stone-200 rounded-xl"></div>

          {/* Skeleton Details */}
          <div className="flex flex-col justify-center">
            <div className="h-12 w-3/4 bg-stone-200 rounded mb-6"></div>
            
            <div className="flex gap-6 mb-8 border-y border-stone-200 py-6">
              <div className="h-5 w-24 bg-stone-200 rounded"></div>
              <div className="h-5 w-32 bg-stone-200 rounded"></div>
              <div className="h-5 w-16 bg-stone-200 rounded"></div>
            </div>

            <div className="space-y-4">
              <div className="h-4 w-full bg-stone-200 rounded"></div>
              <div className="h-4 w-full bg-stone-200 rounded"></div>
              <div className="h-4 w-5/6 bg-stone-200 rounded"></div>
              <div className="h-4 w-full bg-stone-200 rounded mt-4"></div>
              <div className="h-4 w-2/3 bg-stone-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
