import React, { useState } from 'react';
import MetricGroup from './MetricGroup';
import { Cvss3P1 } from 'ae-cvss-calculator';

function generateCVSSVector(
    AV: string,
    AC: string,
    PR: string,
    UI: string,
    S: string,
    C: string,
    I: string,
    A: string
  ): string {
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
  
    const componentMapping: { [key: string]: string } = {
      AV: 'AV',
      AC: 'AC',
      PR: 'PR',
      UI: 'UI',
      S: 'S',
      C: 'C',
      I: 'I',
      A: 'A',
    };

    const valueMapping: { [key: string]: string } = {
        'Network': 'N',
        'Adjacent Network': 'A',
        'Local': 'L',
        'Physical': 'P',
        'Low': 'L',
        'High': 'H',
        'None': 'N',
        'Required': 'R',
        'Unchanged': 'U',
        'Changed': 'C'
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
  }

const CVSSCalculator: React.FC = () => {
    const [AV, setAV] = useState('');
    const [AC, setAC] = useState('');
    const [PR, setPR] = useState('');
    const [UI, setUI] = useState('');
    const [S, setS] = useState('');
    const [C, setC] = useState('');
    const [I, setI] = useState('');
    const [A, setA] = useState('');

    const calculateCVSS = () => {
        const cvssVector = generateCVSSVector(AV, AC, PR, UI, S, C, I, A);
        const cvss3 = new Cvss3P1(cvssVector)
        console.log(cvss3.calculateScores(true)) 

        /*
        Por si se desea ocupar o modificar, el objeto cvss3 retorna

        { base: 10, impact: 10, 
            exploitability: 10, temporal: undefined,
            environmental: undefined, modifiedImpact: undefined, 
            overall: 10, 
            vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:L/A:H" }
        
        */

        return cvss3.calculateExactOverallScore();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-slate-700 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-8">CVSS v3.1 Base Score</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
            <MetricGroup 
                label="Attack Vector"
                options={['Network', 'Adjacent Network', 'Local', 'Physical']}
                selectedOption={AV}
                onSelect={setAV}
            />
            <MetricGroup 
                label="Attack Complexity"
                options={['Low', 'High']}
                selectedOption={AC}
                onSelect={setAC}
            />
            <MetricGroup 
                label="Privileges Required"
                options={['None', 'Low', 'High']}
                selectedOption={PR}
                onSelect={setPR}
            />
            <MetricGroup 
                label="User Interaction"
                options={['None', 'Required']}
                selectedOption={UI}
                onSelect={setUI}
            />
            </div>
            <div>
            <MetricGroup 
                label="Scope"
                options={['Unchanged', 'Changed']}
                selectedOption={S}
                onSelect={setS}
            />
            <MetricGroup 
                label="Confidentiality Impact"
                options={['None', 'Low', 'High']}
                selectedOption={C}
                onSelect={setC}
            />
            <MetricGroup 
                label="Integrity Impact"
                options={['None', 'Low', 'High']}
                selectedOption={I}
                onSelect={setI}
            />
            <MetricGroup 
                label="Availability Impact"
                options={['None', 'Low', 'High']}
                selectedOption={A}
                onSelect={setA}
            />
            </div>
        </div>
        <div className="mt-8 text-center">
            <h3 className="text-2xl font-bold">Base Score: {calculateCVSS()}</h3>
        </div>
        </div>
  );
};

export default CVSSCalculator;
