import { FederatedNode, FederatedRound } from '../types';

export const FEDERATED_NODES: FederatedNode[] = [
  {
    id: 'NODE-MRPL-MANGALORE',
    name: 'MRPL Mangalore Plant (Host Node)',
    location: 'Mangalore, Karnataka',
    status: 'SYNCED',
    localDataCount: 14820,
    lastRoundLoss: 0.184,
    computeNode: '4x NVIDIA H100 SXM5 (Local On-Prem HPC)',
    privacyEpsilon: 1.15
  },
  {
    id: 'NODE-CPCL-CHENNAI',
    name: 'CPCL Manali Refinery Node',
    location: 'Chennai, Tamil Nadu',
    status: 'SYNCED',
    localDataCount: 11450,
    lastRoundLoss: 0.198,
    computeNode: '4x NVIDIA A100-80GB (Air-Gapped Secure Enclave)',
    privacyEpsilon: 1.20
  },
  {
    id: 'NODE-IOCL-PARADIP',
    name: 'IOCL Paradip Coastal Refinery',
    location: 'Paradip, Odisha',
    status: 'SYNCED',
    localDataCount: 18230,
    lastRoundLoss: 0.176,
    computeNode: '8x NVIDIA A100 (Isolated Data Cleanroom)',
    privacyEpsilon: 1.18
  }
];

export const FEDERATED_ROUNDS: FederatedRound[] = [
  {
    roundNumber: 12,
    status: 'COMPLETED',
    startedAt: '2026-09-22 02:00:00',
    completedAt: '2026-09-22 04:35:12',
    globalLoss: 0.179,
    accuracyDelta: '+2.8% on Refinery NDT Inspection Diagnostics',
    participatingNodes: 3,
    differentialPrivacyBudget: 'ε = 1.20, δ = 1e-5 (Gaussian Mechanism)',
    aggregationMethod: 'FedAvg with Secure Differential Privacy Aggregation'
  },
  {
    roundNumber: 11,
    status: 'COMPLETED',
    startedAt: '2026-09-15 02:00:00',
    completedAt: '2026-09-15 04:22:00',
    globalLoss: 0.201,
    accuracyDelta: '+3.4% on P&ID Symbol Recognition',
    participatingNodes: 3,
    differentialPrivacyBudget: 'ε = 1.20, δ = 1e-5',
    aggregationMethod: 'FedAvg + Secure Aggregation (Flower Compatible)'
  },
  {
    roundNumber: 10,
    status: 'COMPLETED',
    startedAt: '2026-09-08 02:00:00',
    completedAt: '2026-09-08 04:18:40',
    globalLoss: 0.235,
    accuracyDelta: '+4.1% on Hydrocracker Thermal Fouling Predictions',
    participatingNodes: 3,
    differentialPrivacyBudget: 'ε = 1.20, δ = 1e-5',
    aggregationMethod: 'FedAvg'
  }
];
