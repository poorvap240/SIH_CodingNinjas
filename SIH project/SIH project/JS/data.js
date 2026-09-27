// Mock data shared across pages
window.EWS_DATA = {
  nodes: [
    { id:'NL-04', name:'Nagaland — Kohima',   lat:25.67, lng:94.10, risk:'critical', score:0.87, color:'#f85149', battery:78, rainfall:52.3, soil:38.1, tilt:4.2, pore:15.2, status:'online' },
    { id:'ML-07', name:'Meghalaya — Shillong',lat:25.57, lng:91.88, risk:'moderate', score:0.62, color:'#d29922', battery:91, rainfall:35.6, soil:32.4, tilt:2.8, pore:14.2, status:'online' },
    { id:'AS-12', name:'Assam — Guwahati',    lat:26.14, lng:91.73, risk:'low',      score:0.18, color:'#3fb950', battery:88, rainfall:18.2, soil:24.1, tilt:1.1, pore:8.3,  status:'online' },
    { id:'MZ-02', name:'Mizoram — Aizawl',    lat:23.73, lng:92.72, risk:'low',      score:0.22, color:'#3fb950', battery:82, rainfall:20.5, soil:26.8, tilt:1.4, pore:9.1,  status:'online' },
    { id:'AR-09', name:'Arunachal — Itanagar',lat:27.10, lng:93.62, risk:'moderate', score:0.41, color:'#d29922', battery:69, rainfall:28.1, soil:29.5, tilt:2.0, pore:11.4, status:'online' },
    { id:'TR-03', name:'Tripura — Agartala',  lat:23.83, lng:91.28, risk:'low',      score:0.15, color:'#3fb950', battery:94, rainfall:15.3, soil:22.0, tilt:0.9, pore:7.2,  status:'online' },
    { id:'SK-01', name:'Sikkim — Gangtok',    lat:27.33, lng:88.61, risk:'low',      score:0.20, color:'#3fb950', battery:85, rainfall:19.8, soil:25.4, tilt:1.3, pore:8.8,  status:'online' },
  ],

  alerts: [
    {
      id:'ALT-001', severity:'critical', node:'NL-04', location:'Nagaland — Kohima Zone B',
      title:'CRITICAL — Immediate evacuation advised',
      desc:'Soil moisture 38% + tilt 4.2° + rainfall 52 mm/hr. AI risk score 0.87.',
      time:'2 min ago', timestamp: Date.now()-120000,
      dispatch:{ sms:true, buzzer:true, lora:true, app:true }, acknowledged:false
    },
    {
      id:'ALT-002', severity:'high', node:'ML-07', location:'Meghalaya — Shillong East',
      title:'HIGH — Prepare for evacuation',
      desc:'Pore pressure rising to 14.2 kPa. Risk score 0.62.',
      time:'8 min ago', timestamp: Date.now()-480000,
      dispatch:{ sms:true, buzzer:true, lora:false, app:true }, acknowledged:false
    },
    {
      id:'ALT-003', severity:'moderate', node:'AR-09', location:'Arunachal — Itanagar Hill',
      title:'MODERATE — Monitor closely',
      desc:'Vibration anomaly detected. Risk score 0.41.',
      time:'22 min ago', timestamp: Date.now()-1320000,
      dispatch:{ sms:true, buzzer:false, lora:true, app:true }, acknowledged:false
    },
    {
      id:'ALT-004', severity:'advisory', node:'AS-12', location:'Assam — Guwahati NH-37',
      title:'ADVISORY — Rainfall threshold near',
      desc:'Rainfall at 18.2 mm/hr, approaching 20 mm/hr advisory threshold.',
      time:'1 hr ago', timestamp: Date.now()-3600000,
      dispatch:{ sms:true, buzzer:false, lora:false, app:true }, acknowledged:true
    },
    {
      id:'ALT-005', severity:'advisory', node:'MZ-02', location:'Mizoram — Aizawl Ridge',
      title:'ADVISORY — Weekly maintenance due',
      desc:'Node MZ-02 scheduled for battery check within 3 days.',
      time:'4 hr ago', timestamp: Date.now()-14400000,
      dispatch:{ sms:false, buzzer:false, lora:false, app:true }, acknowledged:true
    }
  ],

  thresholds: {
    rainfall: 50,
    soilMoisture: 30,
    tilt: 5,
    porePressure: 15
  }
};