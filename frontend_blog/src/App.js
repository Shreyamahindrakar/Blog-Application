import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import UpdatePost from "./components/UpdatePost/UpdatePost";
import DeletePost from "./components/DeletePost/DeletePost";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
function App() {
  const currentUser = true;
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/register" element={currentUser ? <Homepage /> : <Register />} />
        <Route path="/login" element={currentUser ? <Homepage /> : <Login />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/update-post/:id" element={<UpdatePost />} />
        <Route path="/delete-post/:id" element={<DeletePost />} />
        <Route path="/write" element={currentUser ? <Write /> : <Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={currentUser ? <Settings /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
