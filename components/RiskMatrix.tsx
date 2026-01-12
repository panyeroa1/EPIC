
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { x: 1, y: 1, z: 10, name: 'Project A', risk: 'Low' },
  { x: 2, y: 2, z: 20, name: 'Project B', risk: 'Medium' },
  { x: 3, y: 3, z: 50, name: 'Project C', risk: 'High' },
  { x: 4, y: 4, z: 80, name: 'Project D', risk: 'Critical' },
  { x: 1, y: 4, z: 30, name: 'Project E', risk: 'Medium' },
  { x: 4, y: 1, z: 90, name: 'Project F', risk: 'Critical' },
];

const getColor = (risk: string) => {
  switch (risk) {
    case 'Critical': return '#ef4444';
    case 'High': return '#f97316';
    case 'Medium': return '#eab308';
    case 'Low': return '#22c55e';
    default: return '#94a3b8';
  }
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 p-2 rounded shadow-xl">
        <p className="text-sm font-bold text-white">{payload[0].payload.name}</p>
        <p className="text-xs text-slate-300">Risk: {payload[0].payload.risk}</p>
      </div>
    );
  }
  return null;
};

const RiskMatrix: React.FC = () => {
  return (
    <div className="h-64 w-full bg-slate-900/50 rounded-lg p-4 border border-slate-800">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Risk Matrix Heat Map</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <XAxis type="number" dataKey="x" hide />
          <YAxis type="number" dataKey="y" hide />
          <ZAxis type="number" dataKey="z" range={[100, 1000]} />
          <Tooltip content={<CustomTooltip />} />
          <Scatter name="Projects" data={data}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry.risk)} className="opacity-80 hover:opacity-100 transition-opacity" />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskMatrix;
