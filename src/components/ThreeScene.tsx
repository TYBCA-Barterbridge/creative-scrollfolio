
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useTexture } from "@react-three/drei";

function Particles({ count = 1000, mouse }) {
  const mesh = useRef();
  const light = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const dummy = useRef(new THREE.Object3D());
  // Generate some random positions, speed factors and timings
  const particles = useRef();
  const [positions] = useState(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      );
    }
    return new Float32Array(positions);
  });

  useFrame(() => {
    if (light.current) {
      light.current.position.x = mouse.current[0] / aspect * 5;
      light.current.position.y = -mouse.current[1] / aspect * 5;
    }

    if (particles.current) {
      let i = 0;
      for (let x = 0; x < count; x++) {
        const id = i++;
        dummy.current.position.set(
          positions[id * 3],
          positions[id * 3 + 1],
          positions[id * 3 + 2]
        );

        // Add subtle motion
        const t = Date.now() * 0.001;
        dummy.current.position.x += Math.sin(t + x) * 0.01;
        dummy.current.position.y += Math.cos(t + x) * 0.01;
        dummy.current.position.z += Math.sin(t + x) * 0.01;

        dummy.current.updateMatrix();
        mesh.current.setMatrixAt(x, dummy.current.matrix);
      }
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={10} intensity={8} color="#8B5CF6" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#8B5CF6" />
      </instancedMesh>
    </>
  );
}

function Scene({ scrollProgress }) {
  const mouse = useRef([0, 0]);
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current = [
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      ];
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={60} />
      <Particles count={500} mouse={mouse} />
      <mesh position={[0, 0, -5]} rotation={[0, scrollProgress * Math.PI * 2, 0]}>
        <torusGeometry args={[3, 1, 16, 100]} />
        <meshStandardMaterial color="#0EA5E9" wireframe={true} />
      </mesh>
    </>
  );
}

const ThreeScene = ({ scrollProgress = 0 }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
