import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const educationData = [
  {
    title: 'SD Dinamika Umat',
    address: 'Bogor, Jawa Barat',
    year: '2010 - 2016',
    desc: 'Learned the fundamentals of reading, writing, arithmetic, and character building in a disciplined Islamic elementary school environment.',
    color: 'from-emerald-400 to-teal-500',
    website: 'https://dinamikaumat.com'
  },
  {
    title: 'SMP Al-Hidayah',
    address: 'Bogor, Jawa Barat',
    year: '2016 - 2019',
    desc: 'Expanded general knowledge, developed an early interest in technology, and actively participated in school organizational activities.',
    color: 'from-blue-400 to-indigo-500',
    website: 'https://sekolahalhidayah.com'
  },
  {
    title: 'SMA MBS Yogyakarta',
    address: 'Sleman, Yogyakarta',
    year: '2019 - 2023',
    desc: 'Focused on natural sciences while studying in a boarding school with a strong Islamic and academic foundation. Engaged in various extracurricular activities and personal development programs.',
    color: 'from-purple-400 to-violet-500',
    website: 'https://mbs.sch.id'
  },
  {
    title: 'Universitas Andalas',
    address: 'Padang, Sumatera Barat',
    year: '2023 - Present',
    desc: 'Pursuing a degree in Information Systems with a focus on technology, system development, and digital solutions to real-world problems. Actively involved in personal projects and exploring emerging technologies such as Web3 and AI.',
    color: 'from-pink-400 to-rose-500',
    website: 'https://www.unand.ac.id'
  },
];

const workData = [
  {
    title: 'Fullstack Developer Intern',
    company: 'Bank Nagari',
    year: '2024',
    desc: 'Contributed to internal system development within the IT Division. Focused on adding features, improving functionality, and learning best practices in a professional fullstack environment.',
    color: 'from-indigo-500 to-blue-600'
  },
  {
    title: 'Director of Project',
    company: 'SRE Universitas Andalas',
    year: '2024',
    desc: 'Led project management efforts within the student organization, overseeing planning, execution, and collaboration across multiple initiatives in tech and event development.',
    color: 'from-green-400 to-emerald-500'
  }
];

