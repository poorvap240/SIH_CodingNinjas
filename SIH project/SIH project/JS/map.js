function initMap(containerId) {
  if (!document.getElementById(containerId)) return null;

  const map = L.map(containerId, { zoomControl:false, attributionControl:false })
    .setView([26.0, 92.5], 7);

 L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  attribution: '© Esri, Maxar, Earthstar Geographics'
}).addTo(map);

  L.control.zoom({ position:'topright' }).addTo(map);

  // Risk zone polygons
  const zones = [
    { coords:[[25.5,93.9],[25.9,94.3],[25.5,94.4],[25.3,94.0]], color:'#f85149', fillOpacity:0.15 },
    { coords:[[25.3,91.5],[25.8,91.9],[25.5,92.2],[25.1,91.8]], color:'#d29922', fillOpacity:0.12 },
  ];
  zones.forEach(z => {
    L.polygon(z.coords, {
      color:z.color, fillColor:z.color, fillOpacity:z.fillOpacity,
      weight:1.5, dashArray:'4 4'
    }).addTo(map);
  });

  // Nodes
  window.EWS_DATA.nodes.forEach(n => {
    const pulse = n.risk === 'critical' ? 'pulse' : '';
    const icon = L.divIcon({
      className:'',
      html:`<div class="node-marker ${pulse}" style="background:${n.color};color:${n.color};"></div>`,
      iconSize:[14,14], iconAnchor:[7,7]
    });
    const marker = L.marker([n.lat, n.lng], { icon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family:inherit;min-width:200px;">
        <div style="font-weight:700;font-size:13px;margin-bottom:6px;">${n.id} — ${n.name}</div>
        <div style="font-size:11px;color:#8b949e;line-height:1.8;">
          <div>Risk: <span style="color:${n.color};font-weight:600;">${n.risk.toUpperCase()}</span></div>
          <div>AI Score: <strong>${n.score.toFixed(2)}</strong></div>
          <div>Rainfall: <strong>${n.rainfall} mm/hr</strong></div>
          <div>Soil: <strong>${n.soil}%</strong></div>
          <div>Tilt: <strong>${n.tilt}°</strong></div>
          <div>Battery: <strong>${n.battery}%</strong></div>
        </div>
        <a href="${window.ROOT||'./'}pages/sensor-detail.html?id=${n.id}"
           style="display:inline-block;margin-top:8px;color:#58a6ff;font-size:11px;text-decoration:none;">
           View Details →
        </a>
      </div>
    `);
  });

  return map;
}