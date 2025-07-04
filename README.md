# 3D Solar System

A real-time, interactive 3D solar system visualizer built with Three.js. Explore the Sun and eight planets with adjustable orbit speeds, dark/light themes, and hover tooltips for planet names.

---

## 🔗 Repository

https://github.com/AdhisreePaul/Solar_System

---

## 📂 Project Structure

```
Solar_System/
├── css/
│   └── styles.css    # All UI/UX styling—bold, classic look
├── js/
│   └── main.js       # Application logic, scene setup, animation loop
├── index.html        # Entry point, links CSS & JS
├── README.md         # This file
└── images/           # Contain textures of all planets

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (optional, for local server)
- Modern browser with WebGL support (Chrome, Firefox, Edge, Safari)

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdhisreePaul/Solar_System.git
   cd Solar_System
   ```

2. **Serve the files**

   Browsers often block `file://` WebGL textures; use a simple HTTP server:

   - **Using Python 3**:
     ```bash
     python3 -m http.server 8000
     ```

   - **Using Node.js**:
     ```bash
     npx serve .
     ```

3. **Open in browser**

   Navigate to `http://localhost:8000` (or the port you chose).

---

## 🎮 Usage

- **Rotate view**: click and drag the canvas
- **Zoom**: mouse wheel
- **Pause/Resume**: `⏸️ Pause` / `▶️ Resume` button
- **Adjust speeds**: use planet sliders in the controls panel
- **Hover**: show planet names in tooltips

---

## ✨ Features

- Realistic relative planet sizes and distances
- Smooth orbit animations with adjustable speeds
- Responsive UI for desktop and mobile
- Classic, bold serif typography with gold accents
- Modular code: clean separation of HTML, CSS, and JS

---

## 🛠️ Technologies

- [Three.js](https://threejs.org/) for 3D rendering
- Vanilla JavaScript (ES6+) for application logic
- CSS3 for styling (backdrop-filters, flexbox, media queries)

---

## 📐 Customization

- **Add textures**: replace `MeshLambertMaterial` colors with `TextureLoader` images
- **Change planet data**: modify `planetData` array in `js/main.js`
- **Adjust UI**: tweak values in `css/styles.css`

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m "Add some feature"`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

*Happy stargazing!*
