
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { x: 1, y: 1, z: 10, name: 'Emerald Heights', risk: 'Low' },
  { x: 2, y: 2, z: 20, name: 'Vertex Tower', risk: 'Medium' },
  { x: 3, y: 3, z: 50, name: 'Azure Bay', risk: 'High' },
  { x: 4, y: 4, z: 80, name: 'Nexus Hub', risk: 'Critical' },
  { x: 1, y: 4, z: 30, name: 'Project E', risk: 'Medium' },
  { x: 4, y: 1, z: 90, name: 'Project F', risk: 'Critical' },
];

const getColor = (risk: string) => {
  switch (risk) {
    case 'Critical': return '#FFFFFF'; // White for critical in this aesthetic
    case 'High': return '#666666';
    case 'Medium': return '#333333';
    case 'Low': return '#D9FF00'; // Lime for low risk (safe)
    default: return '#111111';
  }
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border border-white/10 p-3 shadow-2xl">
        <p className="text-[10px] font-black text-white uppercase tracking-widest">{payload[0].payload.name}</p>
        <p className="text-[9px] font-mono text-lime mt-1">RISK_SIG: {payload[0].payload.risk}</p>
      </div>
    );
  }
  return null;
};

const RiskMatrix: React.FC = () => {
  return (
    <div className="h-80 w-full bg-zinc-950 border border-zinc-900 p-8">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis type="number" dataKey="x" domain={[0, 5]} hide />
          <YAxis type="number" dataKey="y" domain={[0, 5]} hide />
          <ZAxis type="number" dataKey="z" range={[200, 1500]} />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#333' }} />
          <Scatter name="Projects" data={data}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={getColor(entry.risk)} 
                className="hover:scale-110 transition-transform cursor-crosshair" 
                stroke={entry.risk === 'Critical' ? '#D9FF00' : 'none'}
                strokeWidth={2}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskMatrix;
