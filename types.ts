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

export interface ProductionStream {
  id: string;
  startTime: number;
  duration: number;
  status: 'ACTIVE' | 'SETTLED' | 'HALTED';
  valuation?: string;
  load: number;
  threatLevel: 'LOW' | 'MED' | 'HIGH';
  auditor: string; // "Adi Radosavlevici"
}

export interface ProjectFile {
  id: string;
  name: string;
  language: string;
  content: string;
  lastModified: string;
}

export interface WorkflowTask {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'HIGH' | 'CRITICAL';
  assignee: string;
}

export interface VaultEntry {
  id: string;
  timestamp: string;
  data: string;
  type: 'LOG' | 'SECURITY' | 'INTEL';
}