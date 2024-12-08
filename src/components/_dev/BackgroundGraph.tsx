"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

class Node extends THREE.Mesh {
  velocity: THREE.Vector3;

  constructor(
    geometry: THREE.BufferGeometry,
    material: THREE.Material | THREE.Material[],
  ) {
    super(geometry, material);
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.1,
      (Math.random() - 0.5) * 0.1,
      (Math.random() - 0.5) * 0.1,
    );
  }
}

interface BackgroundGraphProps {
  nodeCount: number;
}

export default function BackgroundGraph({ nodeCount }: BackgroundGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer;
    let nodes: Node[], edges: THREE.LineSegments;
    const minNodeRadius = 1;
    const maxNodeRadius = 2;

    // Define colors for light and dark themes
    const lightThemeNodeColor = "#6b21a8";
    const darkThemeNodeColor = "#d8b4fe";
    const lightThemeEdgeColor = "#6b21a8";
    const darkThemeEdgeColor = "#d8b4fe";

    // Set colors based on the current theme
    const nodeColor =
      theme === "dark" ? darkThemeNodeColor : lightThemeNodeColor;
    const edgeColor =
      theme === "dark" ? darkThemeEdgeColor : lightThemeEdgeColor;

    function init() {
      // Scene setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 500;

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);

      // Create nodes
      nodes = [];
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(nodeColor),
        transparent: true,
        opacity: 0.8, // Set node opacity
      });

      for (let i = 0; i < nodeCount; i++) {
        const radius =
          Math.random() * (maxNodeRadius - minNodeRadius) + minNodeRadius;
        const nodeGeometry = new THREE.SphereGeometry(radius, 32, 32);
        const node = new Node(nodeGeometry, nodeMaterial);

        node.position.set(
          Math.random() * window.innerWidth - window.innerWidth / 2,
          Math.random() * window.innerHeight - window.innerHeight / 2,
          Math.random() * 400 - 200,
        );
        nodes.push(node);
        scene.add(node);
      }

      // Create edges
      const edgeGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(nodeCount * nodeCount * 3 * 2); // Adjusted size to accommodate all edges

      edgeGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(edgeColor),
        transparent: true,
        opacity: 0.5, // Set edge opacity
      });

      edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
      scene.add(edges);
    }

    function updateEdges() {
      const positions = edges.geometry.attributes.position
        .array as Float32Array;
      let index = 0;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);

          if (dist < 150) {
            positions[index++] = nodes[i].position.x;
            positions[index++] = nodes[i].position.y;
            positions[index++] = nodes[i].position.z;
            positions[index++] = nodes[j].position.x;
            positions[index++] = nodes[j].position.y;
            positions[index++] = nodes[j].position.z;
          }
        }
      }

      edges.geometry.setDrawRange(0, index / 3);
      edges.geometry.attributes.position.needsUpdate = true;
    }

    function animate() {
      requestAnimationFrame(animate);

      // Animate nodes
      nodes.forEach((node) => {
        node.position.add(node.velocity);

        // Bounce off walls
        if (
          node.position.x < -window.innerWidth / 2 ||
          node.position.x > window.innerWidth / 2
        ) {
          node.velocity.x = -node.velocity.x;
          node.position.x = THREE.MathUtils.clamp(
            node.position.x,
            -window.innerWidth / 2,
            window.innerWidth / 2,
          );
        }
        if (
          node.position.y < -window.innerHeight / 2 ||
          node.position.y > window.innerHeight / 2
        ) {
          node.velocity.y = -node.velocity.y;
          node.position.y = THREE.MathUtils.clamp(
            node.position.y,
            -window.innerHeight / 2,
            window.innerHeight / 2,
          );
        }
        if (node.position.z < -200 || node.position.z > 200) {
          node.velocity.z = -node.velocity.z;
          node.position.z = THREE.MathUtils.clamp(node.position.z, -200, 200);
        }
      });

      updateEdges();
      renderer.render(scene, camera);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("resize", onWindowResize, false);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [theme, nodeCount]);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full z-0" />
  );
}
