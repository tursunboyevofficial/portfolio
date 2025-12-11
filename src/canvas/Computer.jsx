import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, Float } from '@react-three/drei';

// 3D Geometrik Computer/Tech Model
const TechModel = () => {
  const meshRef = useRef();
  const ringRef = useRef();
  const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 768);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speedMultiplier = isMobileRef.current ? 0.3 : 1; // Mobileda 70% sekinlash
    
    // X o'qi bo'ylab aylanish
    meshRef.current.rotation.x = t * 0.08 * speedMultiplier;
    // Y o'qi bo'ylab aylanish
    meshRef.current.rotation.y = t * 0.15 * speedMultiplier;
    // Z o'qi bo'ylab aylanish
    meshRef.current.rotation.z = t * 0.05 * speedMultiplier;
    
    // Ring animatsiyasi - X va Y o'qi
    ringRef.current.rotation.x = Math.sin(t * 0.2 * speedMultiplier) * 0.2;
    ringRef.current.rotation.y = t * 0.25 * speedMultiplier;
    ringRef.current.rotation.z = t * 0.2 * speedMultiplier;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.3}>
      <group>
        {/* Main Icosahedron */}
        <mesh ref={meshRef} scale={1.5}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#915eff"
            wireframe
            emissive="#915eff"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Orbiting Ring */}
        <mesh ref={ringRef} scale={2.2}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#00cea8"
            emissive="#00cea8"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Inner Sphere */}
        <mesh scale={0.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#f272c8"
            emissive="#f272c8"
            emissiveIntensity={0.6}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Floating Particles - reduced for performance */}
        {[...Array(10)].map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </group>
    </Float>
  );
};

const FloatingParticle = ({ index }) => {
  const meshRef = useRef();
  const radius = 2.5 + Math.random() * 1;
  const baseSpeed = 0.02 + Math.random() * 0.03;
  const offset = (index / 10) * Math.PI * 2;
  const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 768);

  useFrame((state) => {
    // Mobileda juda sekinroq - gyroscope ta'sirini kamaytirish uchun
    const speedMultiplier = isMobileRef.current ? 0.3 : 1; // 70% sekinlash
    const speed = baseSpeed * speedMultiplier;
    const t = state.clock.getElapsedTime() * speed + offset;
    meshRef.current.position.x = Math.sin(t) * radius;
    meshRef.current.position.z = Math.cos(t) * radius;
    meshRef.current.position.y = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <mesh ref={meshRef} scale={0.05 + Math.random() * 0.05}>
      <octahedronGeometry args={[1]} />
      <meshStandardMaterial
        color={index % 2 === 0 ? "#915eff" : "#00cea8"}
        emissive={index % 2 === 0 ? "#915eff" : "#00cea8"}
        emissiveIntensity={1}
      />
    </mesh>
  );
};

const Loader = () => (
  <mesh>
    <sphereGeometry args={[0.5, 16, 16]} />
    <meshStandardMaterial color="#915eff" wireframe />
  </mesh>
);

const ComputerCanvas = () => {
  return (
    <Canvas
      frameloop='always'
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#915eff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00cea8" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          color="#ffffff"
        />
        <TechModel />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
          autoRotate={true}
          autoRotateSpeed={3}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
