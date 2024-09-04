import { Cvss3P1 } from 'ae-cvss-calculator';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

import MetricGroup from './metricGroup';
import ScoreBox from './scoreBox';

type CVSSProp = {
  handleCvssChange: (value: string) => void;
  cvssStringInitial?: string;
};

const generateCVSSVector = (
  AV: string,
  AC: string,
  PR: string,
  UI: string,
  S: string,
  C: string,
  I: string,
  A: string,
): string => {
  const cvssComponents = {
    AV,
    AC,
    PR,
    UI,
    S,
    C,
    I,
    A,
  };

  const componentMapping: Record<string, string> = {
    AV: 'AV',
    AC: 'AC',
    PR: 'PR',
    UI: 'UI',
    S: 'S',
    C: 'C',
    I: 'I',
    A: 'A',
  };

  const valueMapping: Record<string, string> = {
    Network: 'N',
    'Adjacent Network': 'A',
    Local: 'L',
    Physical: 'P',
    Low: 'L',
    High: 'H',
    None: 'N',
    Required: 'R',
    Unchanged: 'U',
    Changed: 'C',
  };

  let vectorString = 'CVSS:3.1/';

  Object.entries(cvssComponents).forEach(([key, value], index) => {
    if (value) {
      if (index > 0) {
        vectorString += '/';
      }
      vectorString += `${componentMapping[key]}:${valueMapping[value]}`;
    }
  });

  return vectorString;
};

const CVSSCalculator: React.FC<CVSSProp> = ({
  cvssStringInitial,
  handleCvssChange,
}) => {
  const [AV, setAV] = useState('');
  const [AC, setAC] = useState('');
  const [PR, setPR] = useState('');
  const [UI, setUI] = useState('');
  const [S, setS] = useState('');
  const [C, setC] = useState('');
  const [I, setI] = useState('');
  const [A, setA] = useState('');

  const [changed, setChanged] = useState(false);

  const noneLowHighOptions = [
    { label: t('cvss.none'), value: 'None' },
    { label: t('cvss.low'), value: 'Low' },
    { label: t('cvss.high'), value: 'High' },
  ];

  const avOptions = [
    { label: t('cvss.network'), value: 'Network' },
    { label: t('cvss.adjacentNetwork'), value: 'Adjacent Network' },
    { label: t('cvss.local'), value: 'Local' },
    { label: t('cvss.physical'), value: 'Physical' },
  ];

  const acOptions = [
    { label: t('cvss.low'), value: 'Low' },
    { label: t('cvss.high'), value: 'High' },
  ];

  const uiOptions = [
    { label: t('cvss.none'), value: 'None' },
    { label: t('cvss.required'), value: 'Required' },
  ];

  const scopeOptions = [
    { label: t('cvss.unchanged'), value: 'Unchanged' },
    { label: t('cvss.changed'), value: 'Changed' },
  ];

  const parseCVSSVector = (vector: string) => {
    const valueMappings: Record<string, Record<string, string>> = {
      AV: { N: 'Network', A: 'Adjacent Network', L: 'Local', P: 'Physical' },
      AC: { H: 'High', L: 'Low' },
      PR: { N: 'None', L: 'Low', H: 'High' },
      UI: { N: 'None', R: 'Required' },
      S: { U: 'Unchanged', C: 'Changed' },
      C: { H: 'High', L: 'Low', N: 'None' },
      I: { H: 'High', L: 'Low', N: 'None' },
      A: { H: 'High', L: 'Low', N: 'None' },
    };

    const parts = vector.split('/').slice(1);
    parts.forEach(part => {
      const [key, value] = part.split(':');
      const mappedValue = valueMappings[key][value] || '';
      switch (key) {
        case 'AV':
          setAV(mappedValue);
          break;

        case 'AC':
          setAC(mappedValue);
          break;

        case 'PR':
          setPR(mappedValue);
          break;

        case 'UI':
          setUI(mappedValue);
          break;

        case 'S':
          setS(mappedValue);
          break;

        case 'C':
          setC(mappedValue);
          break;

        case 'I':
          setI(mappedValue);
          break;

        case 'A':
          setA(mappedValue);
          break;

        default:
          break;
      }
    });
    setChanged(true);
  };

  const [currentScore, setCurrentScore] = useState<number>();
  const [currentSeverity, setCurrentSeverity] = useState<string>(
    t('cvss.infoWhenNoScore'),
  );

  useEffect(() => {
    if (cvssStringInitial) {
      parseCVSSVector(cvssStringInitial);
    } else {
      setChanged(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (changed) {
      const cvssVector = generateCVSSVector(AV, AC, PR, UI, S, C, I, A);
      handleCvssChange(cvssVector);
      if (cvssVector.length === 44) {
        const cvss3 = new Cvss3P1(cvssVector);
        const score = cvss3.calculateExactOverallScore();
        if (score < 4) {
          setCurrentSeverity('Low');
        } else if (score < 7) {
          setCurrentSeverity('Medium');
        } else if (score < 9) {
          setCurrentSeverity('High');
        } else {
          setCurrentSeverity('Critical');
        }
        setCurrentScore(cvss3.calculateExactOverallScore());
      }
    }
  }, [AV, AC, PR, UI, S, C, I, A, changed, handleCvssChange]);

  return (
    <div className="relative w-full p-6 bg-slate-700 border border-gray-200 rounded-lg">
      
      <ScoreBox score={currentScore}/>

      <h2 className="text-xl font-semibold text-center mb-8">
        {t('cvss.title')}
      </h2>
      
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <MetricGroup
            label={t('cvss.attackVector')}
            onSelect={setAV}
            options={avOptions}
            selectedOption={AV}
          />
          <MetricGroup
            label={t('cvss.attackComplexity')}
            onSelect={setAC}
            options={acOptions}
            selectedOption={AC}
          />
          <MetricGroup
            label={t('cvss.privilegesRequired')}
            onSelect={setPR}
            options={noneLowHighOptions}
            selectedOption={PR}
          />
          <MetricGroup
            label={t('cvss.userInteraction')}
            onSelect={setUI}
            options={uiOptions}
            selectedOption={UI}
          />
        </div>
        <div>
          <MetricGroup
            label={t('cvss.scope')}
            onSelect={setS}
            options={scopeOptions}
            selectedOption={S}
          />
          <MetricGroup
            label={t('cvss.confidentialityImpact')}
            onSelect={setC}
            options={noneLowHighOptions}
            selectedOption={C}
          />
          <MetricGroup
            label={t('cvss.integrityImpact')}
            onSelect={setI}
            options={noneLowHighOptions}
            selectedOption={I}
          />
          <MetricGroup
            label={t('cvss.availabilityImpact')}
            onSelect={setA}
            options={noneLowHighOptions}
            selectedOption={A}
          />
        </div>
      </div>
    </div>
  );
};

export default CVSSCalculator;
