"use client";

import { useEffect, useState } from "react";

type Project = {
  title: string;
  category: string;
  services: string;
  clips: number[];
  accent?: string;
};

const featuredProjects: Project[] = [
  { title: "MOUSSY", category: "品牌创意视频", services: "剪辑 · 视效 · 调色 · 声音设计", clips: [1], accent: "01" },
  { title: "PIKOLIONSL", category: "产品短片", services: "剪辑 · 视效 · 调色 · 声音设计", clips: [2], accent: "02" },
  { title: "劲霸男装 × 蜉蝣美术馆", category: "2.0 创意短片", services: "剪辑 · 视效 · 调色 · 声音设计", clips: [5], accent: "05" },
  { title: "始祖鸟 ARC'TERYX", category: "山地课堂〈夜间抱石〉", services: "剪辑 · 视效 · 调色 · 声音设计", clips: [3], accent: "03" },
  { title: "劲霸男装", category: "2024 春夏大片", services: "剪辑 · 调色", clips: [4], accent: "04" },
  { title: "一叶子", category: "溯源 TVC", services: "剪辑 · 视效 · 调色 · 声音设计", clips: [6], accent: "06" },
  { title: "可口可乐 × 奥利奥", category: "上海活动片", services: "剪辑 · 视效 · 调色 · 声音设计", clips: [7], accent: "07" },
];

const moreProjects: Project[] = [
  { title: "CARE OF LORD", category: "品牌产品片", services: "剪辑 · 调色", clips: [8] },
  { title: "73HOURS", category: "品牌产品片", services: "剪辑 · 调色", clips: [9] },
  { title: "AIR PEACE", category: "品牌产品片", services: "剪辑 · 调色", clips: [10, 11] },
  { title: "GXG", category: "品牌产品片", services: "剪辑 · 调色", clips: [12] },
  { title: "KENT&CURWEN", category: "品牌产品片", services: "剪辑 · 调色", clips: [13] },
  { title: "NICE RICE", category: "品牌产品片", services: "剪辑 · 调色", clips: [14, 15] },
];

const aiProjects: Project[] = [
  { title: "吉利雷达", category: "AI 品牌产品片", services: "AI 视觉 · 剪辑 · 调色", clips: [16, 17] },
  { title: "蔚来汽车", category: "AI 预热片", services: "AI 视觉 · 剪辑 · 调色", clips: [18] },
  { title: "PERSONAL / ZARA", category: "个人 AI 影像实验", services: "AI 视觉 · 剪辑 · 声音设计", clips: [19, 20] },
];

const portraitClips = new Set([1, 2, 5, 8, 9, 12, 13, 14, 15]);
const clipAspectRatios: Record<number, string> = {
  1: "9 / 16", 2: "3 / 4", 3: "16 / 9", 4: "1280 / 614", 5: "9 / 16",
  6: "16 / 9", 7: "16 / 9", 8: "9 / 16", 9: "9 / 16", 10: "4 / 3",
  11: "4 / 3", 12: "3 / 4", 13: "3 / 4", 14: "3 / 4", 15: "3 / 4",
  16: "16 / 9", 17: "16 / 9", 18: "16 / 9", 19: "4 / 3", 20: "16 / 9",
};

