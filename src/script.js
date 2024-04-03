import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// fog
const fog = new THREE.Fog("#454B1B", 3, 30);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
//text
const matcapTexture = textureLoader.load("/textures/matcaps/7.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;
//door
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
//bricks
const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksHeightTexture = textureLoader.load("/textures/bricks/height.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);
bricksColorTexture.colorSpace = THREE.SRGBColorSpace;
// window
const windowColorTexture = textureLoader.load("/textures/window/basecolor.jpg");
const windowAlphaTexture = textureLoader.load("/textures/window/alpha.jpg");
const windowAmbientOcclusionTexture = textureLoader.load(
  "/textures/window/ambientOcclusion.jpg"
);
const windowHeightTexture = textureLoader.load("/textures/window/height.jpg");
const windowNormalTexture = textureLoader.load("/textures/window/normal.jpg");
const windowRoughnessTexture = textureLoader.load(
  "/textures/window/roughness.jpg"
);
windowColorTexture.colorSpace = THREE.SRGBColorSpace;
//grass
const grassColorTexture = textureLoader.load("/textures/grass/basecolor.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);
const grassHeightTexture = textureLoader.load("/textures/grass/height.jpg");
grassColorTexture.colorSpace = THREE.SRGBColorSpace;
//
// repeat
grassColorTexture.repeat.set(15, 15);
grassAmbientOcclusionTexture.repeat.set(15, 15);
grassNormalTexture.repeat.set(15, 15);
grassRoughnessTexture.repeat.set(15, 15);
//wrap s
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
// wrap t
grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * font loader
 */
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("School", {
    font: font,
    size: 0.3,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry.center();

  const textMaterial = new THREE.MeshMatcapMaterial();
  textMaterial.matcap = matcapTexture;
  const text = new THREE.Mesh(textGeometry, textMaterial);
  school.add(text);
  text.position.set(0, 3.3, 3.06);
});

/**
 * objects
 */

//Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    displacementMap: grassHeightTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
scene.add(floor);
floor.rotation.x = -0.5 * Math.PI;
floor.position.y = 0;
//group
const school = new THREE.Group();
scene.add(school);
// walls
const wallsMaterial = new THREE.MeshStandardMaterial({
  color: "#50C878",
  map: bricksColorTexture,
  aoMap: bricksAmbientOcclusionTexture,
  displacementMap: bricksHeightTexture,
  normalMap: bricksNormalTexture,
  roughnessMap: bricksRoughnessTexture,
});
const cube1 = new THREE.Mesh(new THREE.BoxGeometry(6, 5, 1), wallsMaterial);
cube1.position.y = 2.5;

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(6, 5, 1), wallsMaterial);
cube2.position.y = 2.5;
cube2.position.z = 1 / 2 + 2;

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 5, 1.5), wallsMaterial);
cube3.position.set(-1.5 + -1.5 / 2, 5 / 2, 1.25);

const cube4 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 5, 1.5), wallsMaterial);
cube4.position.set(1.5 + 1.5 / 2, 5 / 2, 1.25);

school.position.z = 0;

const cube5 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 4.5, 1.5),
  new THREE.MeshStandardMaterial({
    color: "grey",
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);
cube5.position.y = 4.5 / 2;
cube5.position.z = 1 + 0.5 / 2;
school.add(cube1, cube2, cube3, cube4, cube5);
school.position.y = 0.3;
school.position.z = 0;
//floor 2
const floor2 = new THREE.Mesh(
  new THREE.BoxGeometry(6.4, 0.3, 3.9),
  new THREE.MeshStandardMaterial({ color: "grey" })
);
floor2.position.y = 0.3 / 2 + 0.01;
floor2.position.z = 1.2;
scene.add(floor2);
//door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.position.y = 1 + 0.4;
door.position.z = 3.5 / 2 + 1.259;
scene.add(door);
// stears
const stear1 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0.2, 1.4),
  new THREE.MeshStandardMaterial({ color: "grey" })
);
stear1.position.y = 0.2 / 2;
stear1.position.z = 1.4 / 2 + 3.9 / 2 + 1.2;

const stear2 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.2, 1),
  new THREE.MeshStandardMaterial({ color: "grey" })
);
stear2.position.y = 0.2 / 2 + 0.2;
stear2.position.z = 1 / 2 + 3.9 / 2 + 1;

scene.add(stear1, stear2);

// window
const windowMaterial = new THREE.MeshStandardMaterial({
  map: windowColorTexture,
  transparent: true,
  alphaMap: windowAlphaTexture,
  aoMap: windowAmbientOcclusionTexture,
  displacementMap: windowHeightTexture,
  displacementScale: 0.1,
  normalMap: windowNormalTexture,
  roughnessMap: windowRoughnessTexture,
});

const window1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 0.1, 100, 100),
  windowMaterial
);
window1.position.set(-2, 1 / 2 + 1, 3.9 / 2 + 1.06);

