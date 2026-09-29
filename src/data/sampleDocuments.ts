import { KnowledgeDocument } from '../types';

export const SAMPLE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'DOC-MRPL-SOP-2401',
    title: 'MRPL-SOP-MNT-2401: Hydrodesulfurization (DHDS) Reactor Bed Inspection & Catalyst Regeneration Protocol',
    category: 'SOP',
    format: 'PDF',
    size: '4.8 MB',
    pageCount: 38,
    chunkCount: 142,
    indexedAt: '2026-09-18 14:22:10',
    sourceUnit: 'DHDS Unit #2 (Mangalore Phase-III)',
    clearanceLevel: 'RESTRICTED',
    status: 'INDEXED',
    summary: 'Standard operating procedure for internal ultrasonic thickness gauging, nozzle flange seal integrity, and pressure drop delta thresholds across DHDS catalyst beds (R-01/R-02).',
    tags: ['DHDS', 'Reactor', 'Inspection', 'Catalyst', 'Pressure Drop', 'SOP-2401'],
    chunks: [
      {
        id: 'chunk-2401-14',
        page: 14,
        text: 'Section 4.3.2 Permissible Wall Thinning: For 1.25Cr-0.5Mo hydrogen service vessels operating at >380°C, nominal shell thickness is 82.5 mm. If localized ultrasonic thickness measurement indicates wall thinning exceeding 4.2 mm (measured thickness < 78.3 mm), an immediate Level 2 Fitness-for-Service (FFS) engineering evaluation per API 579-1/ASME FFS-1 is mandatory prior to recommissioning.',
        embeddingPreview: [0.042, -0.118, 0.821, -0.344, 0.091, 0.512]
      },
      {
        id: 'chunk-2401-18',
        page: 18,
        text: 'Section 5.1 Pressure Drop Limits: The maximum allowable differential pressure across the catalyst support grid is 1.85 kg/cm². If DP exceeds 1.65 kg/cm² during normal throughput (220 m³/hr), nitrogen recirculation skimming must be scheduled within 72 hours to prevent catalyst channeling and thermal runaway risk.',
        embeddingPreview: [0.112, 0.089, -0.421, 0.672, -0.198, 0.334]
      },
      {
        id: 'chunk-2401-29',
        page: 29,
        text: 'Section 8.4 Approval Note Workflow: Any non-destructive testing (NDT) finding indicating surface crack indications on nozzle N-04 welds or flange sealing face pitting > 0.8 mm depth requires a formal Approval Note counter-signed by the Deputy General Manager (Inspection) and Lead Materials Metallurgist before bolt torquing.',
        embeddingPreview: [0.291, -0.402, 0.119, -0.043, 0.761, -0.125]
      }
    ]
  },
  {
    id: 'DOC-MRPL-INSP-2026-041',
    title: 'MRPL-INSP-2026-DHDS-041: Annual Turnaround NDT Inspection Report — Reactor Vessel R-02',
    category: 'INSPECTION_REPORT',
    format: 'PDF',
    size: '12.4 MB',
    pageCount: 52,
    chunkCount: 198,
    indexedAt: '2026-09-22 09:15:44',
    sourceUnit: 'DHDS Reactor R-02 (Plant Unit 42)',
    clearanceLevel: 'RESTRICTED',
    status: 'INDEXED',
    summary: 'Comprehensive non-destructive examination including PAUT (Phased Array UT), TOFD, magnetic particle inspection, and flange gasket face profilometry on vessel R-02.',
    tags: ['Inspection', 'NDT', 'PAUT', 'Wall Thickness', 'Defect Log', 'Turnaround-2026'],
    chunks: [
      {
        id: 'chunk-041-07',
        page: 7,
        text: 'Summary of Ultrasonic Gauging: Shell Ring #3 circumferential band at 270° azimuth measured at 77.8 mm wall thickness (baseline nominal: 82.5 mm; corrosion allowance original: 6.0 mm). Total thinning is 4.7 mm, which exceeds the SOP-2401 screening limit of 4.2 mm thinning.',
        embeddingPreview: [0.038, -0.124, 0.844, -0.311, 0.082, 0.531]
      },
      {
        id: 'chunk-041-11',
        page: 11,
        text: 'Nozzle N-04 (Inlet Quench Line) Examination: Visual and dye penetrant testing revealed radial micro-fissuring along the weld toe heat-affected zone (HAZ) measuring 3.2 mm length, depth estimated at 0.6 mm. Flange gasket face Ra roughness measured 4.2 µm with localized crevice pitting.',
        embeddingPreview: [0.312, -0.388, 0.145, -0.051, 0.742, -0.109]
      }
    ]
  },
  {
    id: 'DOC-MRPL-MAN-HEX102',
    title: 'MRPL-ENG-MAN-HEX-102: Shell & Tube Heat Exchanger Operational Limits & Fouling Coefficients',
    category: 'EQUIPMENT_MANUAL',
    format: 'PDF',
    size: '8.1 MB',
    pageCount: 64,
    chunkCount: 220,
    indexedAt: '2026-09-15 11:00:22',
    sourceUnit: 'Crude Distillation Unit (CDU-1)',
    clearanceLevel: 'INTERNAL',
    status: 'INDEXED',
    summary: 'Thermal rating datasheet, TEMA class R specifications, fouling factor equations, and cleaning cycle thresholds for heavy naphtha preheat exchanger train E-102A/B.',
    tags: ['TEMA-R', 'Heat Exchanger', 'Fouling', 'LMTD', 'Calculation Spec'],
    chunks: [
      {
        id: 'chunk-hex-05',
        page: 5,
        text: 'Equation 3.1 Overall Heat Transfer Coefficient: U_dirty = 1 / (1/U_clean + R_fouling_shell + R_fouling_tube). When fouling resistance R_f exceeds 0.00055 m²·K/W or overall thermal effectiveness drops below 68%, chemical descaling or hydro-jetting at 1000 bar is required.',
        embeddingPreview: [-0.219, 0.441, 0.110, -0.098, 0.612, 0.198]
      }
    ]
  },
  {
    id: 'DOC-API-510-MRPL-GUIDE',
    title: 'API Standard 510 / MRPL Corporate Safety Protocol: Pressure Vessel In-Service Inspection Code',
    category: 'SAFETY_STANDARD',
    format: 'PDF',
    size: '6.2 MB',
    pageCount: 88,
    chunkCount: 310,
    indexedAt: '2026-09-10 16:40:00',
    sourceUnit: 'Corporate Reliability & Inspection Division',
    clearanceLevel: 'CONFIDENTIAL',
    status: 'INDEXED',
    summary: 'Corporate compliance guidelines for maximum allowable working pressure (MAWP) derating, corrosion rate determination, and remaining life calculations for refining assets.',
    tags: ['API 510', 'Safety', 'MAWP', 'Remaining Life', 'Corrosion Rate'],
    chunks: [
      {
        id: 'chunk-api-12',
        page: 12,
        text: 'Remaining Life Calculation: Remaining Life (years) = (t_actual - t_minimum) / Corrosion_Rate. If calculated remaining life is less than 2.0 years or next planned turnaround interval, vessel must either be derated in operating pressure or weld-overlay restored.',
        embeddingPreview: [0.188, -0.045, 0.522, 0.312, -0.211, 0.419]
      }
    ]
  }
];
