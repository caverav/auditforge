import { Cvss3P1 } from 'ae-cvss-calculator';
import React, { useEffect, useState } from 'react';

import MetricGroup from './components/MetricGroup';

type CVSSProp = {
  handleCvssChange: (value: string) => void;
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
      vectorString += `${componentMapping[key]}:${valueMapping[value]}`;
      if (index < Object.keys(cvssComponents).length - 1) {
        vectorString += '/';
      }
    }
  });

  return vectorString;
};

const CVSSCalculator: React.FC<CVSSProp> = ({ handleCvssChange }) => {
  const [AV, setAV] = useState('');
  const [AC, setAC] = useState('');
  const [PR, setPR] = useState('');
  const [UI, setUI] = useState('');
  const [S, setS] = useState('');
  const [C, setC] = useState('');
  const [I, setI] = useState('');
  const [A, setA] = useState('');

  const [currentScore, setCurrentScote] = useState<number>(0);
  //const [cvssVectorValue, setCvssVectorValue] = useState<string>('');

  useEffect(() => {
    const cvssVector = generateCVSSVector(AV, AC, PR, UI, S, C, I, A);
    handleCvssChange(cvssVector);
    const cvss3 = new Cvss3P1(cvssVector);
    setCurrentScote(cvss3.calculateExactOverallScore());
  }, [A, AC, AV, C, I, PR, S, UI, handleCvssChange]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-700 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-8">
        CVSS v3.1 Base Score
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <MetricGroup
            label="Attack Vector"
            onSelect={setAV}
            options={['Network', 'Adjacent Network', 'Local', 'Physical']}
            selectedOption={AV}
          />
          <MetricGroup
            label="Attack Complexity"
            onSelect={setAC}
            options={['Low', 'High']}
            selectedOption={AC}
          />
          <MetricGroup
            label="Privileges Required"
            onSelect={setPR}
            options={['None', 'Low', 'High']}
            selectedOption={PR}
          />
          <MetricGroup
            label="User Interaction"
            onSelect={setUI}
            options={['None', 'Required']}
            selectedOption={UI}
          />
        </div>
        <div>
          <MetricGroup
            label="Scope"
            onSelect={setS}
            options={['Unchanged', 'Changed']}
            selectedOption={S}
          />
          <MetricGroup
            label="Confidentiality Impact"
            onSelect={setC}
            options={['None', 'Low', 'High']}
            selectedOption={C}
          />
          <MetricGroup
            label="Integrity Impact"
            onSelect={setI}
            options={['None', 'Low', 'High']}
            selectedOption={I}
          />
          <MetricGroup
            label="Availability Impact"
            onSelect={setA}
            options={['None', 'Low', 'High']}
            selectedOption={A}
          />
        </div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-bold">Base Score: {currentScore}</h3>
      </div>
    </div>
  );
};

export default CVSSCalculator;
