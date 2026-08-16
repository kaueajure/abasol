"use client";

import { useEffect, useRef, useState } from "react";
import { solarStory } from "../../content";
import { SolarPanel3D } from "../SolarPanel3D";

export function SolarStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current; const stage = stageRef.current;
    if (!section || !stage) return;
    const simplified = matchMedia("(max-width: 760px), (prefers-reduced-motion: reduce)");
    if (simplified.matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const range = Math.max(1, section.offsetHeight - innerHeight);
      const progress = Math.max(0, Math.min(.999, -rect.top / range));
      const index = Math.min(solarStory.length - 1, Math.floor(progress * solarStory.length));
      progressRef.current = progress;
      stage.style.setProperty("--story-progress", progress.toFixed(3));
      setActive(current => current === index ? current : index);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); addEventListener("scroll", queue, { passive: true }); addEventListener("resize", queue);
    return () => { removeEventListener("scroll", queue); removeEventListener("resize", queue); cancelAnimationFrame(frame); };
  }, []);

  return <section className="solar-story" ref={sectionRef} aria-labelledby="solar-story-title"><div className={`solar-story__stage story-state-${active}`} ref={stageRef}><div className="solar-story__header shell"><p className="label">Do módulo ao imóvel</p><p>Role para acompanhar o sistema</p></div><div className="solar-story__copy" aria-live="polite"><span>0{active + 1} / 05 · {solarStory[active].label}</span><h2 id="solar-story-title">{solarStory[active].title}</h2><p>{solarStory[active].text}</p></div><div className="solar-story__object" aria-hidden="true"><SolarPanel3D progressRef={progressRef} /><div className="energy-path"><i /><i /><i /><span>CC</span><b>Inversor</b><strong>Imóvel</strong></div></div><div className="solar-story__meter" aria-hidden="true"><i /><span>Instalação</span><span>Monitoramento</span></div></div><div className="solar-story__mobile shell">{solarStory.map((item, index) => <article key={item.label}><span>0{index + 1}</span><div><p className="label">{item.label}</p><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></section>;
}
