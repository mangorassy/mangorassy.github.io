import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, Github, Twitter, ExternalLink, X, Send, 
  Code2, Cpu, Globe, Layout, Database, Smartphone,
  CheckCircle2, ArrowUpRight, Zap, Coffee, Terminal,
  User, MessageSquare, Info, Hourglass
} from 'lucide-react';

// --- Configuration / Data ---
const DATA = {
  profile: {
    name: "HIKARU IGARASHI",
    title: "Growth Marketer / Product Manager",
    tagline: "Bridging the gap between Data, Marketing, and Product.",
    description: "データ×マーケティング×プロダクト企画を組み合わせ、ユーザー体験を構築することに情熱を注いでいます。",
    longBio: "10X Inc.でCRMマーケターとして活動中。前職の令和トラベルではデジタルマーケター兼データアナリストとして、キャンペーンの企画推進やデータ分析を通じたプロダクト改善に従事していました。マーケティングの戦略立案から、SQLを用いたデータ抽出、ノーコードツールやフロントエンド技術を活用したプロトタイピングまで、一気通貫で「数字を作る」ための実行力を武器にしています。",
    social: {
      github: "https://github.com/mangorassy",
      x: "https://x.com",
      email: "your-email@example.com"
    }
  },
  skills: [
    { 
      name: "Marketing", 
      icon: <Layout size={20} />, 
      items: ["CRM Strategy", "SNS Marketing", "PMM", "User Acquisition"] 
    },
    { 
      name: "Creative", 
      icon: <Cpu size={20} />, 
      items: ["Figma", "Canva", "Webflow", "Framer", "Studio"] 
    },
    { 
      name: "Analytics", 
      icon: <Database size={20} />, 
      items: ["Google Analytics 4", "MySQL", "BigQuery", "Adjust"] 
    },
    { 
      name: "Engineering", 
      icon: <Zap size={20} />, 
      items: ["Python", "HTML5", "Google App Script", "React (Basic)"] 
    }
  ],
  experience: [
    { 
      year: '2025 - Present', 
      role: 'CRM Marketer', 
      company: '10X Inc.', 
      description: 'StailerにおけるCRM運用、およびLTV向上のための施策改善を担当。' 
    },
    { 
      year: '2024 - 2025', 
      role: 'Digital Marketer / Data Analyst', 
      company: 'ReiwaTravel Inc', 
      description: '海外旅行予約アプリ「NEWT」のマーケティング・分析業務。キャンペーンの企画推進や、SQLを用いたユーザー行動分析を担当。' 
    }
  ],
  projects: [
    { 
      id: 1,
      title: "Data Visualization Dashboard", 
      description: "ビジネス指標をリアルタイムで可視化するマーケティングダッシュボード。", 
      longDescription: "BigQueryと連携し、主要なKPIを自動集計・可視化。意思決定の迅速化に貢献しました。",
      tags: ['SQL', 'BigQuery', 'Looker'],
      link: "#",
      image: "Analytics Dashboard"
    },
    { 
      id: 2,
      title: "CRM Automation Flow", 
      description: "ユーザー行動に基づいた自動プッシュ通知・メール配信システムの構築。", 
      longDescription: "セグメントごとに最適化されたメッセージ配信フローを設計。継続率（Retention）の向上を実現しました。",
      tags: ['CRM', 'Automation', 'Marketing'],
      link: "#",
      image: "Flow Diagram"
    },
    { 
      id: 3,
      title: "Product Launch Strategy", 
      description: "新機能リリースにおけるPMMとしての市場投入戦略の立案。", 
      longDescription: "ユーザーインタビュー、競合分析に基づいたポジショニング設定から、プロモーションプランの実行までを統括。",
      tags: ['PMM', 'Strategy', 'Launch'],
      link: "#",
      image: "Strategy Canvas"
    }
  ],
  articles: [] // 記事データを空に設定（Coming Soon表示用）
};

