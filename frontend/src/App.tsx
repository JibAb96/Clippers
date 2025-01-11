import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SearchPage from "./components/SearchPage/SearchPage";
import { SearchProvider } from "./context/SearchContext";
import ClipperProfile from "./components/ClipperProfile/ClipperProfile";
import CreatorDashboard from "./components/CreatorDashboard/CreatorDashboard";
import Loader from "./components/Utilities/Loader";
import Register from "./components/Registration/Register";
import SignIn from "./components/SignIn/SignIn";
import ClipperDashboard from "./components/ClipperDashboard/ClipperDashboard";
import Header from "./components/Header/Header";
const App = () => {
  return (
    <Router basename="/Clippers">
      <SearchProvider>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/profile/:id" element={<ClipperProfile />} />
            <Route path="/dashboard" element={<CreatorDashboard />} />
            <Route path="/clipper" element={<ClipperDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Suspense>
      </SearchProvider>
    </Router>
  );
};

export default App;
