export default function StatusFailed() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-500 text-white px-8 py-6 rounded-md shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-2xl font-bold">Status FAILED</h2>
            <p>Try again please.</p>
          </div>
        </div>
      </div>
    )
  }