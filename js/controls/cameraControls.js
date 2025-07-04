// A simplified version of your custom orbit controls
export function setupCameraControls(camera, domElement) {
  let isMouseDown = false;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0.5; // Start with a slight angle
  const PIVOT_POINT = new THREE.Vector3(0, 0, 0);

  const onMouseDown = (e) => {
      isMouseDown = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
  };
  
  const onMouseMove = (e) => {
      if (!isMouseDown) return;
      targetX += (e.clientX - mouseX) * 0.01;
      targetY -= (e.clientY - mouseY) * 0.01;
      targetY = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, targetY)); // Clamp vertical rotation
      mouseX = e.clientX;
      mouseY = e.clientY;
  };

  const onMouseUp = () => isMouseDown = false;
  
  const onWheel = (e) => {
      const zoom = e.deltaY > 0 ? 1.1 : 0.9;
      camera.position.multiplyScalar(zoom);
      camera.position.clampLength(20, 200); // Prevent zooming too close or far
  };

  domElement.addEventListener('mousedown', onMouseDown);
  domElement.addEventListener('mousemove', onMouseMove);
  domElement.addEventListener('mouseup', onMouseUp);
  domElement.addEventListener('wheel', onWheel);

  const update = () => {
      const radius = camera.position.length();
      camera.position.x = radius * Math.sin(targetX) * Math.cos(targetY);
      camera.position.z = radius * Math.cos(targetX) * Math.cos(targetY);
      camera.position.y = radius * Math.sin(targetY);
      camera.lookAt(PIVOT_POINT);
  };

  // Return the update function so it can be called in the animation loop
  return { update };
}