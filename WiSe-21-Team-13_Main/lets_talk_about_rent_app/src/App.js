import React from 'react';
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthUseCaseExample from "./pages/examples/AuthUseCase"
import CrudExample from './pages/examples/CrudExample';
import ArticleDashboard from './pages/articledashboard';
import Landing from './pages/landing';
import Login from './pages/login';
import PostArticle from './pages/postarticle';
import Profile from './pages/profile';
import Registration from './pages/registration';
import Navbar from './components/navbar';
import ViewArticle from './pages/viewarticle';
import Explore from "./pages/explore";
import Footer from './components/footer';

function App() {
  return (
    <div>
      <AuthProvider>
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/example/auth" element={<AuthUseCaseExample/>}/>
            <Route path="/example/crud" element={<CrudExample/>}/>

            <Route path="/navbar" element={<Navbar/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/postarticle" element={<PostArticle/>}/>
            <Route path="/articledashboard" element={<ArticleDashboard/>}/>
            <Route path="/view-article" element={<ViewArticle/>}/>
            <Route path="/explore" element={<Explore/>}/>
          </Routes>
      </Router>
      </AuthProvider>
      <Footer/>
    </div>
  );
}

export default App;