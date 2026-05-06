// Loading component
export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-primary-text/20 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-primary-text/20 rounded mb-2"></div>
        <div className="h-4 w-64 bg-primary-text/20 rounded"></div>
      </div>
    </div>
  );
}
