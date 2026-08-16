"use client";

import { useEffect, useRef } from "react";

export function SolarPanel3D({ progressRef }: { progressRef: { current: number } }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let animationFrame = 0;
    let visible = true;

    const setup = async () => {
      const THREE = await import("../lib/three-solar");
      if (cancelled || !mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      mount.appendChild(renderer.domElement);

      const panel = new THREE.Group();
      panel.rotation.x = -.22;
      panel.rotation.z = -.025;
      scene.add(panel);

      const aluminum = new THREE.MeshStandardMaterial({ color: 0xd9ddd9, metalness: .82, roughness: .2 });
      const aluminumDark = new THREE.MeshStandardMaterial({ color: 0x727874, metalness: .72, roughness: .3 });
      const backsheetMaterial = new THREE.MeshStandardMaterial({ color: 0xc8cbc6, metalness: .16, roughness: .58 });
      const junctionMaterial = new THREE.MeshStandardMaterial({ color: 0x171b1a, metalness: .12, roughness: .48 });
      const cableMaterial = new THREE.MeshStandardMaterial({ color: 0x090b0b, metalness: .05, roughness: .7 });

      const addBox = (width: number, height: number, depth: number, material: InstanceType<typeof THREE.MeshStandardMaterial>, x = 0, y = 0, z = 0) => {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth, 2, 2, 2), material);
        mesh.position.set(x, y, z);
        panel.add(mesh);
        return mesh;
      };

      addBox(5.84, .16, .3, aluminum, 0, 1.62, 0);
      addBox(5.84, .16, .3, aluminum, 0, -1.62, 0);
      addBox(.16, 3.08, .3, aluminum, -2.84, 0, 0);
      addBox(.16, 3.08, .3, aluminum, 2.84, 0, 0);
      addBox(5.52, 3.04, .11, backsheetMaterial, 0, 0, -.085);

      const textureCanvas = document.createElement("canvas");
      textureCanvas.width = 1400;
      textureCanvas.height = 780;
      const context = textureCanvas.getContext("2d");
      if (!context) return;
      const columns = 10;
      const rows = 6;
      const cellWidth = textureCanvas.width / columns;
      const cellHeight = textureCanvas.height / rows;
      context.fillStyle = "#d8dcda";
      context.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const x = column * cellWidth + 4;
          const y = row * cellHeight + 4;
          const gradient = context.createLinearGradient(x, y, x + cellWidth, y + cellHeight);
          gradient.addColorStop(0, "#123f61");
          gradient.addColorStop(.42, "#082943");
          gradient.addColorStop(.72, "#164d70");
          gradient.addColorStop(1, "#061d31");
          context.fillStyle = gradient;
          context.fillRect(x, y, cellWidth - 8, cellHeight - 8);
          context.strokeStyle = "rgba(190,224,241,.22)";
          context.lineWidth = 1;
          for (let busbar = 1; busbar < 6; busbar += 1) {
            const lineX = x + (cellWidth - 8) * busbar / 6;
            context.beginPath();
            context.moveTo(lineX, y);
            context.lineTo(lineX, y + cellHeight - 8);
            context.stroke();
          }
          context.strokeStyle = "rgba(255,255,255,.08)";
          context.beginPath();
          context.moveTo(x, y + (cellHeight - 8) * .54);
          context.lineTo(x + cellWidth - 8, y + (cellHeight - 8) * .54);
          context.stroke();
        }
      }

      const cellTexture = new THREE.CanvasTexture(textureCanvas);
      cellTexture.colorSpace = THREE.SRGBColorSpace;
      cellTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      const cellMaterial = new THREE.MeshPhysicalMaterial({ map: cellTexture, metalness: .24, roughness: .24, clearcoat: .82, clearcoatRoughness: .12 });
      const cellSurface = new THREE.Mesh(new THREE.BoxGeometry(5.48, 3, .045), cellMaterial);
      cellSurface.position.z = .085;
      panel.add(cellSurface);

      const glassMaterial = new THREE.MeshPhysicalMaterial({ color: 0xb8d7e8, transparent: true, opacity: .13, roughness: .06, metalness: .04, clearcoat: 1, clearcoatRoughness: .03, side: THREE.DoubleSide });
      const glass = new THREE.Mesh(new THREE.PlaneGeometry(5.48, 3), glassMaterial);
      glass.position.z = .116;
      panel.add(glass);

      addBox(.12, 2.6, .14, aluminumDark, -1.75, 0, -.205);
      addBox(.12, 2.6, .14, aluminumDark, 1.75, 0, -.205);
      addBox(4.35, .1, .13, aluminumDark, 0, .82, -.205);
      addBox(4.35, .1, .13, aluminumDark, 0, -.82, -.205);
      addBox(.76, .48, .2, junctionMaterial, 0, .08, -.265);

      const connectorGeometry = new THREE.CylinderGeometry(.065, .065, .22, 12);
      for (const x of [-.22, .22]) {
        const connector = new THREE.Mesh(connectorGeometry, junctionMaterial);
        connector.rotation.x = Math.PI / 2;
        connector.position.set(x, -.23, -.29);
        panel.add(connector);
      }

      const createCable = (startX: number, endX: number) => {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(startX, -.28, -.31),
          new THREE.Vector3(startX * 1.25, -.72, -.34),
          new THREE.Vector3(endX * .72, -1.05, -.31),
          new THREE.Vector3(endX, -1.22, -.24),
        ]);
        const cable = new THREE.Mesh(new THREE.TubeGeometry(curve, 28, .035, 8, false), cableMaterial);
        panel.add(cable);
      };
      createCable(-.22, -.92);
      createCable(.22, .92);

      const screwGeometry = new THREE.CylinderGeometry(.038, .038, .025, 12);
      const screwMaterial = new THREE.MeshStandardMaterial({ color: 0xdfe3df, metalness: .9, roughness: .2 });
      for (const x of [-2.55, 2.55]) {
        for (const y of [-1.38, 1.38]) {
          const screw = new THREE.Mesh(screwGeometry, screwMaterial);
          screw.rotation.x = Math.PI / 2;
          screw.position.set(x, y, -.235);
          panel.add(screw);
        }
      }

      scene.add(new THREE.HemisphereLight(0xd8efff, 0x18201e, 1.6));
      const keyLight = new THREE.DirectionalLight(0xffffff, 3.3);
      keyLight.position.set(4.5, 5.5, 7);
      scene.add(keyLight);
      const rimLight = new THREE.PointLight(0x79bfe8, 18, 18, 2);
      rimLight.position.set(-5, 1.5, 4);
      scene.add(rimLight);
      const warmLight = new THREE.PointLight(0xffe27b, 14, 16, 2);
      warmLight.position.set(5, -3, 4);
      scene.add(warmLight);

      let baseScale = .9;
      let baseX = 1.05;
      let baseY = .2;
      const resize = () => {
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.position.set(0, 0, width < 760 ? 14 : 10.6);
        camera.updateProjectionMatrix();
        baseScale = width < 760 ? .66 : .9;
        baseX = width < 760 ? .25 : 1.05;
        baseY = width < 760 ? 1.45 : .2;
        panel.scale.setScalar(baseScale);
        panel.position.set(baseX, baseY, 0);
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { rootMargin: "180px" });
      visibilityObserver.observe(mount);

      let currentRotation = -.3;
      let currentScale = baseScale;
      let currentX = baseX;
      let currentY = baseY;
      const render = () => {
        animationFrame = window.requestAnimationFrame(render);
        if (!visible) return;
        const progress = Math.max(0, Math.min(1, progressRef.current));
        const targetRotation = -.3 + progress * .72;
        const closeUp = Math.sin(Math.min(1, progress * 1.7) * Math.PI);
        const targetScale = baseScale * (1 + closeUp * .17 - Math.max(0, progress - .76) * .22);
        const targetX = baseX + Math.max(0, progress - .46) * .7;
        const targetY = baseY + Math.sin(progress * Math.PI) * .12;
        currentRotation += (targetRotation - currentRotation) * .12;
        currentScale += (targetScale - currentScale) * .1;
        currentX += (targetX - currentX) * .1;
        currentY += (targetY - currentY) * .1;
        panel.rotation.y = currentRotation;
        panel.rotation.x = -.22 + Math.sin(progress * Math.PI) * .13;
        panel.scale.setScalar(currentScale);
        panel.position.set(currentX, currentY, 0);
        keyLight.intensity = 2.6 + Math.sin(progress * Math.PI) * 1.8;
        warmLight.intensity = 8 + progress * 10;
        renderer.render(scene, camera);
      };
      renderer.render(scene, camera);
      mount.classList.add("is-ready");
      render();

      return () => {
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        window.cancelAnimationFrame(animationFrame);
        scene.traverse(object => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach(material => material.dispose());
          }
        });
        cellTexture.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    let dispose: (() => void) | undefined;
    let started = false;
    const loadObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      loadObserver.disconnect();
      setup().then(cleanup => { dispose = cleanup; }).catch(() => mount.dataset.webgl = "unavailable");
    });
    loadObserver.observe(mount);
    return () => {
      cancelled = true;
      loadObserver.disconnect();
      window.cancelAnimationFrame(animationFrame);
      dispose?.();
    };
  }, [progressRef]);

  return (
    <div className="story-panel-3d" ref={mountRef}>
      <div className="story-panel-fallback" aria-hidden="true">
        <div className="story-cells">{Array.from({ length: 60 }).map((_, index) => <i key={index} />)}</div>
      </div>
    </div>
  );
}
