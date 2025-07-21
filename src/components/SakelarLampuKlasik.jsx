import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * SakelarLampuKlasik (Modern Light Switch) Component
 *
 * A sleek, visually appealing, and interactive light switch component
 * with smooth GSAP animations for a premium user experience.
 *
 * @param {object} props - The component's properties.
 * @param {boolean} props.isOn - Indicates if the light is currently on.
 * @param {function} props.toggle - Callback function to toggle the light's state.
 */
function SakelarLampuKlasik({ isOn, toggle }) {
    // Refs for DOM elements to enable GSAP animations
    const leverRef = useRef(null);
    const bodyRef = useRef(null);
    const lampRef = useRef(null);

    // --- GSAP Animation for Light Switch State (ON/OFF) ---
    // This effect runs whenever the 'isOn' prop changes.
    useEffect(() => {
        // Animate the lever's rotation, vertical position, and shadow
        if (leverRef.current) {
            gsap.to(leverRef.current, {
                rotate: isOn ? -35 : 35, // Rotate up when ON, down when OFF
                y: isOn ? 6 : 0, // Slight vertical shift when ON
                // Enhanced shadow for a more defined glow when ON
                boxShadow: isOn ? '0 8px 32px 0 rgba(250,202,21,0.6)' : '0 2px 12px 0 rgba(0,0,0,0.25)',
                duration: 0.35,
                ease: 'power2.out', // Smooth easing for a natural feel
            });
        }

        // Animate the lamp's scale and shadow for a pulsing/glowing effect
        if (lampRef.current) {
            gsap.to(lampRef.current, {
                scale: isOn ? 1.15 : 1, // Slightly enlarge when ON
                // More intense and focused glow for the lamp
                boxShadow: isOn ? '0 0 40px 10px #fde68a, 0 0 100px 20px #facc15' : '0 4px 16px 0 rgba(0,0,0,0.15)',
                duration: 0.35,
                ease: 'power2.out',
            });
        }
    }, [isOn]); // Dependency array: re-run effect when 'isOn' changes

    // --- GSAP Hover Animation for the Switch Body ---
    // This effect sets up event listeners for hover animations.
    useEffect(() => {
        const switchBody = bodyRef.current;
        if (!switchBody) return; // Exit if ref is not yet attached

        // Define hover-in animation
        const handleMouseEnter = () => {
            gsap.to(switchBody, {
                scale: 1.07, // Slightly enlarge
                y: -6, // Move up
                duration: 0.25,
                ease: 'power2.out',
            });
        };

        // Define hover-out animation
        const handleMouseLeave = () => {
            gsap.to(switchBody, {
                scale: 1, // Return to original size
                y: 0, // Return to original position
                duration: 0.25,
                ease: 'power2.inOut', // Different easing for a snappy return
            });
        };

        // Attach event listeners
        switchBody.addEventListener('mouseenter', handleMouseEnter);
        switchBody.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup function: remove event listeners when component unmounts
        return () => {
            switchBody.removeEventListener('mouseenter', handleMouseEnter);
            switchBody.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []); // Empty dependency array: run this effect only once on mount

    return (
        <div
            className="absolute top-6 right-8 z-50 flex flex-col items-center cursor-pointer select-none"
            onClick={toggle}
            // Dynamic title for accessibility and user feedback
            title={isOn ? 'Matikan lampu (Monochrome)' : 'Nyalakan lampu (Color Mode)'}
        >
            {/* Switch Body: The main container for the switch components */}
            <div
                ref={bodyRef}
                className="relative w-14 h-24 bg-gradient-to-br from-gray-950 to-gray-800 rounded-3xl shadow-xl border border-gray-700 flex flex-col items-center justify-end pb-4 transition-all duration-300"
            >
                {/* Lamp / Light Indicator */}
                <div
                    ref={lampRef}
                    className={`absolute top-3 w-8 h-8 rounded-full transition-all duration-300
                                ${isOn ? 'bg-yellow-300' : 'bg-gray-700/60'}`}
                    // Conditional filter for a more pronounced glow effect when on
                    style={{ filter: isOn ? 'drop-shadow(0 0 40px #fde68a) drop-shadow(0 0 100px #facc15)' : undefined }}
                />

                {/* Decorative Screws (more subtle and integrated) */}
                <div className="absolute left-3 top-3 w-1.5 h-1.5 bg-gray-600 rounded-full shadow-inner" />
                <div className="absolute right-3 top-3 w-1.5 h-1.5 bg-gray-600 rounded-full shadow-inner" />
                <div className="absolute left-3 bottom-6 w-1.5 h-1.5 bg-gray-600 rounded-full shadow-inner" />
                <div className="absolute right-3 bottom-6 w-1.5 h-1.5 bg-gray-600 rounded-full shadow-inner" />

                {/* Lever: The interactive part of the switch */}
                <div
                    ref={leverRef}
                    className="absolute left-1/2 bottom-7 -translate-x-1/2 w-3 h-14 bg-gradient-to-b from-gray-300 to-gray-600 rounded-full shadow-md origin-bottom transition-all duration-300 border border-gray-500"
                />

                {/* Switch Base / Bottom Plate */}
                <div className="absolute left-1/2 bottom-3 -translate-x-1/2 w-8 h-3 bg-gray-700 rounded-b-2xl shadow-inner border-t border-gray-600" />
            </div>

            {/* ON/OFF Text Indicator */}
            <span className="mt-3 text-sm text-gray-300 font-bold tracking-widest drop-shadow-lg uppercase">
                {isOn ? 'ON' : 'OFF'}
            </span>
        </div>
    );
}

export default SakelarLampuKlasik;