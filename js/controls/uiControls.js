import { planetData } from "../components/createPlanets.js";

// Manages the tooltip element
class Tooltip {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'tooltip';
        document.body.appendChild(this.element);
    }

    show(text, x, y) {
        this.element.textContent = text;
        this.element.style.display = 'block';
        this.element.style.left = x + 10 + 'px';
        this.element.style.top = y - 30 + 'px';
    }

    hide() {
        this.element.style.display = 'none';
    }
}

export function setupUI(sceneInstance) {
    const controlsContainer = document.getElementById('planet-controls');
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const tooltip = new Tooltip();
    let isDarkMode = true;

    // Create planet speed sliders
    sceneInstance.planets.forEach((planet, index) => {
        const data = planetData[index];
        const controlDiv = document.createElement('div');
        controlDiv.className = 'planet-control';
        controlDiv.innerHTML = `
            <div class="planet-name">
                ${data.name}
            </div>
            <div class="speed-control">
                <input type="range" class="speed-slider" min="0" max="10" step="0.1" value="${data.speed}">
                <div class="speed-value">${data.speed.toFixed(1)}x</div>
            </div>`;
        
        const slider = controlDiv.querySelector('.speed-slider');
        const valueDisplay = controlDiv.querySelector('.speed-value');
        
        slider.addEventListener('input', (e) => {
            const speed = parseFloat(e.target.value);
            planet.userData.currentSpeed = speed;
            valueDisplay.textContent = speed.toFixed(1) + 'x';
        });

        controlsContainer.appendChild(controlDiv);
    });

    // Main controls (Pause/Theme)
    const pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.addEventListener('click', () => {
        sceneInstance.isPaused = !sceneInstance.isPaused;
        pauseBtn.textContent = sceneInstance.isPaused ? '▶️ Resume' : '⏸️ Pause';
        pauseBtn.classList.toggle('active', sceneInstance.isPaused);
    });

    const themeBtn = document.getElementById('themeBtn');
    themeBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        sceneInstance.renderer.setClearColor(isDarkMode ? 0x000000 : 0x87CEEB);
        themeBtn.textContent = isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode';
        themeBtn.classList.toggle('active', !isDarkMode);
    });

    // Mouse move for tooltips
    sceneInstance.renderer.domElement.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, sceneInstance.camera);
        const intersects = raycaster.intersectObjects([sceneInstance.sun, ...sceneInstance.planets.map(p => p.mesh)]);

        if (intersects.length > 0) {
            const object = intersects[0].object;
            tooltip.show(object.userData.name, event.clientX, event.clientY);
            sceneInstance.renderer.domElement.style.cursor = 'pointer';
        } else {
            tooltip.hide();
            sceneInstance.renderer.domElement.style.cursor = 'default';
        }
    });
}