import { useMemo } from 'react';
import { Shape, Vector2 } from 'three';

function outline(points) {
  const shape = new Shape();
  points.forEach(([x, y], index) => index ? shape.lineTo(x, y) : shape.moveTo(x, y));
  shape.closePath();
  return shape;
}

const wing = outline([[0.21, 0.09], [0.09, 0.25], [-0.31, 0.96], [-0.48, 1.03], [-0.56, 0.98], [-0.29, 0.15]]);
const wingAccent = outline([[-0.27, 0.17], [-0.39, 0.56], [-0.53, 0.96], [-0.48, 1.0], [-0.25, 0.41]]);
const tailplane = outline([[-0.71, 0.07], [-0.84, 0.17], [-1.04, 0.47], [-1.13, 0.47], [-1.08, 0.06]]);
const fin = outline([[-0.76, 0.08], [-1.05, 0.56], [-1.17, 0.59], [-1.11, 0.08]]);
const profile = [
  [-1.19, 0], [-1.16, 0.045], [-1.05, 0.09], [-0.84, 0.115],
  [-0.61, 0.125], [0.57, 0.125], [0.78, 0.12], [0.92, 0.105],
  [1.04, 0.065], [1.13, 0.017], [1.14, 0],
].map(([axis, radius]) => new Vector2(radius, axis));

function Wing({ side }) {
  return <group scale={[1, side, 1]}>
    <mesh position={[0, 0, -0.035]} castShadow receiveShadow>
      <extrudeGeometry args={[wing, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.01, bevelSegments: 2 }]} />
      <meshStandardMaterial color="#f6f9fd" metalness={0.22} roughness={0.42} />
    </mesh>
    <mesh position={[0, 0, 0.022]}>
      <shapeGeometry args={[wingAccent]} />
      <meshBasicMaterial color="#d5e2f1" />
    </mesh>
    <mesh position={[-0.5, 0.99, 0.09]} rotation={[-0.2, -0.12, -0.25]}>
      <boxGeometry args={[0.12, 0.04, 0.25]} />
      <meshStandardMaterial color="#203e80" metalness={0.08} roughness={0.5} />
    </mesh>
    <mesh position={[-0.5, 0.99, 0.225]}>
      <boxGeometry args={[0.045, 0.045, 0.035]} />
      <meshBasicMaterial color={side === 1 ? '#56ee9b' : '#ff6b62'} />
    </mesh>
  </group>;
}

function Engine({ side }) {
  return <group position={[-0.04, side * 0.48, -0.11]}>
    <mesh rotation={[0, 0, -Math.PI / 2]} castShadow>
      <cylinderGeometry args={[0.093, 0.07, 0.39, 24]} />
      <meshStandardMaterial color="#f5f8fc" metalness={0.36} roughness={0.35} />
    </mesh>
    <mesh position={[0.205, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
      <torusGeometry args={[0.076, 0.014, 8, 24]} />
      <meshStandardMaterial color="#c2d0e0" metalness={0.5} roughness={0.3} />
    </mesh>
    <mesh position={[0.207, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      <circleGeometry args={[0.068, 24]} />
      <meshStandardMaterial color="#1d355b" metalness={0.4} roughness={0.46} />
    </mesh>
    <mesh position={[-0.025, 0, 0.115]}>
      <boxGeometry args={[0.22, 0.045, 0.075]} />
      <meshStandardMaterial color="#dae4ee" />
    </mesh>
  </group>;
}

export default function Airliner() {
  const windows = useMemo(() => Array.from({ length: 17 }, (_, index) => -0.71 + index * 0.087), []);
  return <group scale={0.72} rotation={[0.12, -0.12, 0]}>
    <group position={[0, 0, 0.02]}>
      <mesh rotation={[0, 0, -Math.PI / 2]} castShadow receiveShadow>
        <latheGeometry args={[profile, 40]} />
        <meshStandardMaterial color="#f9fbfe" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[-0.2, 0, 0.127]}>
        <boxGeometry args={[0.88, 0.014, 0.008]} />
        <meshBasicMaterial color="#29559f" />
      </mesh>
      {[-1, 1].flatMap((side) => windows.map((x, index) => <mesh key={`${side}-${index}`} position={[x, side * 0.113, 0.038]} scale={[1, 0.6, 0.72]}>
        <sphereGeometry args={[0.019, 10, 8]} />
        <meshBasicMaterial color="#153963" />
      </mesh>))}
      {[-1, 1].map((side) => <group key={side}>
        <mesh position={[0.97, side * 0.073, 0.065]} rotation={[0, 0, side * -0.32]} scale={[1.4, 0.75, 0.3]}>
          <sphereGeometry args={[0.055, 12, 8]} />
          <meshStandardMaterial color="#193e6c" metalness={0.35} roughness={0.3} />
        </mesh>
        <mesh position={[0.68, side * 0.119, 0.025]}><boxGeometry args={[0.012, 0.006, 0.075]} /><meshBasicMaterial color="#9aabc0" /></mesh>
        <mesh position={[-0.78, side * 0.113, 0.025]}><boxGeometry args={[0.012, 0.006, 0.075]} /><meshBasicMaterial color="#9aabc0" /></mesh>
        <Wing side={side} />
        <Engine side={side} />
        <group scale={[1, side, 1]}>
          <mesh position={[0, 0, -0.018]} castShadow><extrudeGeometry args={[tailplane, { depth: 0.03, bevelEnabled: false }]} /><meshStandardMaterial color="#eaf1f9" metalness={0.18} roughness={0.48} /></mesh>
        </group>
      </group>)}
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <extrudeGeometry args={[fin, { depth: 0.04, bevelEnabled: false }]} />
        <meshStandardMaterial color="#244688" metalness={0.16} roughness={0.5} />
      </mesh>
      <mesh position={[-1.025, 0, 0.36]}><boxGeometry args={[0.055, 0.048, 0.12]} /><meshBasicMaterial color="#d8f55a" /></mesh>
    </group>
  </group>;
}
