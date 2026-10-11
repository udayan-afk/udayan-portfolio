/**
 * UDAYAN BORGE (MR_RAJEE) — THREE.JS 3D SCULPTURE SCENE
 * Abstract digital sculpture: Metallic, smooth, organic, physical & luxurious.
 */

class HeroScene {
  constructor() {
    this.container = document.getElementById('hero-canvas-container');
    this.canvas = document.getElementById('hero-canvas');
    if (!this.container || !this.canvas) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    
    // Objects
    this.mainGroup = null;
    this.sculptureMesh = null;
    this.accentRing = null;
    this.orbitSpheres = [];

    // Interaction targets
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollOffsetY = 0;
    this.isHovered = false;
    this.targetScale = 1;
    this.currentScale = 1;

    // Visibility / Performance
    this.isVisible = true;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. Scene setup
    this.scene = new THREE.Scene();

    // 2. Camera setup
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(width, height);
    // Limit pixel ratio to max 1.5 for performance
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // 4. Lighting setup
    this.setupLighting();

    // 5. Build 3D Sculpture
    this.createSculpture();

    // 6. Listeners
    this.addEventListeners();

    // 7. Start render loop
    this.animate();
  }

  setupLighting() {
    // Soft Ambient Light
    const ambient = new THREE.AmbientLight(0xfff8f0, 0.8);
    this.scene.add(ambient);

    // Key Light (Warm Key)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 5, 4);
    this.scene.add(keyLight);

    // Fill Light (Soft Cool Fill)
    const fillLight = new THREE.DirectionalLight(0xdce6ff, 0.9);
    fillLight.position.set(-5, -3, -2);
    this.scene.add(fillLight);

    // Rim Light (Electric Vermillion Accent highlight)
    const rimLight = new THREE.PointLight(0xff4d00, 3.5, 12);
    rimLight.position.set(3, -2, -2);
    this.scene.add(rimLight);

    // Secondary Accent Light
    const topLight = new THREE.PointLight(0xffffff, 1.2, 10);
    topLight.position.set(-2, 4, 3);
    this.scene.add(topLight);
  }

  createSculpture() {
    this.mainGroup = new THREE.Group();
    this.scene.add(this.mainGroup);

    // Geometry: Elegant Parametric TorusKnot
    const geom = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32, 2, 3);
    geom.computeVertexNormals();

    // Material: Luxury Metallic Chrome with subtle clearcoat
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0xf5f2eb,
      metalness: 0.8,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
      wireframe: false
    });

    this.sculptureMesh = new THREE.Mesh(geom, mat);
    this.mainGroup.add(this.sculptureMesh);

    // Outer Thin Vermillion Accent Ring
    const ringGeom = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xff4d00,
      metalness: 0.9,
      roughness: 0.1
    });
    this.accentRing = new THREE.Mesh(ringGeom, ringMat);
    this.accentRing.rotation.x = Math.PI / 3;
    this.accentRing.rotation.y = Math.PI / 6;
    this.mainGroup.add(this.accentRing);

    // Floating Chrome Spheres in orbit
    const sphereGeom = new THREE.SphereGeometry(0.12, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.95,
      roughness: 0.05
    });

    for (let i = 0; i < 3; i++) {
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      const angle = (i / 3) * Math.PI * 2;
      sphere.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, (i - 1) * 0.4);
      sphere.userData = { angle, speed: 0.5 + i * 0.2, radius: 2.2 };
      this.orbitSpheres.push(sphere);
      this.mainGroup.add(sphere);
    }
  }

  addEventListeners() {
    // Mouse Parallax Listener
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Hover response on canvas
    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.targetScale = 1.06;
    });
    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.targetScale = 1.0;
    });

    // Scroll reaction
    window.addEventListener('scroll', () => {
      this.scrollOffsetY = window.scrollY * 0.001;
    });

    // Resize Handler
    window.addEventListener('resize', () => this.onWindowResize());

    // Visibility Observer to pause off-screen render
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(this.container);
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    const elapsedTime = this.clock.getElapsedTime();

    // Smooth Lerp Mouse Movement
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Smooth Scale Lerp on hover
    this.currentScale += (this.targetScale - this.currentScale) * 0.08;
    this.mainGroup.scale.set(this.currentScale, this.currentScale, this.currentScale);

    // Continuous Subtle Rotations
    if (this.sculptureMesh) {
      this.sculptureMesh.rotation.y = elapsedTime * 0.25 + this.mouse.x * 0.5;
      this.sculptureMesh.rotation.x = elapsedTime * 0.15 + this.mouse.y * 0.5 + this.scrollOffsetY;
    }

    if (this.accentRing) {
      this.accentRing.rotation.z = -elapsedTime * 0.3;
      this.accentRing.rotation.y = elapsedTime * 0.1 + this.mouse.x * 0.3;
    }

    // Orbit Spheres Animation
    this.orbitSpheres.forEach((sphere) => {
      const currentAngle = sphere.userData.angle + elapsedTime * sphere.userData.speed * 0.5;
      sphere.position.x = Math.cos(currentAngle) * sphere.userData.radius;
      sphere.position.y = Math.sin(currentAngle) * sphere.userData.radius;
    });

    // Subtle Group Floating Parallax
    this.mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.15 - this.scrollOffsetY * 0.8;
    this.mainGroup.position.x = this.mouse.x * 0.2;

    this.renderer.render(this.scene, this.camera);
  }
}

// Global Export/Init
window.HeroScene = HeroScene;
