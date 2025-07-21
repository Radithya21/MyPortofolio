import { useEffect, useRef, useState } from 'react';
import { FiCode, FiUser, FiGithub, FiBatteryCharging } from 'react-icons/fi';
import gsap from 'gsap';

function OpeningPage({ pageRef, onComplete }) {
    const iconsRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const batteryRef = useRef(null);
    const batteryLiquidRef = useRef(null);
    const batteryIconRef = useRef(null);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline();
        // Icons animation
        tl.fromTo(iconsRef.current.children,
            { opacity: 0, scale: 0.7, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.1 }
        );
        // Welcome text animation
        tl.fromTo(titleRef.current,
            { opacity: 0, y: -40, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
        );
        tl.fromTo(subtitleRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' },
            "-=0.4"
        );
        // Hold welcome text for 2 seconds
        tl.to({}, { duration: 2 });
        // Fade out welcome text and icons
        tl.to([iconsRef.current, titleRef.current, subtitleRef.current], {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.in'
        });
        // Battery charging animation (centered, fullscreen)
        tl.to(batteryRef.current, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.2');
        // Battery liquid fill and percent animation
        tl.fromTo(batteryLiquidRef.current, {
            scaleY: 0,
            transformOrigin: 'bottom',
        }, {
            scaleY: 1,
            duration: 2.5,
            ease: 'power2.inOut',
            onUpdate: function () {
                // Calculate percent based on progress
                const progress = this.progress();
                setPercent(Math.round(progress * 100));
            },
            onComplete: function () {
                setPercent(100);
            }
        }, '-=0.1');
        // Battery icon animation
        tl.to(batteryIconRef.current, {
            scale: 1.2,
            duration: 0.2,
            ease: 'back.out(1.7)'
        }, '-=0.5');
        // Complete animation and transition (fade out + scale)
        tl.to(batteryRef.current, {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
        }, '-=0.2');
        tl.to(pageRef.current, {
            opacity: 0,
            scale: 0.96,
            duration: 0.7,
            ease: 'power2.inOut',
            onComplete: () => {
                if (onComplete) onComplete();
            }
        }, '-=0.1');
    }, [pageRef, onComplete]);

    return (
        <div ref={pageRef} className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#2D3250] relative">
            {/* Welcome Content */}
            <div className="flex flex-col items-center justify-center w-full h-full absolute inset-0 z-5">
                {/* Ikon melingkar */}
                <div ref={iconsRef} className="flex gap-6 mb-8">
                    <span className="rounded-full bg-white/10 p-4 shadow-[0_0_16px_4px_rgba(139,92,246,0.4)] text-2xl text-violet-400 backdrop-blur-md hover:scale-110 transition-transform">
                        <FiCode />
                    </span>
                    <span className="rounded-full bg-white/10 p-4 shadow-[0_0_16px_4px_rgba(139,92,246,0.4)] text-2xl text-violet-400 backdrop-blur-md hover:scale-110 transition-transform">
                        <FiUser />
                    </span>
                    <span className="rounded-full bg-white/10 p-4 shadow-[0_0_16px_4px_rgba(139,92,246,0.4)] text-2xl text-violet-400 backdrop-blur-md hover:scale-110 transition-transform">
                        <FiGithub />
                    </span>
                </div>
                {/* Welcome Text */}
                <h1 ref={titleRef} className="text-4xl md:text-5xl font-extrabold text-white text-center mb-2 drop-shadow-lg">
                    Welcome To My
                </h1>
                <h2 ref={subtitleRef} className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-500 bg-clip-text text-transparent mb-6 drop-shadow-lg">
                    Portfolio Website
                </h2>
            </div>
            {/* Battery Animation Fullscreen Centered */}
            <div ref={batteryRef} className="flex flex-col items-center justify-center w-full h-full absolute inset-0 opacity-0 z-10">
                <div className="relative flex flex-col items-center">
                    {/* Battery Container */}
                    <div className="w-64 h-32 bg-white/20 rounded-3xl border-4 border-violet-400/50 backdrop-blur-md relative overflow-hidden flex items-end justify-center shadow-2xl">
                        {/* Battery Liquid Fill */}
                        <div
                            ref={batteryLiquidRef}
                            className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-green-500 via-green-400 to-lime-400 rounded-full"
                            style={{ transform: 'scaleY(0)', transition: 'transform 0.2s' }}
                        />
                        {/* Battery Icon & Percent */}
                        <div ref={batteryIconRef} className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-white text-5xl font-extrabold drop-shadow-lg select-none" style={{ textShadow: '0 2px 12px #000a' }}>{percent}%</span>
                            <FiBatteryCharging className="text-white text-4xl drop-shadow-lg mt-2" />
                        </div>
                    </div>
                    {/* Battery Text */}
                    <div className="text-center mt-8">
                        <span className="text-white text-3xl font-bold drop-shadow-lg">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OpeningPage; 