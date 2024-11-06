import { Cvss3P1 } from 'ae-cvss-calculator';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const cvssStringToSeverity = (cvssScore: string) => {
  try {
    const cvssVector = new Cvss3P1(cvssScore);
    const score = cvssVector.calculateExactOverallScore();
    if (score >= 9.0) {
      return 'C';
    }
    if (score >= 7.0) {
      return 'H';
    }
    if (score >= 4.0) {
      return 'M';
    }
    if (score >= 0.1) {
      return 'L';
    }
  } catch (error) {
    console.error('Invalid CVSS vector:', error);
  }
  return 'I';
};

export const cvssStringToScore = (cvssScore: string) => {
  try {
    const cvssVector = new Cvss3P1(cvssScore);
    return cvssVector.calculateExactOverallScore();
  } catch (error) {
    console.error('Invalid CVSS vector:', error);
  }
  return 0;
};

export const cvssStringToCIA = (
  field: 'integrity' | 'availability' | 'confidentiality',
  cvssVector: string,
) => {
  const values: Record<string, number> = {
    H: 3,
    M: 2,
    L: 1,
    N: 0,
  } as const;
  const substrings = {
    integrity: 35,
    availability: 39,
    confidentiality: 43,
  } as const;
  return values[cvssVector.substring(substrings[field], substrings[field] + 1)];
};
