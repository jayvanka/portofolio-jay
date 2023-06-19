import {Suspense,useEffect, useState} from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls,Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader'



const Mobils = ({ isMobile }) => {
  const mobil = useGLTF('./mobil/scene.gltf')

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
      object={mobil.scene}
      scale={ isMobile ? 0.5 : 0.7}
      position={ isMobile ? [0, -3, -1] : [0, -38, -1.5]}
      rotation={[-0.01, 1.6, 0]}
      />
    </mesh>
  )
}
const MobilsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (Event) => {
      setIsMobile(Event.matches);
    }
    mediaQuery.addEventListener("change",handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change",handleMediaQueryChange);
    };
  }, [])
  return (
    <Canvas
    frameloop='demand'
    shadows
    camera={{position: [300,3,5], fov: 25}}
    gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
        autoRotate
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        />
        <Mobils isMobile={isMobile}  />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}
export default MobilsCanvas