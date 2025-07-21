import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiFolder, FiStar } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { MyProjects, badgeColors } from './DataProjects.js';

function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = MyProjects.find(p => (p.title + p.number) === id);

    // State untuk mengelola favorit
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('projectFavorites');
        return saved ? JSON.parse(saved) : [];
    });

    const isFavorite = favorites.includes(id);

    // Fungsi untuk toggle favorit
    const toggleFavorite = () => {
        if (isFavorite) {
            // Hapus dari favorit
            setFavorites(prev => prev.filter(favId => favId !== id));
            toast.success(`${project.title} dihapus dari favorit!`);
        } else {
            // Tambah ke favorit (maksimal 4)
            if (favorites.length >= 4) {
                toast.error('Maksimal hanya bisa menambahkan 4 project favorit!');
                return;
            }
            setFavorites(prev => [...prev, id]);
            toast.success(`${project.title} ditambahkan ke favorit!`);
        }
    };

    // Simpan ke localStorage setiap kali favorites berubah
    useEffect(() => {
        localStorage.setItem('projectFavorites', JSON.stringify(favorites));
    }, [favorites]);

    if (!project) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F0C29] via-[#24243e] to-[#302b63] px-4">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4 text-white">Project Not Found</h1>
                <p className="text-gray-300 mb-6">The project you're looking for doesn't exist.</p>
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white font-semibold shadow-lg border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 group mx-auto"
                >
                    <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Back to Projects</span>
                    <FiFolder className="text-lg group-hover:scale-110 transition-transform duration-300" />
                </button>
            </div>
        </div>
    );
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F0C29] via-[#24243e] to-[#302b63] px-4 py-8">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto mb-8">
                <button
                    onClick={() => navigate('/projects')}
                    className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white font-semibold shadow-lg border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 group"
                >
                    <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Back to Projects</span>
                    <FiFolder className="text-lg group-hover:scale-110 transition-transform duration-300" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex justify-center">
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/5 rounded-3xl shadow-2xl p-8 md:p-14 border border-white/10">
                    {/* Left: Info */}
                    <div className="flex flex-col gap-6 justify-start">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">{project.title}</h1>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={toggleFavorite}
                                    className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${isFavorite
                                        ? 'bg-yellow-500/20 text-yellow-400 border-2 border-yellow-400/50 shadow-lg shadow-yellow-500/25'
                                        : 'bg-white/10 text-gray-400 border-2 border-white/20 hover:border-yellow-400/50 hover:text-yellow-400 hover:bg-yellow-500/10'
                                        }`}
                                    title={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                                >
                                    <FiStar className={`text-lg ${isFavorite ? 'fill-current' : ''}`} />
                                </button>
                                <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">
                                    {favorites.length}/4 favorit
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-200 text-lg leading-relaxed text-justify">{project.description}</p>
                        <div className="flex gap-6 mb-4">
                            <div className="flex flex-col items-center bg-white/10 rounded-xl px-6 py-3">
                                <span className="text-2xl font-bold text-white">{project.badges?.length || 0}</span>
                                <span className="text-xs text-gray-300 mt-1">Total Teknologi</span>
                            </div>
                            <div className="flex flex-col items-center bg-white/10 rounded-xl px-6 py-3">
                                <span className="text-2xl font-bold text-white">{project.keyFeatures?.length || 4}</span>
                                <span className="text-xs text-gray-300 mt-1">Fitur Utama</span>
                            </div>
                        </div>
                        <div className="flex gap-4 mb-4">
                            {project.demoLink && (
                                project.demoLink === '#' ? (
                                    <div className="relative group">
                                        <button
                                            className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold shadow transition cursor-not-allowed pointer-events-none relative"
                                            tabIndex={-1}
                                        >
                                            Live Demo
                                        </button>
                                        <div className="absolute left-1/2 -translate-x-1/2 -top-10 bg-black text-white text-xs rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20 shadow-lg border border-red-400/30">
                                            project tidak di publish
                                        </div>
                                    </div>
                                ) : (
                                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition">Live Demo</a>
                                )
                            )}
                            {project.codeLink && <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full bg-gray-800 hover:bg-gray-900 text-white font-bold shadow transition">Github</a>}
                        </div>
                        <div>
                            <div className="text-gray-300 font-semibold mb-2">Technologies Used</div>
                            <div className="flex flex-wrap gap-2">
                                {project.badges?.map((badge, idx) => (
                                    <span key={idx} className={`px-3 py-1 text-xs rounded-full border border-white/20 shadow-md font-semibold ${badgeColors[badge.toLowerCase()] || 'bg-purple-500/20 text-purple-200'}`}>
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Right: Image & Features */}
                    <div className="flex flex-col gap-6 justify-start">
                        <img src={project.image} alt={project.title} className="rounded-2xl shadow-xl w-full object-cover" style={{ minHeight: 180, maxHeight: 260 }} />
                        <div className="bg-white/10 rounded-2xl p-6 shadow flex flex-col gap-3">
                            <div className="text-lg font-bold text-yellow-300 flex items-center gap-2 mb-2">
                                <span>⭐</span> Key Features
                            </div>
                            <ul className="list-disc list-inside text-gray-200 text-base space-y-1 text-justify">
                                {project.keyFeatures?.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail; 