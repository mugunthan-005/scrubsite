import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ArrowLeft, RotateCw, Maximize2, Sliders } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import SideRays from '../components/SideRays';

export default function Model3D() {
  const { navigate } = useRouter();
  const mountRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showSpecs, setShowSpecs] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup - Positioned so model is centered and never gets clipped by borders
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0.4, 0, 4.2);

    // 3. Renderer setup - Seamless transparent WebGL canvas
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.appendChild(renderer.domElement);

    // 4. OrbitControls setup with zoom boundaries
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;
    controls.minDistance = 2.2;
    controls.maxDistance = 8.0;
    controlsRef.current = controls;

    // 5. Professional Studio Lighting (Clean, No Color Casts)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 2.2);
    fillLight.position.set(-5, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0x38bdf8, 4.5, 20);
    rimLight.position.set(3, 4, -3);
    scene.add(rimLight);

    // 6. GLTF Loader
    let model: THREE.Object3D | null = null;
    const loader = new GLTFLoader();

    loader.load(
      '/medical scrubs 3d model.glb',
      (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        // Scale model to fit full canvas without overflow
        const scale = 2.6 / (maxDim || 1);
        model.scale.set(scale, scale, scale);

        model.position.x = -center.x * scale;
        model.position.y = -center.y * scale;
        model.position.z = -center.z * scale;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.6;
              mat.metalness = 0.08;
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
      (err) => {
        console.error('Failed to load 3D GLTF model:', err);
        setLoading(false);
      }
    );

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Toggle Auto-rotate
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative min-h-[92vh] bg-[#040D1A] text-white flex flex-col overflow-hidden">
      {/* Background Volumetric Lighting - Blends 100% seamlessly into page */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <SideRays
          speed={1.8}
          rayColor1="#0DA39C"
          rayColor2="#38BDF8"
          intensity={1.5}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.2}
          blend={0.7}
          falloff={1.5}
          opacity={0.6}
        />
      </div>

      {/* Top Controls Header Bar */}
      <div className="relative z-20 container-px py-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSpecs((v) => !v)}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Sliders size={14} /> Specs Panel {showSpecs ? 'Hide' : 'Show'}
          </button>
          <button
            onClick={() => setAutoRotate((v) => !v)}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
              autoRotate
                ? 'bg-teal-600 text-white border-teal-500 shadow-md'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
          >
            <RotateCw size={14} className={autoRotate ? 'animate-spin' : ''} />
            Auto-Rotate 360° {autoRotate ? 'ON' : 'OFF'}
          </button>
          <button
            onClick={resetView}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Maximize2 size={14} /> Reset View
          </button>
        </div>
      </div>

      {/* Main Full-Width Studio Canvas */}
      <div className="relative z-10 flex-1 w-full min-h-[78vh] flex items-center justify-center">
        {/* Soft Studio Radial Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <div className="h-[480px] w-[480px] sm:h-[650px] sm:w-[650px] rounded-full bg-gradient-to-r from-sky-500/15 via-blue-600/10 to-indigo-500/5 blur-3xl" />
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="relative z-20 flex flex-col items-center gap-3 text-slate-300">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-500/20 border-t-sky-400" />
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
              Loading 3D Model {progress > 0 ? `(${progress}%)` : ''}
            </p>
          </div>
        )}

        {/* Floating Technical Specifications Card (Overlays without blocking 3D Model) */}
        {showSpecs && (
          <div className="absolute left-4 top-4 lg:left-8 lg:top-8 z-20 max-w-xs sm:max-w-sm w-full bg-slate-900/70 border border-slate-800/80 p-5 shadow-2xl backdrop-blur-xl animate-fade-in">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <h1 className="font-display text-base font-bold uppercase tracking-wider text-white">
                ZYNEX Medical Scrub Set
              </h1>
              <button
                onClick={() => setShowSpecs(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
              Drag anywhere to rotate 360° across all axes. Scroll to zoom.
            </p>

            <div className="mt-4 space-y-2 text-[11px] font-medium">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400 uppercase tracking-wider">Fabric Sample</span>
                <span className="text-teal-300 font-bold">Sample A</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400 uppercase tracking-wider">Material Blend</span>
                <span className="text-white font-bold">92% Poly / 8% Spandex</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400 uppercase tracking-wider">Fabric Weight</span>
                <span className="text-white font-bold">200 - 220 GSM</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400 uppercase tracking-wider">Fabric Type</span>
                <span className="text-white font-bold">Knitted Performance Fabric</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-400 uppercase tracking-wider">Color Finish</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0B192C] ring-1 ring-white/50" />
                  Navy Blue (#0B192C)
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Antimicrobial', 'Fluid Repellent', '4-Way Stretch', 'Wrinkle-Free'].map((finish) => (
                <span key={finish} className="px-2 py-0.5 bg-slate-800/80 text-teal-300 border border-slate-700/70 text-[9px] uppercase font-bold tracking-wider">
                  {finish}
                </span>
              ))}
            </div>

            <button
              onClick={() => navigate('/shop')}
              className="btn-primary mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-widest text-[11px] py-3 shadow-lg border-0 transition-all cursor-pointer"
            >
              Shop This Scrub Set
            </button>
          </div>
        )}

        {/* 100% Full-Width 3D Canvas Mount Point (Zero Border Blocking) */}
        <div ref={mountRef} className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing" />
      </div>
    </div>
  );
}
