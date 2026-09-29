import {Routes, Route,Link} from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import CustomerQueue from "./pages/CustomerQueue";


function App(){
  return(
    
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                <h1 className="text-4xl font-bold mb-4">
                  TokenSeva
                </h1>

                <p className="text-gray-600 mb-6">
                  Real-time Queue Management System
                </p>

                <Link
                  to="/admin"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Admin Dashboard
                </Link>
              </div>
            </div>
          }
        />
        
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/queue/:queueId" element={<CustomerQueue/>}/>
      </Routes>
  );
}

export default App;