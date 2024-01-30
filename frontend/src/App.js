import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CreatePost from "./components/CreatePost/CreatePost";
import ListPosts from "./components/ListPosts/ListPosts";
import ViesPost from "./components/ViewPost/ViewPost";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<ListPosts />} />
          <Route path="/create-posts" element={<CreatePost />} />
          <Route path="/edit/:id" element={<CreatePost />} />
          <Route path="/posts/:id" element={<ViesPost />} />"
        </Routes>
      </div>
    </Router>
  );
}

export default App;