function ProjectCard({ project, index, compact = false, onOpen }: { project: Project; index: number; compact?: boolean; onOpen: (project: Project, clip: number) => void }) {
  const layoutClass = project.clips.length > 1 ? "multi-project" : portraitClips.has(project.clips[0]) ? "portrait-card" : "landscape-card";
  return (
    <article className={`project-card ${layoutClass} ${compact ? "compact" : ""}`}>
      <div className={`project-media-grid ${project.clips.length > 1 ? "multi" : "single"}`}>
        {project.clips.map((clip, clipIndex) => (
          <button
            className={`project-clip ${portraitClips.has(clip) ? "portrait" : "landscape"}`}
            key={clip}
            type="button"
            style={{ aspectRatio: clipAspectRatios[clip] }}
            onClick={() => onOpen(project, clip)}
            aria-label={`播放 ${project.title} 影片 ${clipIndex + 1}`}
          >
            <img src={`/media/posters/media${clip}.jpg`} alt={`${project.title} 影片 ${clipIndex + 1} 画面`} loading="lazy" />
            <span className="play-mark" aria-hidden="true"><span />PLAY</span>
            {project.clips.length > 1 && <span className="film-label">FILM {String(clipIndex + 1).padStart(2, "0")}</span>}
          </button>
        ))}
        <span className="project-index">{project.accent ?? String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="project-copy">
        <div><strong>{project.title}</strong><small>{project.category}</small></div>
        <div className="project-services">{project.services}</div>
      </div>
    </article>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeClip, setActiveClip] = useState<number | null>(null);
  const [videoStatus, setVideoStatus] = useState<"loading" | "ready" | "error">("loading");

  const openProject = (project: Project, clip: number) => {
    setVideoStatus("loading");
    setActiveProject(project);
    setActiveClip(clip);
  };

  const closeProject = () => {
    setActiveProject(null);
    setActiveClip(null);
    setVideoStatus("loading");
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && closeProject();
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top">游满江<span>YU MANJIANG</span></a>
        <nav aria-label="主导航">
          <a href="#work">WORK</a>
          <a href="#about">ABOUT</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-portrait"><img src="/media/site/portrait.jpg" alt="剪辑师游满江" /></div>
        <div className="hero-copy">
          <p className="eyebrow">COMMERCIAL FILM EDITOR / SHANGHAI</p>
          <h1>游满江</h1>
          <div className="hero-role"><span>EDITOR</span><span>AI VISUAL</span><span>COLOR</span><span>SOUND</span></div>
          <p className="hero-intro">00 后资深商业剪辑师，5 年全流程后期经验。为品牌影像建立节奏、情绪与记忆点。</p>
          <div className="hero-actions">
            <a className="primary-link" href="#work">查看作品 <span>↓</span></a>
            <a className="text-link" href="mailto:2212741311@qq.com">发送合作邀请</a>
          </div>
        </div>
        <div className="hero-meta"><span>2026</span><span>PERSONAL RESUME</span><span>BASE / 上海</span></div>
      </section>

      <section className="brand-ribbon" aria-label="服务过的品牌">
        <div><span>ARC'TERYX</span><span>COCA-COLA</span><span>NETA</span><span>PANASONIC</span><span>ONE LEAF</span><span>K-BOXING</span><span>MAC</span><span>HEINEKEN</span><span>GXG</span></div>
      </section>

      <section className="intro-section" id="about">
        <div className="section-label">01 / PROFILE</div>
        <div className="intro-statement">
          <h2>不只是素材的执行者，<br />而是可靠的创作伙伴。</h2>
          <p>擅长产品 TVC、宣传片、活动纪实、创意视频与短视频。提供从剪辑、调色、音频处理到包装出片的一站式服务，让每个项目都在准确传达中保留自己的视觉性格。</p>
        </div>
        <div className="metrics">
          <div><strong>5</strong><span>YEARS<br />EXPERIENCE</span></div>
          <div><strong>20+</strong><span>SELECTED<br />FILMS</span></div>
          <div><strong>360°</strong><span>POST<br />PRODUCTION</span></div>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div className="section-label">02 / SELECTED WORK</div>
          <h2>精选商业案例</h2>
          <p>每条影片均可直接点击播放</p>
        </div>
        <div className="featured-grid">
          {featuredProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} onOpen={openProject} />)}
        </div>
      </section>

      <section className="archive-section">
        <div className="section-heading archive-heading">
          <div className="section-label">03 / MORE WORK</div>
          <h2>更多品牌影像</h2>
        </div>
        <div className="archive-grid">
          {moreProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index + featuredProjects.length} compact onOpen={openProject} />)}
        </div>
      </section>

      <section className="ai-section">
        <div className="ai-copy">
          <div className="section-label">04 / AI FILM</div>
          <h2>AI 是镜头语言的新变量，<br />不是取代故事。</h2>
          <p>熟练运用 LibTV、Shotlab、TapNow、Lovart 等开源大模型，结合 Midjourney、Nano Banana Pro、GPT Image、Seedance、可灵、MiniMax 与 Suno，完成从画面生成到音画成片的创作流程。</p>
          <img src="/media/site/ai-workflow.jpg" alt="AI 汽车影像工作流程" loading="lazy" />
        </div>
        <div className="ai-projects">
          {aiProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} compact onOpen={openProject} />)}
        </div>
      </section>

      <section className="capability-section">
        <div className="section-label">05 / CAPABILITIES</div>
        <h2>从粗剪到出片，<br />保持同一条创意线。</h2>
        <div className="capability-list">
          <div><span>01</span><strong>EDITING</strong><small>叙事结构 · 节奏设计 · 精剪</small></div>
          <div><span>02</span><strong>COLOR</strong><small>影调设计 · 色彩管理 · 调色</small></div>
          <div><span>03</span><strong>VFX</strong><small>视觉包装 · 合成 · 动态设计</small></div>
          <div><span>04</span><strong>SOUND</strong><small>声音设计 · 混音 · 音乐节奏</small></div>
          <div><span>05</span><strong>AI VISUAL</strong><small>概念视觉 · 生成式影像 · AI 工作流</small></div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-top"><span>06 / CONTACT</span><span>AVAILABLE FOR SELECTED PROJECTS</span></div>
        <h2>LET'S MAKE<br />SOMETHING <em>MOVE.</em></h2>
        <div className="contact-links">
          <a href="tel:13781206193"><small>PHONE / WECHAT</small>137 8120 6193</a>
          <a href="mailto:2212741311@qq.com"><small>EMAIL</small>2212741311@qq.com</a>
          <span><small>BASE</small>SHANGHAI, CHINA</span>
        </div>
        <div className="footer-bottom"><strong>游满江</strong><span>© 2026 PERSONAL PORTFOLIO</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

      {activeProject && activeClip && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={`${activeProject.title} 视频播放器`} onMouseDown={(event) => event.target === event.currentTarget && closeProject()}>
          <button className="modal-close" type="button" onClick={closeProject} aria-label="关闭视频">CLOSE ×</button>
          <div className={`modal-content ${portraitClips.has(activeClip) ? "portrait-modal" : ""}`}>
            <div className="modal-heading"><span>{activeProject.category}</span><h2>{activeProject.title}</h2><p>{activeProject.services}</p></div>
            <div className="modal-player">
              <video
                key={activeClip}
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={`/media/posters/media${activeClip}.jpg`}
                onCanPlay={() => setVideoStatus("ready")}
                onPlay={() => setVideoStatus("ready")}
                onWaiting={() => setVideoStatus("loading")}
                onError={() => setVideoStatus("error")}
              >
                <source src={`/media/videos/media${activeClip}.mp4`} type="video/mp4" />
              </video>
              {videoStatus === "loading" && <span className="video-feedback" aria-live="polite">影片加载中…</span>}
              {videoStatus === "error" && <a className="video-feedback error" href={`/media/videos/media${activeClip}.mp4`} target="_blank" rel="noreferrer">加载失败，点击单独打开影片</a>}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
