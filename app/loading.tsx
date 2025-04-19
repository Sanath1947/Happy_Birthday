export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
        <p className="mt-4 text-blue-200">Loading our love story...</p>
      </div>
    </div>
  )
} 