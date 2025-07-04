export function createStars() {
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.5 });
  
  const positions = [];
  for (let i = 0; i < 2000; i++) {
      positions.push((Math.random() - 0.5) * 800);
      positions.push((Math.random() - 0.5) * 800);
      positions.push((Math.random() - 0.5) * 800);
  }
  
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  return stars;
}