import { MainScene } from './scene/mainScene.js';

window.addEventListener('DOMContentLoaded', () => {
    new MainScene();
});

const textureLoader = new THREE.TextureLoader();

const planetTextures = {
    mercury: textureLoader.load('./images/mercury.jpg'),
    venus: textureLoader.load('./images/venus.jpg'),
    earth: textureLoader.load('./images/earth.jpg'),
    mars: textureLoader.load('./images/mars.jpg'),
    jupiter: textureLoader.load('./images/jupiter.jpg'),
    saturn: textureLoader.load('./images/saturn.jpg'),
    uranus: textureLoader.load('./images/uranus.jpg'),
    neptune: textureLoader.load('./images/neptune.jpg'),
    // add other planets as needed
};