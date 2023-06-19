import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, Shadow, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
import { Camera } from "three";

const Earth = () => {
  const house = useGLTF("./house/scene.gltf")
  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black"/>
      <pointLight intensity={9} />
      <spotLight
      position={[-20,50,10]}
      angle={0.92}
      penumbra={1}
      intensity={1}
      castShadow
      shadow-mapSize={1024}
      />
    <primitive 
    object={house.scene}
    scale={1}
    position-y={-11}
    rotation-y={0}
    />
    </mesh>
  )
}
const EarthCanvas = () => {
  return (
    <Canvas
    frameloop='demand'
    shadows
    camera={{position: [50,3,5], fov: 25}}
    gl={{ preserveDrawingBuffer: true }}
    >
    
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        />
        <Earth />
      </Suspense>
    </Canvas>
  )
}
export default EarthCanvas;