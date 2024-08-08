namespace CVSS31 {
  const roundUp1 = (input: number): number => {
    const intInput = Math.round(input * 100000);
  
    if (intInput % 10000 === 0) {
      return intInput / 100000;
    } else {
      return (Math.floor(intInput / 10000) + 1) / 10;
    }
  };
  
  interface SeverityRating {
    bottom: number;
    top: number;
    name: string;
  }

  



    const CVSSVersionIdentifier = "CVSS:3.1";
    const exploitabilityCoefficient = 8.22;
    const scopeCoefficient = 1.08;
  
    // A regular expression to validate that a CVSS 3.1 vector string is well formed. It checks metrics and metric
    // values. It does not check that a metric is specified more than once and it does not check that all base
    // metrics are present. These checks need to be performed separately.
  
    const vectorStringRegex_31 = /^CVSS:3\.[01]\/((AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])\/)*(AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$/;
  
    // Associative arrays mapping each metric value to the constant defined in the CVSS scoring formula in the CVSS v3.1
    // specification.
  
    interface Map {
      [key: number]: number | undefined
    }

    const Weight = {
      AV: { N: 0.85, A: 0.62, L: 0.55, P: 0.2 },
      AC: { H: 0.44, L: 0.77 },
      PR: {
        U: { N: 0.85, L: 0.62, H: 0.27 }, // These values are used if Scope is Unchanged
        C: { N: 0.85, L: 0.68, H: 0.5 }, // These values are used if Scope is Changed
      },
      UI: { N: 0.85, R: 0.62 },
      S: { U: 6.42, C: 7.52 }, // Note: not defined as constants in specification
      CIA: { N: 0, L: 0.22, H: 0.56 }, // C, I and A have the same weights
  
      E: { X: 1, U: 0.91, P: 0.94, F: 0.97, H: 1 },
      RL: { X: 1, O: 0.95, T: 0.96, W: 0.97, U: 1 },
      RC: { X: 1, U: 0.92, R: 0.96, C: 1 },
  
      CIAR: { X: 1, L: 0.5, M: 1, H: 1.5 }, // CR, IR and AR have the same weights
    };
  
    // Severity rating bands, as defined in the CVSS v3.1 specification.
    const severityRatings = [
      { name: "None", bottom: 0.0, top: 0.0 },
      { name: "Low", bottom: 0.1, top: 3.9 },
      { name: "Medium", bottom: 4.0, top: 6.9 },
      { name: "High", bottom: 7.0, top: 8.9 },
      { name: "Critical", bottom: 9.0, top: 10.0 },
    ];

    const severityRating = (score: number): string | undefined => {
      const severityRatingLength = severityRatings.length;
      const validatedScore = Number(score);
    
      if (isNaN(validatedScore)) {
        return undefined;
      }
    
      for (let i = 0; i < severityRatingLength; i++) {
        if (validatedScore >= severityRatings[i].bottom && validatedScore <= severityRatings[i].top) {
          return severityRatings[i].name;
        }
      }
    
      return undefined;
    };
    
    interface MetricValues {
      AV?: string;
      AC?: string;
      PR?: string;
      UI?: string;
      S?: string;
      C?: string;
      I?: string;
      A?: string;
      E?: string;
      RL?: string;
      RC?: string;
      CR?: string;
      IR?: string;
      AR?: string;
      MAV?: string;
      MAC?: string;
      MPR?: string;
      MUI?: string;
      MS?: string;
      MC?: string;
      MI?: string;
      MA?: string;
    }
    
    const generateXMLFromVector = (vectorString: string): string => {
      const metricValues: MetricValues = {
        AV:  undefined, AC:  undefined, PR:  undefined, UI:  undefined, S:  undefined,
        C:   undefined, I:   undefined, A:   undefined,
        E:   undefined, RL:  undefined, RC:  undefined,
        CR:  undefined, IR:  undefined, AR:  undefined,
        MAV: undefined, MAC: undefined, MPR: undefined, MUI: undefined, MS: undefined,
        MC:  undefined, MI:  undefined, MA:  undefined
      };
      let xml = '<metrics>';
    for (const [key, value] of Object.entries(metricValues)) {
      if (value !== undefined) {
        xml += `<${key}>${value}</${key}>`;
      }
    }
    xml += '</metrics>';

    return xml;
    };



    interface MetricNames {
      [key: string]: { [key: string]: string };
    }
    
    const XML_MetricNames: MetricNames = {
      E: { X: "NOT_DEFINED", U: "UNPROVEN", P: "PROOF_OF_CONCEPT", F: "FUNCTIONAL", H: "HIGH" },
      RL: { X: "NOT_DEFINED", O: "OFFICIAL_FIX", T: "TEMPORARY_FIX", W: "WORKAROUND", U: "UNAVAILABLE" },
      RC: { X: "NOT_DEFINED", U: "UNKNOWN", R: "REASONABLE", C: "CONFIRMED" },
      CIAR: { X: "NOT_DEFINED", L: "LOW", M: "MEDIUM", H: "HIGH" },
      MAV: { N: "NETWORK", A: "ADJACENT_NETWORK", L: "LOCAL", P: "PHYSICAL", X: "NOT_DEFINED" },
      MAC: { H: "HIGH", L: "LOW", X: "NOT_DEFINED" },
      MPR: { N: "NONE", L: "LOW", H: "HIGH", X: "NOT_DEFINED" },
      MUI: { N: "NONE", R: "REQUIRED", X: "NOT_DEFINED" },
      MS: { U: "UNCHANGED", C: "CHANGED", X: "NOT_DEFINED" },
      MCIA: { N: "NONE", L: "LOW", H: "HIGH", X: "NOT_DEFINED" },
    };

    export function calculateCVSSFromMetrics(
      AttackVector: string, AttackComplexity: "H"|"L", PrivilegesRequired: string, UserInteraction: string, Scope: string, Confidentiality: string, Integrity: string, Availability: string,
      ExploitCodeMaturity?: string, RemediationLevel?: string, ReportConfidence?: string,
      ConfidentialityRequirement?: string, IntegrityRequirement?: string, AvailabilityRequirement?: string,
      ModifiedAttackVector?: string, ModifiedAttackComplexity?: string, ModifiedPrivilegesRequired?: string, ModifiedUserInteraction?: string, ModifiedScope?: string,
      ModifiedConfidentiality?: string, ModifiedIntegrity?: string, ModifiedAvailability?: string) {
    
      const badMetrics: string[] = [];
    
      // ENSURE ALL BASE METRICS ARE DEFINED
      if (!AttackVector)       { badMetrics.push("AV"); }
      if (!AttackComplexity)   { badMetrics.push("AC"); }
      if (!PrivilegesRequired) { badMetrics.push("PR"); }
      if (!UserInteraction)    { badMetrics.push("UI"); }
      if (!Scope)              { badMetrics.push("S");  }
      if (!Confidentiality)    { badMetrics.push("C");  }
      if (!Integrity)          { badMetrics.push("I");  }
      if (!Availability)       { badMetrics.push("A");  }
    
      if (badMetrics.length > 0) {
        return { success: false, errorType: "MissingBaseMetric", errorMetrics: badMetrics };
      }
    
      // STORE THE METRIC VALUES THAT WERE PASSED AS PARAMETERS
      const AV = AttackVector;
      const AC = AttackComplexity;
      const PR = PrivilegesRequired;
      const UI = UserInteraction;
      const S  = Scope;
      const C  = Confidentiality;
      const I  = Integrity;
      const A  = Availability;
    
      const E = ExploitCodeMaturity || "X";
      const RL = RemediationLevel || "X";
      const RC = ReportConfidence || "X";
    
      const CR = ConfidentialityRequirement || "X";
      const IR = IntegrityRequirement || "X";
      const AR = AvailabilityRequirement || "X";
      const MAV = ModifiedAttackVector || "X";
      const MAC = ModifiedAttackComplexity || "X";
      const MPR = ModifiedPrivilegesRequired || "X";
      const MUI = ModifiedUserInteraction || "X";
      const MS = ModifiedScope || "X";
      const MC = ModifiedConfidentiality || "X";
      const MI = ModifiedIntegrity || "X";
      const MA = ModifiedAvailability || "X";
    
      // CHECK VALIDITY OF METRIC VALUES
      if (!Weight.AV.hasOwnProperty(AV)) { badMetrics.push("AV"); }
      if (!Weight.AC.hasOwnProperty(AC)) { badMetrics.push("AC"); }
      if (!Weight.PR.U.hasOwnProperty(PR)) { badMetrics.push("PR"); }
      if (!Weight.UI.hasOwnProperty(UI)) { badMetrics.push("UI"); }
      if (!Weight.S.hasOwnProperty(S)) { badMetrics.push("S"); }
      if (!Weight.CIA.hasOwnProperty(C)) { badMetrics.push("C"); }
      if (!Weight.CIA.hasOwnProperty(I)) { badMetrics.push("I"); }
      if (!Weight.CIA.hasOwnProperty(A)) { badMetrics.push("A"); }
    
      if (!Weight.E.hasOwnProperty(E)) { badMetrics.push("E"); }
      if (!Weight.RL.hasOwnProperty(RL)) { badMetrics.push("RL"); }
      if (!Weight.RC.hasOwnProperty(RC)) { badMetrics.push("RC"); }
    
      if (!(CR === "X" || Weight.CIAR.hasOwnProperty(CR))) { badMetrics.push("CR"); }
      if (!(IR === "X" || Weight.CIAR.hasOwnProperty(IR))) { badMetrics.push("IR"); }
      if (!(AR === "X" || Weight.CIAR.hasOwnProperty(AR))) { badMetrics.push("AR"); }
      if (!(MAV === "X" || Weight.AV.hasOwnProperty(MAV))) { badMetrics.push("MAV"); }
      if (!(MAC === "X" || Weight.AC.hasOwnProperty(MAC))) { badMetrics.push("MAC"); }
      if (!(MPR === "X" || Weight.PR.U.hasOwnProperty(MPR))) { badMetrics.push("MPR"); }
      if (!(MUI === "X" || Weight.UI.hasOwnProperty(MUI))) { badMetrics.push("MUI"); }
      if (!(MS === "X" || Weight.S.hasOwnProperty(MS))) { badMetrics.push("MS"); }
      if (!(MC === "X" || Weight.CIA.hasOwnProperty(MC))) { badMetrics.push("MC"); }
      if (!(MI === "X" || Weight.CIA.hasOwnProperty(MI))) { badMetrics.push("MI"); }
      if (!(MA === "X" || Weight.CIA.hasOwnProperty(MA))) { badMetrics.push("MA"); }
    
      if (badMetrics.length > 0) {
        return { success: false, errorType: "UnknownMetricValue", errorMetrics: badMetrics };
      }
    
      // GATHER WEIGHTS FOR ALL METRICS
      const metricWeightAV = Weight.AV[AV];
      const metricWeightAC = Weight.AC[AC];
      const metricWeightPR = Weight.PR[S][PR];
      const metricWeightUI = Weight.UI[UI];
      const metricWeightS = Weight.S[S];
      const metricWeightC = Weight.CIA[C];
      const metricWeightI = Weight.CIA[I];
      const metricWeightA = Weight.CIA[A];
    
      const metricWeightE = Weight.E[E];
      const metricWeightRL = Weight.RL[RL];
      const metricWeightRC = Weight.RC[RC];
    
      const metricWeightCR = Weight.CIAR[CR];
      const metricWeightIR = Weight.CIAR[IR];
      const metricWeightAR = Weight.CIAR[AR];
      const metricWeightMAV = Weight.AV[MAV !== "X" ? MAV : AV];
      const metricWeightMAC = Weight.AC[MAC !== "X" ? MAC : AC];
      const metricWeightMPR = Weight.PR[MS !== "X" ? MS : S][MPR !== "X" ? MPR : PR];
      const metricWeightMUI = Weight.UI[MUI !== "X" ? MUI : UI];
      const metricWeightMS = Weight.S[MS !== "X" ? MS : S];
      const metricWeightMC = Weight.CIA[MC !== "X" ? MC : C];
      const metricWeightMI = Weight.CIA[MI !== "X" ? MI : I];
      const metricWeightMA = Weight.CIA[MA !== "X" ? MA : A];
    
      // CALCULATE THE CVSS BASE SCORE
      let iss = (1 - ((1 - metricWeightC) * (1 - metricWeightI) * (1 - metricWeightA)));
    
      let impact: number;
      if (S === 'U') {
        impact = metricWeightS * iss;
      } else {
        impact = metricWeightS * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15);
      }
    
      const exploitability = exploitabilityCoefficient * metricWeightAV * metricWeightAC * metricWeightPR * metricWeightUI;
    
      let baseScore: number;
      if (impact <= 0) {
        baseScore = 0;
      } else {
        if (S === 'U') {
          baseScore = roundUp1(Math.min((exploitability + impact), 10));
        } else {
          baseScore = roundUp1(Math.min(scopeCoefficient * (exploitability + impact), 10));
        }
      }
    
      // CALCULATE THE CVSS TEMPORAL SCORE
      const temporalScore = roundUp1(baseScore * metricWeightE * metricWeightRL * metricWeightRC);
    
      // CALCULATE THE CVSS ENVIRONMENTAL SCORE
      const miss = Math.min(1 - ((1 - metricWeightMC * metricWeightCR) * (1 - metricWeightMI * metricWeightIR) * (1 - metricWeightMA * metricWeightAR)), 0.915);
    
      let modifiedImpact: number;
      if (MS === "U" || (MS === "X" && S === "U")) {
        modifiedImpact = metricWeightMS * miss;
      } else {
        modifiedImpact = metricWeightMS * (miss - 0.029) - 3.25 * Math.pow(miss * 0.9731 - 0.02, 13);
      }
    
      const modifiedExploitability = exploitabilityCoefficient * metricWeightMAV * metricWeightMAC * metricWeightMPR * metricWeightMUI;
    
      let envScore: number;
      if (modifiedImpact <= 0) {
        envScore = 0;
      } else if (MS === "U" || (MS === "X" && S === "U")) {
        envScore = roundUp1(roundUp1(Math.min((modifiedImpact + modifiedExploitability), 10)) * metricWeightE * metricWeightRL * metricWeightRC);
      } else {
        envScore = roundUp1(roundUp1(Math.min(scopeCoefficient * (modifiedImpact + modifiedExploitability), 10)) * metricWeightE * metricWeightRL * metricWeightRC);
      }
    
      // CONSTRUCT THE VECTOR STRING
      let vectorString = `${CVSSVersionIdentifier}/AV:${AV}/AC:${AC}/PR:${PR}/UI:${UI}/S:${S}/C:${C}/I:${I}/A:${A}`;
    
      if (E !== "X") { vectorString += `/E:${E}`; }
      if (RL !== "X") { vectorString += `/RL:${RL}`; }
      if (RC !== "X") { vectorString += `/RC:${RC}`; }
    
      if (CR !== "X") { vectorString += `/CR:${CR}`; }
      if (IR !== "X") { vectorString += `/IR:${IR}`; }
      if (AR !== "X") { vectorString += `/AR:${AR}`; }
      if (MAV !== "X") { vectorString += `/MAV:${MAV}`; }
      if (MAC !== "X") { vectorString += `/MAC:${MAC}`; }
      if (MPR !== "X") { vectorString += `/MPR:${MPR}`; }
      if (MUI !== "X") { vectorString += `/MUI:${MUI}`; }
      if (MS !== "X") { vectorString += `/MS:${MS}`; }
      if (MC !== "X") { vectorString += `/MC:${MC}`; }
      if (MI !== "X") { vectorString += `/MI:${MI}`; }
      if (MA !== "X") { vectorString += `/MA:${MA}`; }
    
      return {
        success: true,
    
        baseMetricScore: baseScore.toFixed(1),
        baseSeverity: severityRating(baseScore),
        baseISS: iss,
        baseImpact: impact,
        baseExploitability: exploitability,
    
        temporalMetricScore: temporalScore.toFixed(1),
        temporalSeverity: severityRating(temporalScore),
    
        environmentalMetricScore: envScore.toFixed(1),
        environmentalSeverity: severityRating(envScore),
        environmentalMISS: miss,
        environmentalModifiedImpact: modifiedImpact,
        environmentalModifiedExploitability: modifiedExploitability,
    
        vectorString: vectorString
      };
    };

  }
  