import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SearchPage from "./components/SearchPage/SearchPage";
import { SearchProvider } from "./context/SearchContext";
import ClipperProfile from "./components/ClipperProfile/ClipperProfile";
import CreatorDashboard from "./components/CreatorDashboard/CreatorDashboard";
import Loader from "./components/Utilities/Loader";
import Register from "./components/Registration/Register";
import SignIn from "./components/SignIn/SignIn";
import ClipperDashboard from "./components/ClipperDashboard/ClipperDashboard";

const App = () => {
  return (
    <Router>
      <SearchProvider>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/Clippers" element={<SearchPage />} />
            <Route path="/Clippers/profile/:id" element={<ClipperProfile />} />
            <Route path="/Clippers/dashboard" element={<CreatorDashboard />} />
            <Route path="/Clippers/clipper" element={<ClipperDashboard />} />
            <Route path="/Clippers/register" element={<Register />} />
            <Route path="/Clippers/signin" element={<SignIn />} />
          </Routes>
        </Suspense>
      </SearchProvider>
    </Router>
  );
};

export default App;
