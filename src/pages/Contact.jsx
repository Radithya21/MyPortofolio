import { useEffect, useRef, useState } from 'react';
import { FaLinkedin, FaInstagram, FaYoutube, FaGithub, FaTiktok } from 'react-icons/fa';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import gsap from 'gsap';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';
import { EMAILJS_CONFIG } from '../config/emailjs';

const socials = [
    {
        icon: <FaLinkedin className="text-blue-500 text-2xl" />,
        label: "Let's Connect",
        sub: 'on LinkedIn',
        link: 'https://www.linkedin.com/in/dimas-radithya21/',
        class: 'col-span-2',
    },
    {
        icon: <FaInstagram className="text-pink-500 text-2xl" />,
        label: 'Instagram',
        sub: '@drn_2111',
        link: 'https://www.instagram.com/drn_2111/',
    },
    {
        icon: <FaGithub className="text-gray-300 text-2xl" />,
        label: 'Github',
        sub: 'Radithya21',
        link: 'https://github.com/Radithya21/',
    },

];

function Contact() {
    const rightCardRef = useRef(null);
    const socialRefs = useRef([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Floating particles
        const particles = document.querySelectorAll('.contact-particle');
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
        // Fade/slide in card
        if (rightCardRef.current) {
            gsap.fromTo(rightCardRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.2 });
        }
        // Social icon animation
        socialRefs.current.forEach((el, idx) => {
            if (el) {
                gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.4 + idx * 0.1, ease: 'power2.out' });
            }
        });

        // Initialize EmailJS
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Mohon lengkapi semua field!');
            return;
        }

        if (!formData.email.includes('@')) {
            toast.error('Email tidak valid!');
            return;
        }

        setIsSubmitting(true);

        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'dimasdrn21@gmail.com'
            };

            // Kirim email menggunakan EmailJS
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams,
                EMAILJS_CONFIG.PUBLIC_KEY // tambahkan public key di sini
            );

            toast.success('Pesan berhasil dikirim!');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });

        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Gagal mengirim pesan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center py-16 pb-32 w-full bg-gradient-to-br from-[#0F0C29] via-[#24243e] to-[#302b63] overflow-hidden">
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="contact-particle absolute w-1 h-1 bg-white/30 rounded-full"
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

            {/* Judul utama */}
            <div className="w-full flex items-center justify-center mb-12 mt-2">
                <h1 className="flex items-center gap-3 text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-violet-400 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-lg animate-fade-in-up">
                    <span className="inline-block w-2 h-8 md:h-10 rounded bg-gradient-to-b from-violet-400 to-fuchsia-400" />
                    Get In Touch
                </h1>
            </div>

            {/* Kontainer Utama Dua Kolom */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
                {/* Kolom Kiri: Connect With Me Card */}
                <div className="flex flex-col gap-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/15 shadow-xl animate-fade-in-up">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <span className="inline-block w-2 h-5 rounded bg-gradient-to-r from-violet-400 to-fuchsia-400 mr-2" />
                        Connect With Me
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {socials.map((s, i) => (
                            <a
                                key={i}
                                href={s.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                ref={el => (socialRefs.current[i] = el)}
                                className={`group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-md hover:shadow-violet-400/20 hover:border-violet-400/30 transition-all duration-300 hover:scale-[1.03] ${s.class || ''}`}
                            >
                                <span>{s.icon}</span>
                                <div className="flex flex-col">
                                    <span className="text-white font-semibold text-base group-hover:text-violet-400 transition">{s.label}</span>
                                    <span className="text-xs text-gray-300 group-hover:text-violet-300 transition">{s.sub}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                {/* Kolom Kanan: Formulir Kirim Pesan */}
                <div className="flex flex-col gap-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/15 shadow-xl animate-fade-in-up">
                    <h2 className="text-2xl font-semibold text-white mb-2">
                        Send a Message
                    </h2>
                    <form ref={rightCardRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            disabled={isSubmitting}
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            disabled={isSubmitting}
                        />
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Subject"
                            className="w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            disabled={isSubmitting}
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Message"
                            rows={6}
                            className="w-full px-5 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 resize-y"
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mt-4 w-full px-8 py-3 rounded-lg font-semibold text-lg uppercase tracking-wide shadow-2xl transition-all duration-300 transform backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2 ${isSubmitting
                                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white hover:scale-105 hover:-translate-y-1 hover:shadow-blue-500/25'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <FiSend className="text-lg" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact; 