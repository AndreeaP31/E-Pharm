// Import React
import React from 'react';

// UserPage Component
const UserPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Hello</h1>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <h2 className="text-2xl font-semibold">Pagina User</h2>
      </main>
    </div>
  );
};

export default UserPage;
