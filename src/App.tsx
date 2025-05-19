import React from 'react';
import { Home } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Home className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to My App</h1>
        <p className="text-gray-600">Start building something amazing!</p>
      </div>
    </div>
  );
}

export default App;