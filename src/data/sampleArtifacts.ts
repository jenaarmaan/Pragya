import { GeneratedArtifact } from '../types';

export const SAMPLE_ARTIFACTS: GeneratedArtifact[] = [
  {
    id: 'ART-MRPL-2026-001',
    taskId: 'TSK-MRPL-2026-0891',
    name: 'MRPL_DHDS_Reactor_Inspection_Approval_Note.docx',
    format: 'DOCX',
    size: '48.2 KB',
    generatedAt: '2026-09-23 09:20:38',
    verified: true,
    approvalStatus: 'PENDING',
    description: 'Executive Technical Approval Note for DGM (Inspection) regarding Reactor R-02 NDT ultrasonic wall thinning and Nozzle N-04 repairs.',
    content: `================================================================================
MANGALORE REFINERY AND PETROCHEMICALS LIMITED (MRPL)
KUTTIKADU, MANGALORE - 575030, KARNATAKA, INDIA
INSPECTION & METALLURGY DIVISION — TECHNICAL APPROVAL NOTE
================================================================================

DOCUMENT REF: MRPL/INSP/DHDS-2/R02/2026-AN-041
DATE: 23 September 2026
CLASSIFICATION: CONFIDENTIAL // STRICT AIR-GAP PROCESSED
EQUIPMENT TAG: R-02 (Second-Stage Hydrodesulfurization Reactor)
PLANT UNIT: DHDS Unit-II (Phase-III Expansion)
TARGET APPROVER: Deputy General Manager (Inspection & Materials)

1. EXECUTIVE SUMMARY & BACKGROUND
--------------------------------------------------------------------------------
During the ongoing Scheduled Annual Turnaround (Turnaround-2026), comprehensive
Non-Destructive Testing (NDT) was conducted on Reactor Vessel R-02 in accordance
with MRPL-SOP-MNT-2401 and API Standard 510. Vessel R-02 operates under severe
high-temperature, high-pressure hydrogen service (P_design = 142 kg/cm²g, 
T_design = 415°C, Material: SA-387 Grade 11 Class 2, 1.25Cr-0.5Mo).

This Approval Note is generated autonomously by PRAGYA On-Premise Sovereign AI
Workbench to summarize critical non-conformances requiring engineering approval
prior to catalyst reloading and bolt torquing.

2. SUMMARY OF INSPECTION FINDINGS vs. SOP MANDATES
--------------------------------------------------------------------------------
FINDING #1: Shell Ring #3 Wall Thinning
- Nominal Baseline Thickness: 82.5 mm
- Minimum Measured Thickness: 77.8 mm (Circumferential band at 270° azimuth)
- Total Metal Loss / Thinning: 4.7 mm
- SOP Screening Limit (MRPL-SOP-MNT-2401 Sec 4.3.2): 4.2 mm maximum allowable
- Delta: +0.5 mm in excess of standard operational screening limit
- Compliance Status: NON-CONFORMING. Mandates Level 2 Fitness-for-Service (FFS).

FINDING #2: Nozzle N-04 (Inlet Quench Line) Weld Toe Micro-Fissuring
- Indication: 3.2 mm length radial surface fissure identified in Heat-Affected Zone (HAZ)
- Estimated depth: 0.6 mm
- Flange Sealing Face: Ra roughness 4.2 µm with localized crevice pitting up to 0.9 mm
- SOP Mandate (MRPL-SOP-MNT-2401 Sec 8.4): Mandatory DGM sign-off required.

3. RISK EVALUATION & COMPLIANCE VERIFICATION
--------------------------------------------------------------------------------
The calculated remaining corrosion allowance is 1.3 mm. Based on an estimated
corrosion rate of 0.35 mm/year, the projected remaining life without derating
is 3.7 years, exceeding the mandatory 2.0-year minimum threshold of API 510.
However, due to the high-temperature hydrogen attack (HTHA) envelope under Nelson
Curve considerations, the localized HAZ micro-fissure poses an unacceptable risk
of crack propagation during hydrotest pressurization.

4. ACTIONABLE RECOMMENDATIONS FOR SIGN-OFF
--------------------------------------------------------------------------------
[1] AUTHORIZATION OF REPAIR:
    Excavate the 3.2 mm HAZ crack on Nozzle N-04 using rotary burr grinding down
    to sound metal, confirmed by 100% fluorescent dye-penetrant testing (PT).
    Execute weld overlay restoration using AWS E8018-B2 electrode followed by
    localized Post-Weld Heat Treatment (PWHT) at 675°C ± 15°C.

[2] INTERIM OPERATIONAL DERATING:
    Until a comprehensive Level 2 FFS analysis is completed per API 579-1 Part 5,
    derate the operating pressure to 125 kg/cm²g (from normal 138 kg/cm²g).

[3] CATALYST SUPPORT GRID INSPECTION:
    Confirm differential pressure across Bed-2 grid remains under 1.65 kg/cm²
    prior to nitrogen loop restart.

5. SIGN-OFF BLOCK & AUDIT SIGNATURES
--------------------------------------------------------------------------------
Prepared By: PRAGYA Sovereign Industrial AI Agent (Model: Qwen-2.5-72B-AWQ)
Checked By:  K. S. Rao (Lead Maintenance Metallurgist, MRPL)
Sign-off:    [ PENDING DGM INSPECTION COUNTER-SIGNATURE ]
Audit Hash:  SHA256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d67280...
Network State: ZERO EXTERNAL EGRESS // VERIFIED ON-PREMISE AIR-GAP
================================================================================`
  },
  {
    id: 'ART-MRPL-2026-002',
    taskId: 'TSK-MRPL-2026-0892',
    name: 'Heat_Exchanger_HEX102_Fouling_Analysis.py',
    format: 'PY',
    size: '8.4 KB',
    generatedAt: '2026-09-22 14:11:10',
    verified: true,
    approvalStatus: 'APPROVED',
    description: 'Python calculation script for LMTD, heat duty, and fouling resistance for heavy naphtha preheat exchanger E-102A.',
    content: `"""
MRPL Refinery — Heat Exchanger E-102A Thermal Rating & Fouling Assessment
Standard: TEMA Class R / API 660
Asset: E-102A/B Heavy Naphtha / Crude Preheat Train
Generated by PRAGYA AI Workbench (Qwen-2.5-Coder-32B)
"""

import math

def calculate_lmtd(t_hot_in, t_hot_out, t_cold_in, t_cold_out):
    """Calculates Log Mean Temperature Difference for counter-current flow."""
    delta_t1 = t_hot_in - t_cold_out
    delta_t2 = t_hot_out - t_cold_in
    
    if delta_t1 == delta_t2:
        return delta_t1
    
    return (delta_t1 - delta_t2) / math.log(delta_t1 / delta_t2)

def calculate_fouling_factor(q_watts, area_m2, lmtd_c, u_clean):
    """
    Computes fouling resistance Rf = (1/U_dirty) - (1/U_clean)
    q_watts: Heat duty in Watts
    area_m2: Heat transfer surface area (m²)
    lmtd_c: Log Mean Temp Difference (°C)
    u_clean: Design clean heat transfer coefficient (W/m²·K)
    """
    u_dirty = q_watts / (area_m2 * lmtd_c)
    rf = (1.0 / u_dirty) - (1.0 / u_clean)
    return u_dirty, rf

if __name__ == "__main__":
    # Operating conditions extracted from MRPL PI Historian
    T_HOT_IN = 210.0   # Heavy Naphtha in (°C)
    T_HOT_OUT = 145.0  # Heavy Naphtha out (°C)
    T_COLD_IN = 110.0  # Crude oil in (°C)
    T_COLD_OUT = 168.0 # Crude oil out (°C)
    
    AREA = 385.0       # Effective surface area (m²)
    HEAT_DUTY = 6.42e6 # 6.42 MW (Watts)
    U_DESIGN = 580.0   # Design clean U (W/m²·K)
    
    lmtd = calculate_lmtd(T_HOT_IN, T_HOT_OUT, T_COLD_IN, T_COLD_OUT)
    u_actual, rf = calculate_fouling_factor(HEAT_DUTY, AREA, lmtd, U_DESIGN)
    
    print("=" * 60)
    print("MRPL E-102A THERMAL PERFORMANCE REPORT")
    print(f"LMTD (Counter-current) : {lmtd:.2f} °C")
    print(f"Current Dirty U        : {u_actual:.2f} W/m²·K")
    print(f"Fouling Resistance (Rf): {rf:.6f} m²·K/W")
    
    THRESHOLD_RF = 0.00055
    if rf > THRESHOLD_RF:
        print(f"[ALERT] Fouling factor {rf:.6f} EXCEEDS TEMA threshold {THRESHOLD_RF}!")
        print("RECOMMENDATION: Schedule offline hydro-jetting during next maintenance window.")
    else:
        print("[NOMINAL] Fouling within allowable design limits.")
    print("=" * 60)
`
  },
  {
    id: 'ART-MRPL-2026-003',
    taskId: 'TSK-MRPL-2026-0891',
    name: 'Corrosion_Rate_Remaining_Life_Assessment.xlsx',
    format: 'XLSX',
    size: '22.8 KB',
    generatedAt: '2026-09-23 09:20:39',
    verified: true,
    approvalStatus: 'PENDING',
    description: 'Tabular dataset of UT thickness readings across Shell Rings 1 through 5 with API 510 remaining life extrapolations.',
    content: `Circuit_ID,Location,Nominal_mm,Actual_2024_mm,Actual_2026_mm,Loss_2yr_mm,CorrosionRate_mm_yr,Min_Allowable_mm,Remaining_Life_yrs,Status
DHDS-R02-C1,Ring 1 (Top Head),78.0,76.5,75.9,0.6,0.30,68.2,25.6,NOMINAL
DHDS-R02-C2,Ring 2 (Upper Bed),80.0,77.8,77.1,0.7,0.35,70.5,18.8,NOMINAL
DHDS-R02-C3,Ring 3 (270 Azimuth),82.5,79.2,77.8,1.4,0.70,72.0,8.2,CRITICAL_ATTENTION
DHDS-R02-C4,Ring 4 (Lower Bed),82.5,80.1,79.4,0.7,0.35,72.0,21.1,NOMINAL
DHDS-R02-C5,Ring 5 (Bottom Cone),92.0,89.5,88.9,0.6,0.30,78.5,34.6,NOMINAL`
  },
  {
    id: 'ART-MRPL-2026-004',
    taskId: 'TSK-MRPL-2026-0893',
    name: 'Crude_Distillation_PID_Tag_Inventory.json',
    format: 'JSON',
    size: '14.5 KB',
    generatedAt: '2026-09-21 16:31:55',
    verified: true,
    approvalStatus: 'APPROVED',
    description: 'Extracted instrument and valve tag metadata from drawing MRPL-PID-CRU-301 using Qwen2-VL.',
    content: `{
  "drawing_id": "MRPL-PID-CRU-301",
  "drawing_title": "Crude Distillation Column C-101 Overhead & Reflux Loop",
  "extracted_by": "PRAGYA Multimodal Vision Parser (Qwen2-VL-7B)",
  "confidence_score": 0.994,
  "instruments": [
    { "tag": "PT-10101", "type": "Pressure Transmitter", "range": "0-6 kg/cm2g", "loop": "C-101 Top Pressure", "safety_critical": true },
    { "tag": "TT-10104", "type": "Temperature Transmitter", "range": "0-250 C", "loop": "Overhead Vapor Line", "safety_critical": true },
    { "tag": "FT-10109", "type": "Flow Transmitter (Orifice)", "range": "0-300 m3/hr", "loop": "Reflux Return Line", "safety_critical": false },
    { "tag": "LCV-10102", "type": "Pneumatic Control Valve", "action": "Fail Close", "loop": "Reflux Drum Level Control", "safety_critical": true }
  ]
}`
  }
];
