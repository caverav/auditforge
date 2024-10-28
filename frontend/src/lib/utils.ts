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
