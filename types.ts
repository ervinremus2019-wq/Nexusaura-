
export enum SystemStatus {
  AURA_ACTIVE = 'AURA_ACTIVE',
  DECOY_MODE = 'DECOY_MODE',
  PRODUCTION = 'PRODUCTION',
  LOCKED = 'LOCKED'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isDecoy?: boolean;
}

export interface Simulation {
  id: string;
  startTime: number;
  duration: number;
  status: 'RUNNING' | 'COMPLETED';
  valuation?: string;
}

export interface ProjectFile {
  name: string;
  language: string;
  content: string;
}

export interface WorkflowTask {
  id: string;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'HIGH' | 'CRITICAL';
}

export interface VaultEntry {
  id: string;
  timestamp: string;
  data: string;
  type: 'LOG' | 'SECURITY' | 'INTEL';
}
