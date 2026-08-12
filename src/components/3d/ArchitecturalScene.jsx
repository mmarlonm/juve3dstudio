import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ArchitecturalScene({ scrollProgress = 0 }) {
  const groupRef = useRef();

  // Pre-instantiate geometries for high performance execution
  const geometries = useMemo(() => {
    return {
      // 1. Plantilla (Concrete Pad Base under footing)
      plantilla: new THREE.BoxGeometry(1.6, 0.1, 1.6),
      
      // 2. Zapata Aislada (Base Slab & Pyramid)
      footingBase: new THREE.BoxGeometry(1.3, 0.25, 1.3),
      footingPyramid: new THREE.CylinderGeometry(0.55, 1.2, 0.4, 4),
      
      // 3. Pedestal
      pedestal: new THREE.BoxGeometry(0.6, 0.8, 0.6),
      
      // 4. Trabe de Liga (Vigas de Cimentación / Contratrabe)
      groundBeamX: new THREE.BoxGeometry(4.6, 0.35, 0.4),
      groundBeamZ: new THREE.BoxGeometry(0.4, 0.35, 4.6),

      // 5. Columnas
      column: new THREE.BoxGeometry(0.42, 3.2, 0.42),
      columnEdge: new THREE.EdgesGeometry(new THREE.BoxGeometry(0.44, 3.22, 0.44)),

      // 6. Vigas Superiores
      topBeamX: new THREE.BoxGeometry(4.6, 0.35, 0.4),
      topBeamZ: new THREE.BoxGeometry(0.4, 0.35, 4.6),

      // 7. Muros de Recubrimiento / Block
      wallBack: new THREE.BoxGeometry(4.2, 3.2, 0.22),
      wallSide: new THREE.BoxGeometry(0.22, 3.2, 4.2),
      wallFrontLeft: new THREE.BoxGeometry(1.6, 3.2, 0.22),
      wallFrontRight: new THREE.BoxGeometry(1.6, 3.2, 0.22),

      // Roof Slab
      roofSlab: new THREE.BoxGeometry(5.0, 0.25, 5.0),
    };
  }, []);

  // Compute 8 stage thresholds for smooth progressive assembly
  const isWireframe = scrollProgress < 0.125;
  const stageZapata = scrollProgress >= 0.125;
  const stagePedestal = scrollProgress >= 0.250;
  const stageTrabeLiga = scrollProgress >= 0.375;
  const stageColumnas = scrollProgress >= 0.500;
  const stageVigasTop = scrollProgress >= 0.625;
  const stageEsqueleto = scrollProgress >= 0.750;
  const stageMuros = scrollProgress >= 0.875;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Orbit & tilt camera smooth interpolation
    const baseRotY = Math.PI * 0.2 + scrollProgress * Math.PI * 1.8;
    const baseRotX = 0.18 + Math.sin(scrollProgress * Math.PI) * 0.1;
    const basePosX = stageMuros ? -0.5 : 0;
    const basePosY = 0.45;

    // Mouse parallax
    const mouseTargetX = state.mouse.x * 0.25;
    const mouseTargetY = state.mouse.y * 0.15;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, baseRotY + mouseTargetX, 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, baseRotX - mouseTargetY, 0.08);
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, basePosX, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, basePosY, 0.08);
  });

  const cornerPositions = [
    [-2.1, -2.1],
    [2.1, -2.1],
    [-2.1, 2.1],
    [2.1, 2.1]
  ];

  return (
    <group ref={groupRef} position={[0, 0.45, 0]} scale={[0.82, 0.82, 0.82]}>
      
      {/* Grid Ground */}
      <gridHelper args={[40, 40, '#71717A', '#3F3F46']} position={[0, -2.4, 0]} />

      {/* Brighter Lighting for Light Grey Architectural Tones */}
      <ambientLight intensity={0.95} />
      <directionalLight position={[12, 16, 12]} intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[-10, 10, -10]} intensity={0.6} color="#E4E4E7" />
      
      {stageMuros && (
        <pointLight position={[0, 0.6, 0]} intensity={4.5} color="#F59E0B" distance={10} />
      )}

      {/* 3D Model Assembly Steps */}
      <group>

        {/* 1. PLANTILLA & ZAPATAS AISLADAS (Corner Foundations) */}
        {cornerPositions.map(([x, z], idx) => (
          <group key={`footing-${idx}`} position={[x, -2.25, z]}>
            {/* Plantilla Base (Light Grey) */}
            <mesh position={[0, -0.15, 0]} geometry={geometries.plantilla}>
              <meshStandardMaterial color={isWireframe ? "#A1A1AA" : "#94949E"} wireframe={isWireframe} roughness={0.3} />
            </mesh>

            {/* Zapata Base & Pyramid (Stage 2+) */}
            {stageZapata && (
              <>
                <mesh geometry={geometries.footingBase}>
                  <meshStandardMaterial color={isWireframe ? "#E4E4E7" : "#B8B8C2"} wireframe={isWireframe} roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.32, 0]} rotation={[0, Math.PI / 4, 0]} geometry={geometries.footingPyramid}>
                  <meshStandardMaterial color={isWireframe ? "#F4F4F5" : "#A3A3AD"} wireframe={isWireframe} roughness={0.3} />
                </mesh>
              </>
            )}

            {/* Pedestal (Stage 3+) (Lighter Concrete Grey) */}
            {stagePedestal && (
              <mesh position={[0, 0.75, 0]} geometry={geometries.pedestal}>
                <meshStandardMaterial color="#A3A3AD" metalness={0.4} roughness={0.2} wireframe={isWireframe} />
              </mesh>
            )}
          </group>
        ))}

        {/* 4. TRABE DE LIGA / CONTRATRABE (Stage 4+) */}
        {stageTrabeLiga && (
          <group position={[0, -1.3, 0]}>
            <mesh position={[0, 0, -2.1]} geometry={geometries.groundBeamX}>
              <meshStandardMaterial color="#8E8E98" metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, 2.1]} geometry={geometries.groundBeamX}>
              <meshStandardMaterial color="#8E8E98" metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[-2.1, 0, 0]} geometry={geometries.groundBeamZ}>
              <meshStandardMaterial color="#8E8E98" metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[2.1, 0, 0]} geometry={geometries.groundBeamZ}>
              <meshStandardMaterial color="#8E8E98" metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        )}

        {/* 5. COLUMNAS (Stage 5+) (Lighter Grey Architectural Concrete) */}
        {stageColumnas && cornerPositions.map(([x, z], idx) => (
          <group key={`col-${idx}`} position={[x, 0.45, z]}>
            <mesh geometry={geometries.column}>
              <meshStandardMaterial color={idx % 2 === 0 ? "#C4C4CE" : "#A3A3AD"} metalness={0.4} roughness={0.2} />
            </mesh>
            <lineSegments geometry={geometries.columnEdge}>
              <lineBasicMaterial color="#FFFFFF" linewidth={1.5} />
            </lineSegments>
          </group>
        ))}

        {/* 6. VIGAS SUPERIORES (Stage 6+) */}
        {stageVigasTop && (
          <group position={[0, 2.2, 0]}>
            <mesh position={[0, 0, -2.1]} geometry={geometries.topBeamX}>
              <meshStandardMaterial color="#8E8E98" metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, 2.1]} geometry={geometries.topBeamX}>
              <meshStandardMaterial color="#8E8E98" metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[-2.1, 0, 0]} geometry={geometries.topBeamZ}>
              <meshStandardMaterial color="#8E8E98" metalness={0.5} roughness={0.3} />
            </mesh>
            <mesh position={[2.1, 0, 0]} geometry={geometries.topBeamZ}>
              <meshStandardMaterial color="#8E8E98" metalness={0.5} roughness={0.3} />
            </mesh>
          </group>
        )}

        {/* 8. MUROS DE BLOCK Y LOSA (Stage 8+) */}
        {stageMuros && (
          <group position={[0, 0.45, 0]}>
            {/* Back Wall */}
            <mesh position={[0, 0, -2.0]} geometry={geometries.wallBack}>
              <meshStandardMaterial color="#71717A" roughness={0.5} />
            </mesh>
            {/* Left Wall */}
            <mesh position={[-2.0, 0, 0]} geometry={geometries.wallSide}>
              <meshStandardMaterial color="#71717A" roughness={0.5} />
            </mesh>
            {/* Right Wall */}
            <mesh position={[2.0, 0, 0]} geometry={geometries.wallSide}>
              <meshStandardMaterial color="#71717A" roughness={0.5} />
            </mesh>
            {/* Front Wall */}
            <mesh position={[-1.3, 0, 2.0]} geometry={geometries.wallFrontLeft}>
              <meshStandardMaterial color="#71717A" roughness={0.5} />
            </mesh>
            <mesh position={[1.3, 0, 2.0]} geometry={geometries.wallFrontRight}>
              <meshStandardMaterial color="#71717A" roughness={0.5} />
            </mesh>
            {/* Roof Slab (Very light grey slab) */}
            <mesh position={[0, 2.0, 0]} geometry={geometries.roofSlab}>
              <meshStandardMaterial color="#D4D4D8" roughness={0.3} metalness={0.5} />
            </mesh>
          </group>
        )}

      </group>

    </group>
  );
}
