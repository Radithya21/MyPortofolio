import { useRef, useEffect } from 'react';
import { FiDownload, FiFolder } from 'react-icons/fi';
import gsap from 'gsap';
import Lanyard from './Lanyard';
import { useNavigate } from 'react-router-dom';

function AboutMe() {
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const buttonsRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const navigate = useNavigate();

    // Enhanced floating particles with smoother animation
    useEffect(() => {
        const particles = document.querySelectorAll('.about-particle');
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

    // Initial animations
    useEffect(() => {
        const tl = gsap.timeline();

        // Title animation
        tl.fromTo(titleRef.current,
            { opacity: 0, y: -40, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
        );

        // Subtitle animation
        tl.fromTo(subtitleRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
            "-=0.4"
        );

        // Main text animation
        tl.fromTo(textRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            "-=0.3"
        );

        // Description animation
        tl.fromTo(descriptionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            "-=0.4"
        );

        // Buttons animation
        tl.fromTo(buttonsRef.current,
            { opacity: 0, y: 20, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
            "-=0.2"
        );

        // Image animation - removed scale to maintain consistent size
        tl.fromTo(imageRef.current,
            { opacity: 0, rotationY: 20 },
            { opacity: 1, rotationY: 0, duration: 1, ease: 'back.out(1.7)' },
            "-=0.8"
        );
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center py-16 w-full overflow-hidden">
            {/* Subtle animated background patterns */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="about-particle absolute w-1 h-1 bg-white/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Enhanced gradient orbs with subtle movement */}
            <div className="absolute top-32 left-32 w-80 h-80 bg-gradient-to-r from-purple-400/12 to-pink-400/12 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-blue-400/12 to-cyan-400/12 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/8 to-teal-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="max-w-6xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6 md:px-10 z-10">
                {/* Left: Text Content */}
                <div className="flex-1 flex flex-col items-start">
                    <div ref={titleRef}>
                        <h2 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent flex items-center gap-3">
                            About Me
                            <span className="text-lg text-violet-300 transform hover:scale-110 transition-transform duration-300">✦</span>
                        </h2>
                    </div>

                    <div ref={subtitleRef} className="flex items-center gap-2 mb-8">
                        <span className="text-violet-300 text-base font-medium">Crafting modern web solutions with future-ready technologies</span>
                        <span className="text-violet-300 text-lg transform hover:scale-110 transition-transform duration-300">✨</span>
                    </div>

                    <div ref={textRef}>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            Hello, I'm <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent">Dimas Radithya</span>
                        </h1>
                    </div>

                    <div ref={descriptionRef} className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-xl p-6 border border-white/15 shadow-xl mb-8 hover:border-purple-400/25 transition-all duration-500">
                        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl text-justify">
                            I'm an Information Systems student with a strong passion for web development—especially in front-end technologies and emerging fields like Web3, blockchain, and artificial intelligence. I actively build personal web projects, explore new technologies, and contribute to various digital initiatives. In every project, I strive to create modern, interactive, and meaningful solutions. I'm always open to collaboration, continuous learning, and meaningful connections—let’s connect!
                        </p>
                    </div>

                    <div ref={buttonsRef} className="flex gap-4">
                        <a
                            href="/CV_Dimas-Radithya.pdf"
                            download
                            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm border border-white/20"
                        >
                            <FiDownload className="transform group-hover:scale-110 transition-transform duration-300" />
                            Download CV
                        </a>
                        <a
                            href="/projects"
                            className="group inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 text-white font-semibold shadow-xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-1 backdrop-blur-xl border border-white/20 hover:border-purple-400/30"
                            onClick={e => { e.preventDefault(); navigate('/projects'); }}
                        >
                            <FiFolder className="transform group-hover:scale-110 transition-transform duration-300" />
                            View Projects
                        </a>
                    </div>
                </div>

                {/* Right: Profile Image */}
                <div className="flex-1 flex justify-center items-center">
                    <div ref={imageRef} className="relative group">
                        {/* Animated background rings */}
                        <div className="absolute inset-0 w-52 h-52 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 blur-xl animate-pulse" />
                        <div className="absolute inset-2 w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-blue-500/15 to-violet-500/15 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />

                        {/* Main image container - fixed size for consistency */}
                        <div className="relative w-[30rem] h-[35rem] flex items-center justify-center">
                            <div className="absolute inset-0 scale-125 transform-gpu">
                                <Lanyard />
                            </div>
                        </div>

                        {/* Floating accent elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full blur-sm opacity-60 animate-pulse" />
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-sm opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;