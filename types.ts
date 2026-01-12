
export enum Pillar {
  INTELLIGENCE = 'INTELLIGENCE',
  APEX = 'APEX',
  SPACES = 'SPACES'
}

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Project {
  id: string;
  name: string;
  status: 'Green' | 'Yellow' | 'Red';
  progress: number;
  permits: boolean;
  indemnity: boolean;
  risk: RiskLevel;
  lastUpdate: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  status: 'Success' | 'Warning' | 'Locked';
}

export interface ComplianceState {
  permitApproved: boolean;
  indemnitySigned: boolean;
  accessAllowed: boolean;
}
