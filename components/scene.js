
// React Imports
import * as React from 'react'

// React Three Fiber / Drei Imports
import { useFrame, Canvas } from '@react-three/fiber'
import { Icosahedron, Tube, PerspectiveCamera, OrbitControls } from '@react-three/drei'

import * as THREE from 'three';

const BobaStraw = ({ position }) => {
  const path = new THREE.LineCurve3(
    new THREE.Vector3( -2, -7, 4 ),
    new THREE.Vector3( -3, 3, 3 ))
  return (
    <Tube args={[ path, 20, 0.5, 8, false]}>
      <meshPhongMaterial opacity="0.7" attach="material" color="#C3B1E1" transparent="true" shininess="100" />
    </Tube>
  )
}

const NUM = 3

const Mesh = ({ position }) => {
  const myMesh = React.useRef()

  useFrame(() => {
    if (myMesh.current) {
      myMesh.current.rotation.x = myMesh.current.rotation.y += 0.01
    }
  })

  return (
    <Icosahedron ref={myMesh} position={position} args={[1, 1]}>
      <meshBasicMaterial attach="material" color="white" wireframe />
    </Icosahedron>
  )
}

const OrthoCamera = () => {
  const myCamera = React.useRef()

  useFrame((state) => {
    if (myCamera.current) {
      let rotationSpeed = 0.01
      let mouseState = state.mouse.x * (Math.PI / 2) * -0.1

      if (Math.abs(myCamera.current.rotation.y - mouseState) < rotationSpeed) {
        myCamera.current.rotation.y = mouseState
      } else if (myCamera.current.rotation.y < mouseState) {
        myCamera.current.rotation.y += rotationSpeed
      } else if (myCamera.current.rotation.y > mouseState) {
        myCamera.current.rotation.y -= rotationSpeed
      }
    }
  })

  return (
    <PerspectiveCamera  makeDefault ref={myCamera} position={[0, 0, 10]} zoom={0.5} rotation={[0, 0, 0]}/>
  )
}

const Scene = () => {
  const positions = React.useMemo(() => {
    let pos = []
    const half = (NUM - 1) / 2

    for (let x = 0; x < NUM; x++) {
      for (let y = 0; y < NUM; y++) {
        pos.push({
          id: `${x}-${y}`,
          position: [(x - half) * 4, (y - half) * 4, 0],
        })
      }
    }

    return pos
  }, [])

  return (
    <Canvas>
      <OrthoCamera />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <BobaStraw position={[0, 0, 0]}/>
      <group position={[0, 0, 0]}>
        {positions.map(({ id, position }) => (
          <Mesh key={id} position={position}/>
        ))}
      </group>
    </Canvas>
  )
  // <color attach="background" args={"#ffe6f7"} />
  // <OrbitControls />
}

export default Scene