import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useRouter } from '../context/RouterContext';
import { Box } from 'lucide-react';

export interface Scrub3DViewerProps {
  modelPath?: string;
  className?: string;
}

export default function Scrub3DViewer({
  modelPath = '/medical scrubs 3d model.glb',
  className = '',
}: Scrub3DViewerProps) {
  const { navigate } = useRouter();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup - Positioned so full model fits comfortably
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const isSmall = width < 640;
    camera.position.set(0, isSmall ? -0.05 : 0, isSmall ? 4.4 : 3.8);

    // 3. Renderer setup - Seamless background blending
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.appendChild(renderer.domElement);

    // 4. Pure Neutral White & Navy Blue Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    // Key Light - Pure White Directional Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    // Fill Light - Soft Daylight Blue
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 2.5);
    fillLight.position.set(-5, 2, -2);
    scene.add(fillLight);

    // Rim Light - Crisp Sky Blue Backlight
    const rimLight = new THREE.PointLight(0x38bdf8, 5, 20);
    rimLight.position.set(3, 4, -3);
    scene.add(rimLight);

    // Bottom Soft Navy Bounce Light
    const bounceLight = new THREE.DirectionalLight(0x1e3a8a, 1.4);
    bounceLight.position.set(0, -5, 2);
    scene.add(bounceLight);

    // 5. GLTF Loader
    let model: THREE.Object3D | null = null;
    const loader = new GLTFLoader();

    loader.load(
      modelPath,
      (gltf) => {
        model = gltf.scene;

        // Auto center & scale model slightly smaller so it never crops
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.2 / (maxDim || 1);
        model.scale.set(scale, scale, scale);

        // Center model position
        model.position.x = -center.x * scale + 0.1;
        model.position.y = -center.y * scale - 0.05;
        model.position.z = -center.z * scale;

        // Enforce fabric texture quality & dark navy scrub color
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.envMapIntensity = 1.2;
              mat.roughness = 0.6;
              mat.metalness = 0.05;
            }
          }
        });

        scene.add(model);
        setLoading(false);
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setProgress(percent);
        }
      },
      (error) => {
        console.error('Error loading 3D scrub model:', error);
        setLoading(false);
      }
    );

    // Smooth Cursor Tracking
    let targetRotationY = 0;
    let targetRotationX = 0;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotationY = x * 0.45;
      targetRotationX = y * 0.25;
    };

    window.addEventListener('mousemove', handleWindowMouseMove);

    const handleWindowTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        targetRotationY = x * 0.5;
        targetRotationX = y * 0.25;
      }
    };
    window.addEventListener('touchmove', handleWindowTouchMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      const small = w < 640;
      camera.position.set(0, small ? -0.05 : 0, small ? 4.4 : 3.8);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Intersection Observer (smooth 60fps, zero GPU lag off-screen)
    let animationFrameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(animate);
      }
    }, { threshold: 0.05 });

    observer.observe(container);

    const animate = () => {
      if (!isVisible) return;
      animationFrameId = requestAnimationFrame(animate);

      if (model) {
        model.rotation.y += (targetRotationY - model.rotation.y) * 0.06;
        model.rotation.x += (-targetRotationX - model.rotation.x) * 0.06;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('touchmove', handleWindowTouchMove);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  return (
    <div
      onClick={() => navigate('/model-3d')}
      className={`relative w-full h-full min-h-[260px] xs:min-h-[300px] sm:min-h-[420px] lg:min-h-[500px] flex items-center justify-center cursor-pointer group ${className}`}
    >
      {/* Background Lighting Radial Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="h-[220px] w-[220px] sm:h-[380px] sm:w-[380px] rounded-full bg-gradient-to-r from-[#184E59]/25 via-[#0D2D34]/20 to-transparent blur-3xl transition-transform group-hover:scale-110 duration-500" />
      </div>

      {/* Loading Progress Indicator */}
      {loading && (
        <div className="relative z-20 flex flex-col items-center gap-2 text-slate-300 mx-auto">
          <div className="h-8 w-8 sm:h-10 sm:w-10 animate-spin rounded-full border-4 border-[#38A7B8]/20 border-t-[#38A7B8]" />
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#38A7B8]">
            Loading 3D Model {progress > 0 ? `(${progress}%)` : ''}
          </p>
        </div>
      )}

      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none" />

      {/* Bottom Overlay Badge attached to the bottom of the 3D image */}
      <div className="absolute bottom-1.5 sm:bottom-2 z-20 px-4 py-1.5 sm:px-6 sm:py-2.5 bg-[#081E26]/90 group-hover:bg-[#38A7B8] text-[#38A7B8] group-hover:text-[#041117] border border-[#38A7B8]/40 rounded-xl text-[10px] sm:text-xs font-extrabold uppercase tracking-widest backdrop-blur-md shadow-2xl transition-all duration-300 flex items-center gap-1.5 sm:gap-2 group-hover:scale-105">
        <Box size={14} className="text-[#38A7B8] group-hover:text-[#041117] animate-pulse" />
        <span>3D View</span>
      </div>
    </div>
  );
}
