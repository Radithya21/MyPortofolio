import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { MyProjects, badgeColors } from './DataProjects.js';
import { useNavigate } from 'react-router-dom';




const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

const Masonry = ({ items, favorites }) => {
  const columns = 5; // Fixed 5 columns
  const [containerRef, { width }] = useMeasure();
  const navigate = useNavigate();
  const grid = useMemo(() => {
    let wideCount = 0;
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;
    return items.map((child) => {
      let col = 0;
      let w = columnWidth;
      let colSpan = 1;
      if (child.shape === 'wide' && columns >= 3) {
        // Zig-zag: baris wide ke-n, genap di kiri, ganjil di kanan
        let wideIndex = wideCount;
        wideCount++;
        if (wideIndex % 2 === 0) {
          // Kiri
          col = 0;
        } else {
          // Kanan
          col = 2;
        }
        // Pastikan 3 kolom berurutan tersedia
        let canPlace = true;
        for (let c = col; c < col + 3; c++) {
          if (c >= columns || colHeights[c] !== Math.min(...colHeights)) {
            canPlace = false;
            break;
          }
        }
        if (canPlace) {
          w = columnWidth * 3 + gap * 2;
          colSpan = 3;
        } else {
          // fallback ke kolom dengan tinggi minimum
          col = colHeights.indexOf(Math.min(...colHeights));
          w = columnWidth;
          colSpan = 1;
        }
      } else if (child.shape === 'tall' && columns >= 2) {
        // Cari 2 kolom berurutan dengan tinggi sama dan minimum
        let minHeight = Math.min(...colHeights.slice(0, columns - 1).map((h, i) => Math.max(h, colHeights[i + 1])));
        let found = false;
        for (let i = 0; i < columns - 1; i++) {
          if (colHeights[i] === colHeights[i + 1] && colHeights[i] === minHeight) {
            col = i;
            w = columnWidth * 2 + gap;
            colSpan = 2;
            found = true;
            break;
          }
        }
        if (!found) {
          col = colHeights.indexOf(Math.min(...colHeights));
          w = columnWidth;
          colSpan = 1;
        }
      } else {
        col = colHeights.indexOf(Math.min(...colHeights));
      }
      const x = col * (columnWidth + gap);
      const height = child.height || 240;
      const y = colHeights[col];
      // Update colHeights untuk colSpan
      for (let c = col; c < col + colSpan; c++) {
        if (c < columns) colHeights[c] = y + height + gap;
      }
      return { ...child, x, y, w, h: height };
    });
  }, [columns, items, width]);
  console.log('Masonry items:', items);
  console.log('Masonry grid:', grid);
  useLayoutEffect(() => {
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.title + item.number}"]`;
      gsap.fromTo(
        selector,
        { opacity: 0, y: item.y + 100, x: item.x, width: item.w, height: item.h, filter: "blur(10px)" },
        { opacity: 1, y: item.y, x: item.x, width: item.w, height: item.h, filter: "blur(0px)", duration: 0.8, ease: "power3.out", delay: index * 0.07 }
      );
    });
  }, [grid]);
  return (
    <div ref={containerRef} className="relative w-full h-[1200px] min-h-[600px]">
      {grid.map((item) => (
        <div
          key={item.title + item.number}
          data-key={item.title + item.number}
          className="absolute box-content cursor-pointer group"
          style={{ willChange: "transform, width, height, opacity" }}
          onClick={() => navigate(`/projects/${item.title + item.number}`)}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" style={{ height: '180px' }} />

            {/* Favorite Star */}
            {favorites.includes(item.title + item.number) && (
              <div className="absolute top-3 right-3 z-20">
                <div className="bg-yellow-500/20 text-yellow-400 border-2 border-yellow-400/50 rounded-full p-2 shadow-lg shadow-yellow-500/25">
                  <FiStar className="text-lg fill-current" />
                </div>
              </div>
            )}

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-lg font-bold text-white mb-1">{item.subtitle}</h3>
            </div>
            {/* Overlay on hover */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/80 backdrop-blur-lg opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 rounded-2xl p-6 z-10">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-6 drop-shadow-xl tracking-wide">
                {item.title}
              </h2>
              <div className="flex flex-wrap gap-2 justify-center">
                {item.badges && item.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 text-xs rounded-full border border-white/20 shadow-md font-semibold ${badgeColors[badge.toLowerCase()] || 'bg-purple-500/20 text-purple-200'}`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function Projects() {
  // State untuk mengelola favorit
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('projectFavorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const particles = document.querySelectorAll('.projects-particle');
    particles.forEach((particle, idx) => {
      gsap.to(particle, {
        y: 'random(-60, 60)',
        x: 'random(-30, 30)',
        rotation: 'random(-45, 45)',
        duration: 'random(5, 9)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: idx * 0.4
      });
    });
  }, []);

  // Listen for localStorage changes to update favorites
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('projectFavorites');
      setFavorites(saved ? JSON.parse(saved) : []);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const [activeSemester, setActiveSemester] = useState('all');
  const [openFilter, setOpenFilter] = useState(false);
  // Update semesterList to include semesters 1 through 8
  const semesterList = ['all', 1, 2, 3, 4, 5, 6, 7, 8];
  const filteredProjects = activeSemester === 'all'
    ? MyProjects
    : MyProjects.filter(p => p.semester === activeSemester);
  const masonryItems = filteredProjects.map((p) => ({ ...p, id: p.title + p.number }));

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-16 pb-43 w-full bg-gradient-to-br from-[#0F0C29] via-[#24243e] to-[#302b63] overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="projects-particle absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      {/* Gradient orbs */}
      <div className="absolute top-24 left-24 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-24 right-24 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-52 h-52 bg-gradient-to-r from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="flex flex-col items-center gap-2 mb-12 mt-2">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up leading-tight py-2">My Projects</h1>
        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 mt-2">
          <FiStar className="text-yellow-400 text-lg" />
          <span className="text-white font-semibold">{favorites.length}/4 favorit</span>
        </div>
      </div>
      {/* Ganti filter semester menjadi pill/hamburger horizontal */}
      <div className="w-full max-w-6xl z-10 px-6 md:px-10 mb-24 flex justify-center">
        <div className="relative w-full flex flex-col items-center justify-center">
          <button
            onClick={() => setOpenFilter((v) => !v)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold uppercase tracking-wide bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50`}
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M4 6h16M7 12h10M10 18h4" /></svg>
            Semester
          </button>
          <AnimatePresence>
            {openFilter && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 bg-white/10 p-2 rounded-full shadow-lg mt-3 absolute left-1/2 top-full -translate-x-1/2 z-50"
                style={{ minWidth: 'max-content' }}
              >
                {semesterList.map((sem) => (
                  <button
                    key={sem}
                    onClick={() => { setActiveSemester(sem); setOpenFilter(false); }}
                    className={`w-12 h-12 aspect-square flex items-center justify-center rounded-full font-bold text-lg transition-all duration-300 border-2 border-white/10
                      ${activeSemester === sem
                        ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white shadow-lg scale-110 z-10'
                        : 'bg-white/10 text-gray-200 hover:bg-white/20 hover:text-white z-0'}
                    `}
                  >
                    {sem === 'all' ? <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M4 6h16M7 12h10M10 18h4" /></svg> : sem}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="w-full max-w-6xl z-10 px-6 md:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSemester}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <Masonry items={masonryItems} favorites={favorites} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Projects; 
