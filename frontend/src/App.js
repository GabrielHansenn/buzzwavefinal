// src/App.js

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Posts from "./components/Posts";
import Comments from "./components/Comments";
import CreatePost from "./components/CreatePost";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Footer from "./components/Footer";

const AppContent = () => {
  const location = useLocation(); 
  const noFooterRoutes = ["/login", "/signup", "/create-post"];

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/posts"
          element={
            <PrivateRoute>
              <Posts />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="/comments/:postId"
          element={
            <PrivateRoute>
              <Comments />
            </PrivateRoute>
          }
        />
      </Routes>
      {/* Renderiza o Footer apenas se a rota atual não estiver em noFooterRoutes */}
      {!noFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
