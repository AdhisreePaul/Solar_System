// js/components/createPlanets.js

// Add TextureLoader to the top
const textureLoader = new THREE.TextureLoader();

// Planet data is now isolated and easy to manage
export const planetData = [
  // Textures should be in your assets/textures/ folder

  {
    name: "Mercury",
    size: 0.4,
    distance: 15,
    speed: 4.7,
    texture: "mercury.jpg",
  },
  { name: "Venus", size: 0.9, distance: 20, speed: 3.5, texture: "venus.jpg" },
  { name: "Earth", size: 1, distance: 25, speed: 3.0, texture: "earth.jpg" },
  { name: "Mars", size: 0.5, distance: 30, speed: 2.4, texture: "mars.jpg" },
  {
    name: "Jupiter",
    size: 3,
    distance: 40,
    speed: 1.3,
    texture: "jupiter.jpg",
  },
  {
    name: "Saturn",
    size: 2.5,
    distance: 50,
    speed: 1.0,
    texture: "saturn.jpg",
  },
  {
    name: "Uranus",
    size: 1.8,
    distance: 60,
    speed: 0.7,
    texture: "uranus.jpg",
  },
  {
    name: "Neptune",
    size: 1.7,
    distance: 70,
    speed: 0.5,
    texture: "neptune.jpg",
  },
];

export function createPlanets() {
  return planetData.map((data) => {
    // Planet Mesh
    const planetGeometry = new THREE.SphereGeometry(data.size, 32, 32);
    // Use MeshStandardMaterial for more realistic lighting and textures
    const planetMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load(`../images/${data.texture}`),
    })
    const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
    planetMesh.position.x = data.distance;
    planetMesh.castShadow = true;
    planetMesh.receiveShadow = true;

    // --- ADD SATURN'S RINGS ---
    if (data.name === "Saturn") {
      const innerRadius = data.size * 1.2;
      const outerRadius = data.size * 2;
      const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 64);
      const ringTexture = textureLoader.load(
        "../images/saturn_ring.png"
      );
      const ringMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        side: THREE.DoubleSide,
        transparent: true,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = -0.5 * Math.PI; // Lay flat in XZ plane
      ringMesh.position.set(0, 0, 0); // Centered on Saturn
      planetMesh.add(ringMesh);
    }

    // Orbit Line
    const orbitGeometry = new THREE.RingGeometry(
      data.distance - 0.1,
      data.distance + 0.1,
      64
    );
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0x333333,
      side: THREE.DoubleSide,
    });
    const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2;

    const userData = {
      name: data.name,
      type: "planet",
      originalSpeed: data.speed,
      currentSpeed: data.speed,
      distance: data.distance,
      angle: Math.random() * Math.PI * 2,
    };

    planetMesh.userData = userData;

    return { mesh: planetMesh, orbit, userData };
  });
}