function MyJourney() {
  const timelineRef = useRef(null);
  const dotRef = useRef(null);
  const lineRef = useRef(null);
  const entryRefs = useRef([]);
  const entryAnimRefs = useRef([]);
  const workRefs = useRef([]);
  const [dotY, setDotY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Enhanced floating particles with smoother animation
  useEffect(() => {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, idx) => {
      gsap.to(particle, {
        y: 'random(-80, 80)',
        x: 'random(-40, 40)',
        rotation: 'random(-90, 90)',
        duration: 'random(4, 8)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: idx * 0.3
      });
    });
  }, []);

  // Initial animations
  useEffect(() => {
    // Title animation
    gsap.fromTo('.journey-title',
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.7)' }
    );

    // Timeline entries stagger animation
    entryAnimRefs.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, scale: 0.8, rotationX: -15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 0.8,
            delay: 0.2 * idx,
            ease: 'back.out(1.7)'
          }
        );
      }
    });

    // Work cards animation
    workRefs.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, rotationY: -20 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            delay: 1.5 + (idx * 0.2),
            ease: 'back.out(1.7)'
          }
        );
      }
    });
  }, []);

  // Scroll-based dot animation
  useEffect(() => {
    // Inisialisasi quickTo untuk dot dan line
    let quickToDot = null;
    let quickToLine = null;

    function updateDotPosition() {
      if (!timelineRef.current || !dotRef.current || !lineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;

      let minDist = Infinity;
      let closestTop = 0;
      let closestIndex = 0;

      entryRefs.current.forEach((ref, idx) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const entryCenter = rect.top + rect.height / 2;
        const dist = Math.abs(entryCenter - viewportCenter);

        if (dist < minDist) {
          minDist = dist;
          closestTop = entryCenter;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);

      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      let newDotY = closestTop - timelineTop;
      newDotY = Math.max(0, Math.min(newDotY, timelineHeight));

      // Smooth animasi dengan quickTo
      if (!quickToDot) {
        quickToDot = gsap.quickTo(dotRef.current, "top", { duration: 1.0, ease: "power2.out" });
      }
      if (!quickToLine) {
        quickToLine = gsap.quickTo(lineRef.current, "height", { duration: 1.0, ease: "power2.out" });
      }
      quickToDot(newDotY);
      quickToLine(Math.max(newDotY, 20));

      setDotY(newDotY);
    }

    updateDotPosition();
    window.addEventListener('scroll', updateDotPosition);
    window.addEventListener('resize', updateDotPosition);

    return () => {
      window.removeEventListener('scroll', updateDotPosition);
      window.removeEventListener('resize', updateDotPosition);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-16 w-full overflow-hidden">
      {/* Subtle animated background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced gradient orbs with subtle movement */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <h2 className="journey-title text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-pink-300 text-center mb-16 drop-shadow-2xl">
        My Journey
      </h2>

      <div className="relative flex flex-col gap-20 w-full max-w-5xl mx-auto min-h-[400px] z-10">
        {/* Enhanced Timeline */}
        <div ref={timelineRef} className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 z-0 pointer-events-none" style={{ minHeight: 140 * educationData.length + 40 }}>
          {/* Animated line with gradient */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 w-2 bg-gradient-to-b from-emerald-400 via-blue-400 via-purple-400 to-pink-400 opacity-90 shadow-2xl"
            style={{
              height: Math.max(dotY, 20),
              top: 0,
              borderRadius: 9999,
              boxShadow: '0 0 40px 8px rgba(139,92,246,0.4), 0 0 80px 16px rgba(139,92,246,0.2)'
            }}
          />

          {/* Enhanced glowing dot */}
          <div
            ref={dotRef}
            className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${educationData[activeIndex]?.color || 'from-violet-400 to-purple-500'} border-4 border-white/30 z-10`}
            style={{
              top: dotY,
              boxShadow: '0 0 60px 20px rgba(139,92,246,0.4), 0 0 120px 40px rgba(139,92,246,0.2), inset 0 0 20px rgba(255,255,255,0.3)'
            }}
          >
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          </div>
        </div>

        {/* Enhanced Education Timeline */}
        {educationData.map((edu, idx) => (
          <div
            key={idx}
            ref={el => (entryRefs.current[idx] = el)}
            className="relative flex w-full min-h-[140px] group"
          >
            {/* Left side */}
            <div className={`flex-1 flex flex-col ${idx % 2 === 0 ? 'items-end pr-8' : 'items-end pr-8 justify-center'}`}>
              <div
                ref={el => (entryAnimRefs.current[idx * 2] = el)}
                className={`transform transition-all duration-500 group-hover:scale-105 ${activeIndex === idx ? 'scale-105' : ''}`}
              >
                {idx % 2 === 0 ? (
                  // Kiri: kotak judul (link jika ada website)
                  edu.website ? (
                    <a
                      href={edu.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-right bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 hover:border-purple-400/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      tabIndex={0}
                    >
                      <div className="flex items-center justify-end mb-3">
                        <span className="text-xl md:text-2xl font-bold text-white mr-3 group-hover:text-emerald-300 transition-colors duration-200">{edu.title}</span>
                        <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">{edu.emoji}</span>
                      </div>
                      <div className="text-purple-300 text-base mb-3 font-semibold">{edu.address}</div>
                      <div className="text-gray-300 text-sm font-medium px-4 py-2 bg-gradient-to-r from-white/15 to-white/10 rounded-full inline-block backdrop-blur-sm">{edu.year}</div>
                    </a>
                  ) : (
                    <div className="text-right bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 hover:border-purple-400/30 transition-all duration-500 hover:scale-[1.02]">
                      <div className="flex items-center justify-end mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white mr-3">{edu.title}</h3>
                        <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">{edu.emoji}</span>
                      </div>
                      <div className="text-purple-300 text-base mb-3 font-semibold">{edu.address}</div>
                      <div className="text-gray-300 text-sm font-medium px-4 py-2 bg-gradient-to-r from-white/15 to-white/10 rounded-full inline-block backdrop-blur-sm">{edu.year}</div>
                    </div>
                  )
                ) : (
                  // Kanan: kotak deskripsi (selalu <div>)
                  <div className="text-gray-300 text-base max-w-sm bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-xl p-5 border border-white/15 shadow-xl hover:shadow-emerald-500/20 hover:border-emerald-400/25 transition-all duration-500 hover:scale-[1.02]">
                    {edu.desc}
                  </div>
                )}
              </div>
            </div>

            {/* Spacer */}
            <div style={{ width: 80 }} />

            {/* Right side */}
            <div className={`flex-1 flex flex-col ${idx % 2 === 0 ? 'items-start pl-8 justify-center' : 'items-start pl-8'}`}>
              <div
                ref={el => (entryAnimRefs.current[idx * 2 + 1] = el)}
                className={`transform transition-all duration-500 group-hover:scale-105 ${activeIndex === idx ? 'scale-105' : ''}`}
              >
                {idx % 2 === 0 ? (
                  // Kiri: kotak deskripsi (selalu <div>)
                  <div className="text-gray-300 text-base max-w-sm bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-xl p-5 border border-white/15 shadow-xl hover:shadow-emerald-500/20 hover:border-emerald-400/25 transition-all duration-500 hover:scale-[1.02]">
                    {edu.desc}
                  </div>
                ) : (
                  // Kanan: kotak judul (link jika ada website)
                  edu.website ? (
                    <a
                      href={edu.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 hover:border-purple-400/30 transition-all duration-500 hover:scale-[1.02] cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-300"
                      tabIndex={0}
                    >
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3 transform group-hover:scale-110 transition-transform duration-300">{edu.emoji}</span>
                        <span className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-200">{edu.title}</span>
                      </div>
                      <div className="text-purple-300 text-base mb-3 font-semibold">{edu.address}</div>
                      <div className="text-gray-300 text-sm font-medium px-4 py-2 bg-gradient-to-r from-white/15 to-white/10 rounded-full inline-block backdrop-blur-sm">{edu.year}</div>
                    </a>
                  ) : (
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 hover:border-purple-400/30 transition-all duration-500 hover:scale-[1.02]">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3 transform group-hover:scale-110 transition-transform duration-300">{edu.emoji}</span>
                        <h3 className="text-xl md:text-2xl font-bold text-white">{edu.title}</h3>
                      </div>
                      <div className="text-purple-300 text-base mb-3 font-semibold">{edu.address}</div>
                      <div className="text-gray-300 text-sm font-medium px-4 py-2 bg-gradient-to-r from-white/15 to-white/10 rounded-full inline-block backdrop-blur-sm">{edu.year}</div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Work Experience */}
      <div className="mt-24 w-full max-w-5xl z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-300 text-center mb-12">
          Experience
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {workData.map((work, idx) => (
            <div
              key={idx}
              ref={el => (workRefs.current[idx] = el)}
              className="group relative bg-gradient-to-br from-white/12 to-white/6 backdrop-blur-xl rounded-2xl p-8 border border-white/25 shadow-2xl hover:shadow-purple-500/30 hover:border-purple-400/40 transition-all duration-700 hover:scale-[1.03] hover:-translate-y-2"
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${work.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4 transform group-hover:scale-110 transition-transform duration-300">{work.icon}</span>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-1">{work.title}</h4>
                    <div className="text-purple-300 text-base font-semibold">{work.company}</div>
                  </div>
                </div>

                <div className="text-gray-300 text-sm font-medium px-4 py-2 bg-gradient-to-r from-white/15 to-white/10 rounded-full inline-block mb-4 backdrop-blur-sm">
                  {work.year}
                </div>

                <p className="text-gray-300 text-base leading-relaxed">{work.desc}</p>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyJourney;