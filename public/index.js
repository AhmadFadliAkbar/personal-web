document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile Menu Toggle ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // --- Set current year in footer ---
  document.getElementById("year").textContent = new Date().getFullYear();

  // --- Hologram Animation with Three.js ---
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.getElementById("hologram-canvas").appendChild(renderer.domElement);

  // Create geometry
  const geometry = new THREE.IcosahedronGeometry(2, 1);

  // Create a holographic material
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
  });

  const hologram = new THREE.Mesh(geometry, material);
  scene.add(hologram);

  // Add some particle effects
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCnt = 5000;
  const posArray = new Float32Array(particlesCnt * 3);
  for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00ffff,
    transparent: true,
    opacity: 0.5,
  });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    hologram.rotation.x += 0.001;
    hologram.rotation.y += 0.002;
    particlesMesh.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // --- Fade-in sections on scroll ---
  const sections = document.querySelectorAll(".fade-in-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Menyembunyikan hologram besar saat scroll, tapi membiarkan partikel
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const homeSectionHeight = window.innerHeight;

    // Sembunyikan hologram besar jika sudah scroll melewati section home
    if (scrollPosition > homeSectionHeight * 0.8) {
      hologram.visible = false;
    } else {
      hologram.visible = true;
    }
  });
});
