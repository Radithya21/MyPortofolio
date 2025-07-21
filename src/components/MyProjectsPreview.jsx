import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { FiCode, FiAward, FiCpu, FiExternalLink, FiGithub, FiEye, FiStar, FiCalendar, FiUser } from 'react-icons/fi';
import gsap from "gsap";
import { MyProjects, MyCertificates, badgeColors } from '../pages/DataProjects.js';


// Enhanced Project Card Component
const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative mb-8 break-inside-avoid transform transition-all duration-500 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Project Card Container */}
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl hover:border-purple-400/40 transition-all duration-500 overflow-hidden">

                {/* Project Number Badge */}
                <div className="absolute top-4 left-4 z-20 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{project.number}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <span className={`${project.categoryColor} px-3 py-1 rounded-full text-white text-xs font-semibold shadow-lg backdrop-blur-sm`}>
                        {project.category}
                    </span>
                </div>

                {/* Project Image */}
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                        {project.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.badges.map((badge, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30 backdrop-blur-sm hover:bg-purple-500/30 transition-colors duration-200"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
                            <FiEye size={16} />
                            <span className="text-sm font-medium">Demo</span>
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg transition-all duration-300 hover:border-white/40">
                            <FiGithub size={16} />
                            <span className="text-sm font-medium">Code</span>
                        </button>
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isHovered ? 'shadow-2xl shadow-purple-500/20' : ''
                    }`} />
            </div>
        </div>
    );
};

// Enhanced Certificate Card Component
const CertificateCard = ({ cert, index }) => (
    <div
        className="group transform transition-all duration-500 hover:scale-105"
        style={{ animationDelay: `${index * 0.15}s` }}
    >
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:border-purple-400/40 transition-all duration-500 relative overflow-hidden">

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-3xl" />

            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <FiStar className="absolute top-3 right-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={20} />
            </div>

            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                {cert.title}
            </h3>

            <div className="flex items-center gap-2 text-gray-300 mb-2">
                <FiUser size={14} />
                <p className="text-sm font-medium">{cert.issuer}</p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-400">
                    <FiCalendar size={14} />
                    <p className="text-sm font-semibold">{cert.date}</p>
                </div>
                {cert.credentialId && (
                    <span className="text-xs text-gray-400 font-mono bg-white/5 px-2 py-1 rounded">
                        #{cert.credentialId}
                    </span>
                )}
            </div>
        </div>
    </div>
);

const techIcons = [
    'html', 'css', 'js', 'react', 'tailwind', 'python', 'nodejs', 'express', 'mysql', 'git', 'github', 'vscode', 'figma', 'java'
];

// Tambahkan utilitas Masonry
const useMedia = (queries, values, defaultValue) => {
    const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
    const [value, setValue] = useState(get);
    useEffect(() => {
        const handler = () => setValue(get);
        queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
        return () => queries.forEach((q) => matchMedia(q).removeEventListener("change", handler));
    }, [queries]);
    return value;
};

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
    useLayoutEffect(() => {
        grid.forEach((item, index) => {
            const selector = `[data-key="${item.id}"]`;
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
                    key={item.id}
                    data-key={item.id}
                    className="absolute box-content group transition-transform duration-300 hover:scale-105 hover:z-20 hover:shadow-2xl hover:shadow-purple-500/30"
                    style={{ willChange: "transform, width, height, opacity" }}
                >
                    <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" style={{ height: '180px' }} />

                        {/* Favorite Star */}
                        <div className="absolute top-3 right-3 z-20">
                            <div className="bg-yellow-500/20 text-yellow-400 border-2 border-yellow-400/50 rounded-full p-2 shadow-lg shadow-yellow-500/25">
                                <FiStar className="text-lg fill-current" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                        </div>
                        {/* Scale+Shadow Pop Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/80 backdrop-blur-lg rounded-2xl p-6 z-10 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
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

function MyProjectsPreview() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const [activeTab, setActiveTab] = useState('projects');
    const [hoveredTech, setHoveredTech] = useState(null);

    // State untuk mengelola favorit
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('projectFavorites');
        return saved ? JSON.parse(saved) : [];
    });

    // Filter project yang favorit
    const favoriteProjects = MyProjects.filter(project =>
        favorites.includes(project.title + project.number)
    );

    // Siapkan data Masonry untuk project favorit
    const masonryItems = favoriteProjects.map((p) => ({ ...p, id: p.title + p.number }));

    // Listen for localStorage changes to update favorites
    useEffect(() => {
        const handleStorageChange = () => {
            const saved = localStorage.getItem('projectFavorites');
            setFavorites(saved ? JSON.parse(saved) : []);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center py-20 pb-50 w-full overflow-hidden">
            {/* Enhanced Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    >
                        <div className="w-1 h-1 bg-purple-400/60 rounded-full" />
                    </div>
                ))}
            </div>

            {/* Enhanced Gradient orbs */}
            <div className="absolute top-10 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -right-20 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/3 right-10 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />

            <div className="max-w-7xl w-full mx-auto flex flex-col items-center z-10 px-6 md:px-10">
                {/* Enhanced Title */}
                <div className="text-center mb-8">
                    <h2
                        ref={titleRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4 leading-tight tracking-tight"
                    >
                        Portfolio
                    </h2>
                </div>

                {/* Enhanced Description Card */}
                <div
                    ref={descriptionRef}
                    className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/30 shadow-2xl mb-12 w-full max-w-4xl text-center hover:border-purple-400/40 transition-all duration-500 group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-fuchsia-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light relative z-10">
                        Explore my journey through <span className="text-purple-400 font-semibold">innovative projects</span>,
                        <span className="text-violet-400 font-semibold"> professional certifications</span>, and
                        <span className="text-fuchsia-400 font-semibold"> technical expertise</span>.
                        Each section represents a milestone in my continuous learning path.
                    </p>
                </div>

                {/* Enhanced Tab Navigation */}
                <div className="w-full max-w-7xl flex justify-center mb-12">
                    <div className="flex flex-1 gap-8 justify-center items-center">
                        {[
                            { id: 'projects', icon: FiCode, label: 'FAVORITES', count: favoriteProjects.length },
                            { id: 'certificates', icon: FiAward, label: 'CERTIFICATIONS', count: MyCertificates.length },
                            { id: 'techstack', icon: FiCpu, label: 'TECH_STACK', count: techIcons.length }
                        ].map(({ id, icon: Icon }, idx) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`rounded-full p-3 text-xl shadow-md transition-all duration-300 flex items-center justify-center
                                    hover:scale-155 transition-transform duration-300
                                    ${activeTab === id
                                        ? 'bg-gradient-to-br from-fuchsia-500 via-purple-500 to-blue-500 text-white scale-110 shadow-[0_4px_32px_0_rgba(168,85,247,0.25)]'
                                        : 'bg-white/20 text-violet-400 hover:bg-violet-500/80 hover:text-white'}
                                `}
                                style={{ width: 52, height: 52 }}
                            >
                                <Icon className={`transition-all duration-300 ${activeTab === id ? 'scale-110 animate-pulse' : 'opacity-60'}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content with crossfade transition */}
                <div className="w-full min-h-[400px] relative">
                    {['projects', 'certificates', 'techstack'].map((tab) => (
                        <div
                            key={tab}
                            className={`absolute w-full h-full top-0 left-0 transition-opacity duration-500
                                ${activeTab === tab ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'}`}
                        >
                            {tab === 'projects' && (
                                favoriteProjects.length > 0 ? (
                                    <Masonry items={masonryItems} favorites={favorites} />
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 pb-40 text-center">
                                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md">
                                            <FiStar className="text-6xl text-yellow-400 mx-auto mb-4 opacity-50" />
                                            <h3 className="text-2xl font-bold text-white mb-2">Belum Ada Favorit</h3>
                                            <p className="text-gray-300 mb-4">
                                                Anda belum menambahkan project ke favorit.
                                                Kunjungi halaman Projects untuk menambahkan project favorit!
                                            </p>
                                            <div className="text-sm text-gray-400">
                                                💡 Klik bintang di halaman detail project untuk menambah ke favorit
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                            {tab === 'certificates' && (
                                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 mb-40">
                                    {MyCertificates.map((cert, idx) => (
                                        <CertificateCard key={idx} cert={cert} index={idx} />
                                    ))}
                                </div>
                            )}
                            {tab === 'techstack' && (
                                <div className="w-full mt-8 flex justify-center">
                                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-8 justify-center items-center max-w-4xl mb-40">
                                        {techIcons.map((icon, idx) => (
                                            <div
                                                key={icon}
                                                className="relative group flex flex-col items-center"
                                                onMouseEnter={() => setHoveredTech(icon)}
                                                onMouseLeave={() => setHoveredTech(null)}
                                                style={{ animationDelay: `${idx * 0.1}s` }}
                                            >
                                                <div className="relative p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:bg-white/10 group-hover:scale-110 group-hover:rotate-3 hover:shadow-2xl hover:shadow-purple-500/25">
                                                    <img
                                                        src={`https://skillicons.dev/icons?i=${icon}`}
                                                        alt={icon}
                                                        className="w-12 h-12 md:w-16 md:h-16 transition-all duration-300"
                                                    />
                                                    {hoveredTech === icon && (
                                                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                                                            {icon.charAt(0).toUpperCase() + icon.slice(1)}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes tech-pop {
                    0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                    50% { transform: scale(1.1) rotate(0deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                .animate-tech-pop {
                    animation: tech-pop 0.8s ease-out forwards;
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
}

export default MyProjectsPreview;