import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CreatePost from "./components/CreatePost/CreatePost";
import ListPosts from "./components/ListPosts/ListPosts";
import ViesPost from "./components/ViewPost/ViewPost";
import "./App.css";
import { CircularProgress } from "@mui/material";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <Navbar />
      <div className="App">
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              position: "fixed",
              top: "0",
              left: "0",
              backgroundColor: "#0e0e0e24",
              zIndex: "10000",
            }}
          >
            <CircularProgress size={100} />
          </div>
        )}
        <Routes>
          <Route path="/" element={<ListPosts setIsLoading={setIsLoading} />} />
          <Route path="/create-posts" element={<CreatePost setIsLoading={setIsLoading} />} />
          <Route path="/edit/:id" element={<CreatePost setIsLoading={setIsLoading} />} />
          <Route path="/posts/:id" element={<ViesPost setIsLoading={setIsLoading} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
