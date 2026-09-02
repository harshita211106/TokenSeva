import {Routes, Route, Navigate} from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
import CustomerQueue from "./pages/CustomerQueue";


function App(){
  return(
    <Routes>
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path="/queue/:queueId" element={<CustomerQueue/>}/>
      <Route path="*" element={<Navigate to="/admin" replace/>}/>
    </Routes>
  );
}

export default App;