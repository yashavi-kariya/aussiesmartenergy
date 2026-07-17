import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Solar6kw from './pages/Solar6kw'
import Solar10kw from './pages/Solar10kw'
import Solar13kw from './pages/Solar13kw'
import Solar15kw from './pages/Solar15kw'
import SolarCommercial from './pages/SolarCommercial'
import Solar20kw from './pages/Solar20kw'
import Solar30kw from './pages/Solar30kw'
import Solar50kw from './pages/Solar50kw'
import Solar100kw from './pages/Solar100kw'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login/admin';

  return (
    <div className="min-h-screen">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/solar/6.6kw" element={<Solar6kw />} />
        <Route path="/solar/10.5kw" element={<Solar10kw />} />
        <Route path="/solar/13.2kw" element={<Solar13kw />} />
        <Route path="/solar/15kw" element={<Solar15kw />} />
        <Route path="/solar/commercial" element={<SolarCommercial />} />
        <Route path="/solar/commercial/20kw" element={<Solar20kw />} />
        <Route path="/solar/commercial/30kw" element={<Solar30kw />} />
        <Route path="/solar/commercial/50kw" element={<Solar50kw />} />
        <Route path="/solar/commercial/100kw" element={<Solar100kw />} />
        
        {/* Admin Routes */}
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <ScrollToTopButton />}
    </div>
  )
}

export default App
