import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.js";
import SearchPage from "./components/SearchPage/SearchPage.js";
import { SearchProvider } from "./context/SearchContext.js";
import ClipperProfile from "./components/ClipperProfile/ClipperProfile.js";
import CreatorDashboard from "./components/CreatorDashboard/CreatorDashboard.js";
import Loader from "./components/Utilities/Loader.js";
import Register from "./components/Registration/Register.js";
import SignIn from "./components/SignIn/SignIn.js";

function App() {
  return (
    <Router>
      <SearchProvider>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/profile/:id" element={<ClipperProfile />} />
            <Route path="/dashboard" element={<CreatorDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Suspense>
      </SearchProvider>
    </Router>
  );
}

export default App;
