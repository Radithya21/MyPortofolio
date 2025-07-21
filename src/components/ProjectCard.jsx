import React from 'react';

const stackColors = {
    html: 'bg-orange-500',
    css: 'bg-blue-500',
    javascript: 'bg-yellow-400 text-gray-900',
    php: 'bg-indigo-500',
    mysql: 'bg-teal-500',
    laravel: 'bg-red-500',
    figma: 'bg-pink-500',
    tailwind: 'bg-cyan-400 text-gray-900',
    gemini: 'bg-purple-500',
    cisco: 'bg-green-500',
    vlan: 'bg-fuchsia-500',
    subnetting: 'bg-blue-800',
    simulation: 'bg-indigo-400',
    react: 'bg-cyan-400 text-gray-900',
    nodejs: 'bg-green-600',
};

function ProjectCard({
    number,
    title,
    description,
    image,
    category,
    categoryColor = 'bg-blue-500',
    badges = [],
    demoLink,
    codeLink,
}) {
    return (
        <div className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-0 border border-white/20 shadow-2xl overflow-hidden
                    hover:shadow-purple-500/40 hover:border-purple-400/50 transition-all duration-700 ease-in-out
                    hover:scale-[1.03] hover:-translate-y-3 flex flex-col min-h-[540px]">
            {/* Gambar Project & Badge Kategori */}
            <div className="relative w-full h-48 mb-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-t-3xl"
                />
                {category && (
                    <span className={`absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-md ${categoryColor} bg-opacity-90`}>{category}</span>
                )}
            </div>
            <div className="flex flex-col flex-1 px-6 pt-4 pb-6">
                <h3 className="font-extrabold text-xl mb-2 text-white drop-shadow-lg leading-tight">
                    {title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 flex-grow">
                    {description}
                </p>
                {/* Badge Stack/Tech */}
                {badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {badges.map((badge, idx) => (
                            <span
                                key={idx}
                                className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md bg-opacity-80 ${stackColors[badge.toLowerCase()] || 'bg-gray-500'}`}
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                )}
                {/* Tombol Aksi */}
                <div className="flex gap-3 mt-auto">
                    {demoLink && (
                        <a
                            href={demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-md hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 text-sm"
                        >
                            Demo
                        </a>
                    )}
                    {codeLink && (
                        <a
                            href={codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold shadow-md hover:from-purple-400 hover:to-fuchsia-400 transition-all duration-300 text-sm"
                        >
                            Code
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectCard; 