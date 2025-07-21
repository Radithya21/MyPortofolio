import { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, matchPath } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import OpeningPage from './components/OpeningPage';
import BottomNavbar from './components/BottomNavbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';
import SakelarLampuKlasik from './components/SakelarLampuKlasik';
import './App.css';

// Component untuk scroll ke atas setiap kali route berubah
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function MainRoutes({ isMonochrome, toggleMonochrome }) {
    const location = useLocation();
    // Navbar muncul di semua halaman kecuali ProjectDetail
    const isProjectDetail = matchPath('/projects/:id', location.pathname);
    const showNavbar = !isProjectDetail;
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home isMonochrome={isMonochrome} />} />
                <Route path="/projects" element={<Projects isMonochrome={isMonochrome} />} />
                <Route path="/projects/:id" element={<ProjectDetail isMonochrome={isMonochrome} />} />
                <Route path="/contact" element={<Contact isMonochrome={isMonochrome} />} />
            </Routes>
            {showNavbar && <BottomNavbar isMonochrome={isMonochrome} toggleMonochrome={toggleMonochrome} />}
        </>
    );
}

function App() {
    const [showOpening, setShowOpening] = useState(true);
    const [isMonochrome, setIsMonochrome] = useState(true); // default: monokrom
    const openingRef = useRef(null);

    const handleOpeningComplete = () => {
        setShowOpening(false);
    };

    // Tambahkan class 'monochrome' di root app jika isMonochrome true
    // OpeningPage selalu menggunakan color mode (non-monokrom)
    useEffect(() => {
        const root = document.getElementById('root');
        if (showOpening) {
            // OpeningPage: selalu color mode (non-monokrom)
            root.classList.remove('monochrome');
        } else {
            // Halaman lain: mengikuti state isMonochrome
            if (isMonochrome) {
                root.classList.add('monochrome');
            } else {
                root.classList.remove('monochrome');
            }
        }
    }, [isMonochrome, showOpening]);

    if (showOpening) return <OpeningPage pageRef={openingRef} onComplete={handleOpeningComplete} />;

    return (
        <Router>
            <SakelarLampuKlasik isOn={!isMonochrome} toggle={() => setIsMonochrome((v) => !v)} />
            <MainRoutes isMonochrome={isMonochrome} toggleMonochrome={() => setIsMonochrome((v) => !v)} />
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '500',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                        style: {
                            background: 'rgba(16, 185, 129, 0.2)',
                            border: '5px solid rgba(16, 185, 129, 0.3)',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                        style: {
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '5px solid rgba(239, 68, 68, 0.3)',
                        },
                    },
                }}
            />
        </Router>
    );
}

export default App;