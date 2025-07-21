import { useRef } from 'react';
import { FiHome, FiFolder, FiUser, FiSun, FiMoon } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

function BottomNavbar({ isMonochrome, toggleMonochrome }) {
    const iconRefs = useRef([]);



    // Icon bounce/scale animation
    const handleIconEnter = idx => {
        const icon = iconRefs.current[idx];
        if (icon) {
            gsap.to(icon, {
                scale: 1.55,
                rotate: 8,
                y: -20,
                boxShadow: '0 0 24px 0 rgba(139,92,246,0.25)',
                duration: 0.35,
                ease: 'back.out(1.7)',
            });
        }
    };
    const handleIconLeave = idx => {
        const icon = iconRefs.current[idx];
        if (icon) {
            gsap.to(icon, {
                scale: 1,
                rotate: 0,
                y: 0,
                boxShadow: '0 0 0 0 rgba(0,0,0,0)',
                duration: 0.35,
                ease: 'power2.inOut',
            });
        }
    };

    return (
        <div className="fixed left-1/2 bottom-6 z-50 -translate-x-1/2">
            <nav
                className="origin-center bg-white/10 backdrop-blur-md rounded-full px-8 py-3 flex gap-8 shadow-lg items-center transition-all duration-500"
            >
                <Link to="/" className="flex flex-col items-center group relative">
                    <span
                        ref={el => (iconRefs.current[0] = el)}
                        onMouseEnter={() => handleIconEnter(0)}
                        onMouseLeave={() => handleIconLeave(0)}
                        className="rounded-full p-3 bg-white/20 group-hover:bg-violet-500/80 transition text-xl text-violet-400 group-hover:text-white shadow-md cursor-pointer"
                    >
                        <FiHome />
                    </span>
                    {/* Tooltip */}
                    <div className="absolute top-full mt-1 px-3 py-1 bg-violet-600/95 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 shadow-lg border border-violet-400/30">
                        Home
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-violet-600/95"></div>
                    </div>
                </Link>
                <Link to="/projects" className="flex flex-col items-center group relative">
                    <span
                        ref={el => (iconRefs.current[1] = el)}
                        onMouseEnter={() => handleIconEnter(1)}
                        onMouseLeave={() => handleIconLeave(1)}
                        className="rounded-full p-3 bg-white/20 group-hover:bg-violet-500/80 transition text-xl text-violet-400 group-hover:text-white shadow-md cursor-pointer"
                    >
                        <FiFolder />
                    </span>
                    {/* Tooltip */}
                    <div className="absolute top-full mt-1 px-3 py-1 bg-violet-600/95 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 shadow-lg border border-violet-400/30">
                        Projects
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-violet-600/95"></div>
                    </div>
                </Link>
                <Link to="/contact" className="flex flex-col items-center group relative">
                    <span
                        ref={el => (iconRefs.current[2] = el)}
                        onMouseEnter={() => handleIconEnter(2)}
                        onMouseLeave={() => handleIconLeave(2)}
                        className="rounded-full p-3 bg-white/20 group-hover:bg-violet-500/80 transition text-xl text-violet-400 group-hover:text-white shadow-md cursor-pointer"
                    >
                        <FiUser />
                    </span>
                    {/* Tooltip */}
                    <div className="absolute top-full mt-1 px-3 py-1 bg-violet-600/95 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 shadow-lg border border-violet-400/30">
                        Contact
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-violet-600/95"></div>
                    </div>
                </Link>
            </nav>
        </div>
    );
}

export default BottomNavbar; 