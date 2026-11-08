import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from 'three';
import borders from './destinationBorders.json';

// Simplified from Natural Earth's 1:50m Admin 0 boundaries via world-atlas.
export const destinationCenters = {
  taiwan: [121, 23.7],
  italy: [12.5, 42.6],
  turkey: [35, 39],
  malaysia: [102, 4],
  china: [104, 35],
  czech: [15.5, 49.8],
};

const radians = Math.PI / 180;

export function lonLatToPoint(lon, lat, radius = 1.79) {
  const phi = (lon + 180) * radians;
  const latitude = lat * radians;
  const horizontal = Math.cos(latitude) * radius;
  return [-Math.cos(phi) * horizontal, Math.sin(latitude) * radius, Math.sin(phi) * horizontal];
}

export function pointToLonLat(point) {
  const latitude = Math.asin(point.y / point.length()) / radians;
  let phi = Math.atan2(point.z, -point.x);
  if (phi < 0) phi += Math.PI * 2;
  return [phi / radians - 180, latitude];
}

function insideRing(lon, lat, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function countryAt(lon, lat) {
  for (const [id, polygons] of Object.entries(borders)) {
    if (polygons.some((rings) => insideRing(lon, lat, rings[0]) && !rings.slice(1).some((ring) => insideRing(lon, lat, ring)))) return id;
  }
  return null;
}

export function countryOverlay(activeId) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext('2d');

  for (const [id, polygons] of Object.entries(borders)) {
    const active = id === activeId;
    for (const rings of polygons) {
      context.beginPath();
      for (const ring of rings) {
        ring.forEach(([lon, lat], index) => {
          const x = ((lon + 180) / 360) * canvas.width;
          const y = ((90 - lat) / 180) * canvas.height;
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.closePath();
      }
      context.fillStyle = active ? 'rgba(216,245,90,.43)' : 'rgba(216,245,90,.16)';
      context.fill('evenodd');
      context.lineJoin = 'round';
      context.strokeStyle = 'rgba(19,49,104,.88)';
      context.lineWidth = active ? 6.5 : 5;
      context.stroke();
      context.strokeStyle = active ? '#ffffff' : '#d8f55a';
      context.lineWidth = active ? 4 : 3;
      context.stroke();
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.wrapS = RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}