// --- Background Component ---
const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const dots = [];
    const spacing = 40;
    
    const initDots = () => {
      dots.length = 0;
      for (let x = 0; x < canvas.width + spacing; x += spacing) {
        for (let y = 0; y < canvas.height + spacing; y += spacing) {
          dots.push({ x, y, originX: x, originY: y });
        }
      }
    };

    initDots();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(dot => {
        const dist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
        const maxDist = 120;
        
        if (dist < maxDist) {
          const angle = Math.atan2(dot.y - mouse.y, dot.x - mouse.x);
          const force = (maxDist - dist) / maxDist;
          dot.x += Math.cos(angle) * force * 5;
          dot.y += Math.sin(angle) * force * 5;
          ctx.fillStyle = `rgba(52, 211, 153, ${0.1 + force * 0.4})`;
        } else {
          dot.x += (dot.originX - dot.x) * 0.1;
          dot.y += (dot.originY - dot.y) * 0.1;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
};

// --- UI Components ---
const SectionTitle = ({ number, text }) => (
  <div className="flex items-center gap-4 mb-12 overflow-hidden">
    <span className="font-mono text-emerald-400 text-xs tracking-widest">{number}</span>
    <h2 className="text-xl font-light tracking-tight whitespace-nowrap">{text}</h2>
    <div className="h-[1px] w-full bg-white/10"></div>
  </div>
);

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-sm animate-in zoom-in-95 duration-300">
        <div className="sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center">
          <h3 className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase">{title}</h3>
          <button onClick={onClose} className="hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        setIsContactOpen(false);
        setFormStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <InteractiveBackground />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-8 ${scrolled ? 'py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5' : 'py-8'}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-emerald-400" />
            <span className="font-mono text-xs tracking-[0.3em] text-emerald-400 font-bold uppercase">{DATA.profile.name}.SYS</span>
          </div>
          <div className="flex gap-8 text-[10px] font-mono tracking-widest uppercase items-center">
            <a href="#skills" className="hover:text-emerald-400 transition-colors hidden sm:block">Skills</a>
            <a href="#about" className="hover:text-emerald-400 transition-colors hidden sm:block">About</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors hidden sm:block">Experience</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors hidden sm:block">Works</a>
            <button onClick={() => setIsContactOpen(true)} className="px-4 py-2 border border-emerald-400/30 hover:bg-emerald-400/10 transition-all rounded-sm">Contact</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <header className="h-[90vh] flex flex-col justify-center items-center px-6 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-7xl font-extralight tracking-tighter mb-6 text-white uppercase">
              {DATA.profile.name}<span className="text-emerald-400 font-normal">.</span>
            </h1>
            <p className="font-mono text-xs text-gray-500 tracking-[0.4em] uppercase mb-8">
              {DATA.profile.title}
            </p>
            <div className="w-12 h-[1px] bg-white/20 mx-auto mb-8"></div>
            <p className="max-w-md text-sm text-gray-400 leading-relaxed mx-auto font-light">
              {DATA.profile.description}
            </p>
            <div className="flex justify-center gap-6 mt-12 opacity-50">
               <a href={DATA.profile.social.github} target="_blank" className="hover:text-emerald-400 transition-colors"><Github size={20} /></a>
               <a href={DATA.profile.social.x} target="_blank" className="hover:text-emerald-400 transition-colors"><Twitter size={20} /></a>
               <a href={`mailto:${DATA.profile.social.email}`} className="hover:text-emerald-400 transition-colors"><Mail size={20} /></a>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 space-y-32 pb-32">
          
          {/* Skills Section */}
          <section id="skills" className="scroll-mt-32">
            <SectionTitle number="01" text="SKILLSET" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {DATA.skills.map((skill, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-3 text-emerald-400 border-b border-emerald-400/20 pb-2">
                    {skill.icon}
                    <h3 className="font-mono text-[10px] tracking-widest uppercase">{skill.name}</h3>
                  </div>
                  <ul className="space-y-3">
                    {skill.items.map((item, j) => (
                      <li key={j} className="text-sm text-gray-500 font-light flex items-center gap-2 group cursor-default">
                        <div className="w-1 h-1 bg-emerald-400/40 rounded-full group-hover:scale-150 group-hover:bg-emerald-400 transition-all"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="scroll-mt-32">
            <SectionTitle number="02" text="ABOUT ME" />
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="aspect-square bg-white/5 border border-white/10 rounded-sm flex items-center justify-center relative group">
                  <div className="absolute inset-0 bg-emerald-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Info size={40} className="text-white/20 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Base</p>
                  <p className="text-sm text-white font-light">Tokyo, Japan</p>
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <h3 className="text-2xl font-extralight text-white leading-tight">
                  Solving complex problems with <span className="text-emerald-400">Data & Empathy</span>.
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  {DATA.profile.longBio}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 border border-white/5 bg-white/[0.02]">
                    <p className="text-emerald-400 text-xl font-light mb-1">PMM / CRM</p>
                    <p className="text-[9px] font-mono text-gray-600 uppercase">Core Role</p>
                  </div>
                  <div className="p-4 border border-white/5 bg-white/[0.02]">
                    <p className="text-emerald-400 text-xl font-light mb-1">6+ years</p>
                    <p className="text-[9px] font-mono text-gray-600 uppercase">Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="scroll-mt-32">
            <SectionTitle number="03" text="EXPERIENCE" />
            <div className="space-y-12 pl-4 border-l border-white/5">
              {DATA.experience.map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-gray-800 border border-white/10 group-hover:bg-emerald-400 transition-colors"></div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                    <span className="font-mono text-[10px] text-emerald-400/60 uppercase">{item.year}</span>
                    <h3 className="text-lg text-white font-medium">{item.role}</h3>
                  </div>
                  <p className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-tight">{item.company}</p>
                  <p className="text-sm text-gray-400 leading-relaxed font-light max-w-2xl">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-mt-32">
            <SectionTitle number="04" text="SELECTED WORKS" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
              {DATA.projects.map((project, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedProject(project)}
                  className="group text-left bg-[#050505] p-10 hover:bg-white/[0.02] transition-colors relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                    <ArrowUpRight size={18} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl text-white font-light mb-4 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-8 font-light line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono text-gray-600 tracking-widest uppercase border border-white/10 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Articles Section */}
          <section id="articles" className="scroll-mt-32">
            <SectionTitle number="05" text="LATEST WRITINGS" />
            {DATA.articles.length > 0 ? (
              <div className="space-y-1">
                {DATA.articles.map((article, i) => (
                  <a key={i} href={article.url} target="_blank" className="group flex items-center justify-between py-6 border-b border-white/5 hover:px-4 transition-all duration-300">
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-[10px] text-gray-600 group-hover:text-emerald-400 transition-colors">{article.date}</span>
                      <h3 className="text-sm md:text-base font-light group-hover:translate-x-2 transition-transform">{article.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">{article.platform}</span>
                      <ExternalLink size={12} />
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="py-12 border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center group-hover:border-emerald-400/30 transition-colors">
                  <Hourglass size={18} className="text-gray-700 group-hover:text-emerald-400/50 transition-colors animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-mono text-emerald-400 tracking-[0.3em] uppercase mb-1">Coming Soon</p>
                  <p className="text-xs text-gray-600 font-light">New articles are currently being prepared.</p>
                </div>
              </div>
            )}
          </section>

          {/* Final Call */}
          <section className="pt-24 text-center">
             <div className="inline-block p-1 border border-white/5 rounded-full mb-8">
               <div className="px-4 py-1 bg-white/5 rounded-full text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                 Available for new opportunities
               </div>
             </div>
             <h2 className="text-4xl md:text-5xl font-extralight text-white mb-12 tracking-tighter">Ready to start?</h2>
             <button 
                onClick={() => setIsContactOpen(true)}
                className="group relative px-16 py-6 bg-white text-black font-mono text-[10px] uppercase tracking-[0.3em] overflow-hidden rounded-sm hover:bg-emerald-400 transition-colors"
             >
                <span className="relative z-10">Get in touch</span>
             </button>
          </section>
        </div>
      </main>

      <footer className="relative z-10 py-16 border-t border-white/5 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-mono text-[9px] text-gray-600 tracking-[0.5em] uppercase">
            &copy; 2025 {DATA.profile.name}. Handcrafted in Tokyo.
          </p>
          <div className="flex gap-6 text-gray-600">
             <a href={DATA.profile.social.github} className="hover:text-emerald-400 transition-colors"><Github size={16} /></a>
             <a href={DATA.profile.social.x} className="hover:text-emerald-400 transition-colors"><Twitter size={16} /></a>
          </div>
        </div>
      </footer>

      {/* --- Modals --- */}
      
      {/* Project Detail Modal */}
      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        title="Project Insight"
      >
        {selectedProject && (
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-extralight text-white tracking-tight">{selectedProject.title}</h2>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono border border-emerald-400/30 text-emerald-400 px-2 py-1 uppercase">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="aspect-video bg-white/5 flex flex-col items-center justify-center border border-white/10 rounded-sm">
              <Smartphone size={32} className="text-white/10 mb-2" />
              <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Preview: {selectedProject.image}</span>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Overview</h4>
              <p className="text-gray-400 leading-relaxed font-light text-sm">
                {selectedProject.longDescription}
              </p>
            </div>

            <div className="pt-6 flex gap-6 border-t border-white/5">
              <a 
                href={selectedProject.link} 
                target="_blank" 
                className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-400 hover:text-white transition-colors"
              >
                GitHub Repository <Github size={14} />
              </a>
              <button className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                Live Demo <ExternalLink size={14} />
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Contact Form Modal */}
      <Modal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
        title="Establish Connection"
      >
        {formStatus === 'success' ? (
          <div className="py-20 text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-400/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-light text-white">Transmission Received</h3>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">I will respond as soon as possible.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase text-gray-500 tracking-widest flex items-center gap-2">
                    <User size={12} /> Full Name
                  </label>
                  <input required className="w-full bg-white/5 border-b border-white/10 px-0 py-2 text-sm focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-gray-700" placeholder="Your Name" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-mono uppercase text-gray-500 tracking-widest flex items-center gap-2">
                    <Mail size={12} /> Email Address
                  </label>
                  <input required type="email" className="w-full bg-white/5 border-b border-white/10 px-0 py-2 text-sm focus:outline-none focus:border-emerald-400 transition-colors placeholder:text-gray-700" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-mono uppercase text-gray-500 tracking-widest flex items-center gap-2">
                  <MessageSquare size={12} /> Message Body
                </label>
                <textarea required rows={4} className="w-full bg-white/5 border-b border-white/10 px-0 py-2 text-sm focus:outline-none focus:border-emerald-400 transition-colors resize-none placeholder:text-gray-700" placeholder="Tell me about your project..."></textarea>
              </div>
            </div>
            <button 
              disabled={formStatus === 'sending'}
              type="submit" 
              className="group w-full py-5 border border-emerald-400/40 text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-emerald-400 hover:text-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {formStatus === 'sending' ? (
                <span className="animate-pulse">Transmitting...</span>
              ) : (
                <>Initiate Message <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
              )}
            </button>
          </form>
        )}
      </Modal>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&family=JetBrains+Mono:wght@300;400&display=swap');
        
        body { font-family: 'Inter', sans-serif; overflow-x: hidden; scroll-behavior: smooth; }
        .font-mono { font-family: 'JetBrains+Mono', monospace; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb:hover { background: #333; }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}} />
    </div>
  );
}
