import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ArchitecturalStructure({ wireframeOnly = false }) {
  const groupRef = useRef();
  const floatingElementsRef = useRef();

  // Pre-create and memoize geometries once to prevent GC memory churn & re-instantiations
  const geometries = useMemo(() => {
    return {
      foundation: new THREE.BoxGeometry(6, 0.2, 6),
      column: new THREE.BoxGeometry(0.3, 4.6, 0.3),
      columnEdge: new THREE.EdgesGeometry(new THREE.BoxGeometry(0.32, 4.62, 0.32)),
      beamX: new THREE.BoxGeometry(5.5, 0.25, 0.3),
      beamZ: new THREE.BoxGeometry(0.3, 0.25, 5.5),
      roof: new THREE.BoxGeometry(6, 0.15, 6),
      glassWall: new THREE.PlaneGeometry(5, 4.2),
      innerCubeEdges: new THREE.EdgesGeometry(new THREE.BoxGeometry(2.2, 2.2, 2.2)),
      innerIcosaEdges: new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.2, 0)),
    };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth lerp for mouse rotation without triggering React re-renders
    const targetX = state.mouse.x * 0.35;
    const targetY = state.mouse.y * 0.25;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.06);

    // Read window.scrollY directly inside render frame loop (0 React overhead)
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const scrollFactor = currentScrollY * 0.0006;

    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, scrollFactor, 0.04);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, currentScrollY * 0.0008 - 0.2, 0.04);

    // Continuous subtle inner element rotation
    if (floatingElementsRef.current) {
      floatingElementsRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[1.1, 1.1, 1.1]}>
      {/* Base Grid Wireframe Ground */}
      <gridHelper 
        args={[30, 30, '#52525B', '#27272A']} 
        position={[0, -2.5, 0]} 
      />

      {/* Main Architectural Pavilion Structure */}
      <group position={[0, 0, 0]}>
        {/* Foundation Slab */}
        <mesh position={[0, -2.4, 0]} geometry={geometries.foundation}>
          <meshStandardMaterial 
            color="#18181B" 
            roughness={0.3} 
            metalness={0.7}
            wireframe={wireframeOnly} 
          />
        </mesh>

        {/* 4 Structural Corner Columns */}
        {[
          [-2.6, 0, -2.6],
          [2.6, 0, -2.6],
          [-2.6, 0, 2.6],
          [2.6, 0, 2.6]
        ].map((pos, idx) => (
          <group key={idx} position={pos}>
            <mesh geometry={geometries.column}>
              <meshStandardMaterial 
                color={idx % 2 === 0 ? "#3F3F46" : "#27272A"} 
                metalness={0.8} 
                roughness={0.2}
                wireframe={wireframeOnly} 
              />
            </mesh>
            <lineSegments geometry={geometries.columnEdge}>
              <lineBasicMaterial color="#71717A" linewidth={1} />
            </lineSegments>
          </group>
        ))}

        {/* Top Horizontal Beams / Ring */}
        <group position={[0, 2.2, 0]}>
          <mesh position={[0, 0, -2.6]} geometry={geometries.beamX}>
            <meshStandardMaterial color="#52525B" metalness={0.7} wireframe={wireframeOnly} />
          </mesh>
          <mesh position={[0, 0, 2.6]} geometry={geometries.beamX}>
            <meshStandardMaterial color="#52525B" metalness={0.7} wireframe={wireframeOnly} />
          </mesh>
          <mesh position={[-2.6, 0, 0]} geometry={geometries.beamZ}>
            <meshStandardMaterial color="#52525B" metalness={0.7} wireframe={wireframeOnly} />
          </mesh>
          <mesh position={[2.6, 0, 0]} geometry={geometries.beamZ}>
            <meshStandardMaterial color="#52525B" metalness={0.7} wireframe={wireframeOnly} />
          </mesh>
        </group>

        {/* Roof Slab */}
        <mesh position={[0, 2.4, 0]} geometry={geometries.roof}>
          <meshStandardMaterial 
            color="#27272A" 
            roughness={0.4} 
            metalness={0.6}
            wireframe={wireframeOnly} 
          />
        </mesh>

        {/* Translucent Glass Wall Accents - Lightweight Standard Material */}
        {!wireframeOnly && (
          <>
            <mesh position={[0, 0, -2.5]} geometry={geometries.glassWall}>
              <meshStandardMaterial 
                color="#A1A1AA"
                opacity={0.25}
                transparent={true}
                roughness={0.1}
                metalness={0.5}
              />
            </mesh>
            <mesh position={[-2.5, 0, 0]} rotation={[0, Math.PI / 2, 0]} geometry={geometries.glassWall}>
              <meshStandardMaterial 
                color="#71717A"
                opacity={0.2}
                transparent={true}
                roughness={0.1}
                metalness={0.5}
              />
            </mesh>
          </>
        )}

        {/* Inner Abstract Floating Parametric Wireframe Cube */}
        <group ref={floatingElementsRef} position={[0, 0, 0]}>
          <lineSegments geometry={geometries.innerCubeEdges}>
            <lineBasicMaterial color="#E4E4E7" linewidth={1.5} />
          </lineSegments>
          
          <lineSegments rotation={[Math.PI / 4, Math.PI / 4, 0]} geometry={geometries.innerIcosaEdges}>
            <lineBasicMaterial color="#71717A" linewidth={1} />
          </lineSegments>

          {/* Core Light */}
          <pointLight position={[0, 0, 0]} intensity={1.8} distance={5} color="#FFFFFF" />
        </group>
      </group>
    </group>
  );
}

