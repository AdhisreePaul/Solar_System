import { createPlanets, planetData } from "../components/createPlanets.js";
import { createStars } from "../components/createStars.js";
import { setupCameraControls } from "../controls/cameraControls.js";
import { setupUI } from "../controls/uiControls.js";

export class MainScene {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.clock = new THREE.Clock();

    this.isPaused = false;

    this.init();
  }

  init() {
    this.camera.position.set(0, 50, 80);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create sun
    const textureLoader = new THREE.TextureLoader();
    const sunTexture = textureLoader.load("../assests/textures/sun.jpg");
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
    this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
    this.sun.userData = { name: "Sun", type: "star" };
    this.scene.add(this.sun);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    const sunLight = new THREE.PointLight(0xffffff, 1.5, 300); // Increased intensity and distance
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    this.scene.add(ambientLight, sunLight);

    // Create background and planets
    const loader = new THREE.TextureLoader();
    const milkyWayTexture = loader.load(
      "../assests/textures/stars_milky_way.jpg"
    );
    this.scene.background = milkyWayTexture;

    const geometry = new THREE.SphereGeometry(500, 64, 64);
    const material = new THREE.MeshBasicMaterial({
      map: loader.load("../assests/textures/stars_milky_way.jpg"),
      side: THREE.BackSide, // Render inside of sphere
    });
    const starSphere = new THREE.Mesh(geometry, material);
    this.scene.add(starSphere);

    this.stars = createStars();
    this.planets = createPlanets(planetData);
    this.scene.add(
      this.stars,
      ...this.planets.map((p) => p.mesh),
      ...this.planets.map((p) => p.orbit)
    );

    // Setup controls
    this.controls = setupCameraControls(this.camera, this.renderer.domElement);
    setupUI(this);

    // Handle window resizing
    window.addEventListener("resize", () => this.onWindowResize());

    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const deltaTime = this.clock.getDelta();

    // Update camera controls
    this.controls.update();

    if (!this.isPaused) {
      this.sun.rotation.y += deltaTime * 0.1;

      this.planets.forEach((p) => {
        p.userData.angle += deltaTime * p.userData.currentSpeed * 0.1;
        p.mesh.position.x = Math.cos(p.userData.angle) * p.userData.distance;
        p.mesh.position.z = Math.sin(p.userData.angle) * p.userData.distance;
        p.mesh.rotation.y += deltaTime * 0.5;
      });
    }

    this.renderer.render(this.scene, this.camera);
  }
}
