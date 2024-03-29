import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import birdImage from './bird.png'; // Renommer l'image de l'oiseau
import './CubeAnimation.css'; // Importer le fichier de styles CSS pour le composant CubeAnimation

const CubeAnimation = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // Initialiser la scène, la caméra et le rendu
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Changer la couleur de fond du rendu WebGL
    renderer.setClearColor(0xffffff, 1); // Couleur blanche

    // Créer des oiseaux
    const birds = [];
    const birdTextureLoader = new THREE.TextureLoader();
    const birdTexture = birdTextureLoader.load(birdImage); // Charger l'image de l'oiseau
    const birdMaterial = new THREE.MeshBasicMaterial({ map: birdTexture, transparent: true }); // Utiliser la texture de l'oiseau

    // Ajouter le premier oiseau à gauche
    const bird1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), birdMaterial);
    bird1.position.set(-140, 100, -5); // Position initiale
    bird1.userData.direction = 1; // Direction initiale vers le haut
    scene.add(bird1);
    birds.push(bird1);



    // Ajouter le troisième oiseau à droite
    const bird3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), birdMaterial);
    bird3.position.set(115, 20, -5); // Position initiale
    bird3.userData.direction = 1; // Direction initiale vers le haut
    scene.add(bird3);
    birds.push(bird3);

    // Définir la fonction d'animation
    const animate = () => {
      requestAnimationFrame(animate);

      birds.forEach(bird => {
        // Faire monter et descendre les oiseaux
        bird.position.y += 0.02 * bird.userData.direction; // Ajustez la vitesse de montée/descente si nécessaire
        // Limiter la montée pour les oiseaux
        if (bird.position.y > 30) {
          bird.position.y = 30; // Limite supérieure de la montée
          bird.userData.direction = -1; // Inverser la direction vers le bas
        } else if (bird.position.y < 10) {
          bird.position.y = 10; // Limite inférieure de la descente
          bird.userData.direction = 1; // Inverser la direction vers le haut
        }
      });

      renderer.render(scene, camera);
    };

    // Définir la position et l'orientation de la caméra
    camera.position.z = 100;

    // Lancer l'animation
    animate();

    // Nettoyer la scène lors du démontage du composant
    return () => {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="cube-animation-canvas" />;
};

export default CubeAnimation;
