import SideRays from '../components/SideRays';
import Particles from '../components/Particles';
import FuzzyText from '../components/FuzzyText';

export default function Account() {
  return (
    <div className="relative min-h-[90vh] bg-[#040D1A] text-white overflow-hidden flex flex-col items-center justify-center py-20 px-4 text-center">
      {/* Dynamic WebGL SideRays & Particles Animation Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
        <SideRays
          speed={2.2}
          rayColor1="#0DA39C"
          rayColor2="#38BDF8"
          intensity={1.8}
          spread={2}
          origin="top-right"
          tilt={5}
          saturation={1.4}
          blend={0.7}
          falloff={1.5}
          opacity={0.85}
        />
        <div className="absolute inset-0">
          <Particles
            particleColors={["#2DD4BF", "#38BDF8", "#5EEAD4"]}
            particleCount={200}
            particleSpread={12}
            speed={0.12}
            particleBaseSize={110}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
      </div>

      {/* FuzzyText Animation Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.6}
          enableHover={true}
          gradient={["#2DD4BF", "#38BDF8", "#5EEAD4"]}
          fontSize="clamp(2.5rem, 8vw, 7rem)"
          fontWeight={900}
          fuzzRange={25}
          clickEffect={true}
        >
          COMING SOON
        </FuzzyText>
        <p className="mt-4 text-sm sm:text-base text-slate-300 font-medium tracking-wide max-w-md drop-shadow-md">
          ZYNEX Clinical Member Portal & Orders Experience
        </p>
      </div>
    </div>
  );
}