const window2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 0.1, 100, 100),
  windowMaterial
);
window2.position.set(2, 1 / 2 + 1, 3.9 / 2 + 1.06);

const window3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 0.1, 100, 100),
  windowMaterial
);
window3.position.set(2, 1 / 2 + 1 + 2.5, 3.9 / 2 + 1.06);

const window4 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 0.1, 100, 100),
  windowMaterial
);
window4.position.set(-2, 1 / 2 + 1 + 2.5, 3.9 / 2 + 1.06);

const window5 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 0.1, 100, 100),
  windowMaterial
);
window5.position.set(6 / 2 - 1 / 2 + 0.51, 0.5 + 2.5, 3.5 / 2 - 1 / 2);
window5.rotation.y = 0.5 * Math.PI;

const window6 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 0.1, 100, 100),
  windowMaterial
);
window6.position.set(-3.01, 0.5 + 2.5, 3.5 / 2 - 1 / 2);
window6.rotation.y = -0.5 * Math.PI;

school.add(window1, window2, window3, window4, window5, window6);
//bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(-2.15 + 0.2, 0.25 - 0.4, 3.9 / 2 + 1.5);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(-2.15 - 0.25, 0.25 - 0.35, 3.9 / 2 + 1.5 + 0.25);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(2.15 - 0.2, 0.25 - 0.3, 3.9 / 2 + 1.5);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(2.15 - 0.2 + 0.5, 0.25 - 0.5, 3.9 / 2 + 1.5 + 0.1);

school.add(bush1, bush2, bush3, bush4);

//Tree

//leef
const leafGeometry = new THREE.ConeGeometry(1.5, 3, 4, 2, false);
const leafMaterial = new THREE.MeshBasicMaterial({ color: "#023020" });
//wood
const woodgeometry = new THREE.CapsuleGeometry(0.2, 2, 2, 10);
const woodmaterial = new THREE.MeshBasicMaterial({ color: "#8B4513" });

//loops
const treeGroup1 = new THREE.Group();
scene.add(treeGroup1);
const treeGroup2 = new THREE.Group();
scene.add(treeGroup2);
// tree group 1
for (let i = 0; i < 20; i++) {
  const angle = Math.random() * Math.PI + 1.5;
  const radius = 7 + Math.random() * 12;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const leaf = new THREE.Mesh(leafGeometry, leafMaterial);

  const wood = new THREE.Mesh(woodgeometry, woodmaterial);

  leaf.position.set(x, 3 / 2 - 0.2 + 3 / 2, z);
  wood.position.set(x, -0.5 + 3 / 2, z);
  scene.add(leaf, wood);
  //
}

for (let i = 0; i < 4; i++) {
  const angle = Math.random() * Math.PI * 0.25;
  const radius = 9 + Math.random() * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const leaf = new THREE.Mesh(leafGeometry, leafMaterial);

  const wood = new THREE.Mesh(woodgeometry, woodmaterial);

  leaf.position.set(x, 3 / 2 - 0.2 + 3 / 2, z);
  wood.position.set(x, -0.5 + 3 / 2, z);
  treeGroup1.add(leaf, wood);
  //
  leaf.castShadow = true;
  wood.castShadow = true;
}

treeGroup1.position.set(-11, 0, 3);

// tree group 2

for (let i = 0; i < 3; i++) {
  const angle = Math.random() * Math.PI * 0.25;
  const radius = 9 + Math.random() * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const leaf = new THREE.Mesh(leafGeometry, leafMaterial);

  const wood = new THREE.Mesh(woodgeometry, woodmaterial);

  leaf.position.set(x, 3 / 2 - 0.2 + 3 / 2, z);
  wood.position.set(x, -0.5 + 3 / 2, z);
  treeGroup2.add(leaf, wood);
  // shadow
  leaf.castShadow = true;
  wood.castShadow = true;
}
treeGroup2.position.set(11, 0, 3);

/**
 * shadows
 */
// walls
cube1.castShadow = true;
cube2.castShadow = true;
cube3.castShadow = true;
cube4.castShadow = true;
cube5.castShadow = true;
stear1.castShadow = true;
stear2.castShadow = true;
stear1.receiveShadow = true;
stear2.receiveShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
floor.receiveShadow = true;
floor2.receiveShadow = true;

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.28);
gui
  .add(ambientLight, "intensity")
  .min(0)
  .max(1)
  .step(0.001)
  .name("Ambient Light");
scene.add(ambientLight);

ambientLight.castShadow = true;

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.26);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001).name("Moon Light");
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

moonLight.castShadow = true;

// door light
const doorLight = new THREE.PointLight("#ff7d46", 2.4, 7);
doorLight.position.set(0, 2.8, 3.06);
school.add(doorLight);
doorLight.castShadow = true;
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(4, 2, 9);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#454B1B");
renderer.shadowMap.enabled = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
