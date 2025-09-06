export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-10">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-blue-600 mb-4">User Profile</h1>
      <hr className="w-1/2 border-t-2 border-blue-400 mb-6" />

      {/* ID Display */}
      <p className="text-xl text-gray-700">
        Profile page for user ID:
        <span className="ml-2 px-3 py-1 rounded-lg bg-orange-500 text-white font-semibold shadow-md">
          {params.id}
        </span>
      </p>
    </div>
  );
}
