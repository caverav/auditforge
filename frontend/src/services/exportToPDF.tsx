import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import ReactDOM from 'react-dom/client';

import CentralizedView from '../components/dashboard/CentralizedView';

export const exportToPDF = async (
  auditName: string,
  selectedDisplays: string[],
  displays: { id: string; name: string; component: React.ComponentType }[],
) => {
  // Create a temporary container for rendering charts
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  document.body.appendChild(container);

  // Render the CentralizedView with selected displays
  const root = ReactDOM.createRoot(container);
  root.render(<CentralizedView selectedDisplays={selectedDisplays} />);

  // Wait for charts to render
  await new Promise(resolve => setTimeout(resolve, 2000));

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Set dark background
  pdf.setFillColor(31, 41, 55); // Tailwind's bg-gray-800
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Add title
  pdf.setTextColor(255, 255, 255); // White text
  pdf.setFontSize(24);
  pdf.text(auditName, pageWidth / 2, 20, { align: 'center' });

  let yOffset = 30;
  const margin = 10;
  const availableWidth = pageWidth - 2 * margin;
  const maxHeight = (pageHeight - yOffset - 3 * margin) / 2; // Max height for each chart

  const captureAndAddChart = async (displayId: string, index: number) => {
    const element = container.querySelector(`#${displayId}`);
    if (element) {
      try {
        const canvas = await html2canvas(element, {
          backgroundColor: '#1f2937', // Tailwind's bg-gray-800
          scale: 2,
        });
        const imgData = canvas.toDataURL('image/png');

        const aspectRatio = canvas.width / canvas.height;
        let imgWidth = availableWidth;
        let imgHeight = imgWidth / aspectRatio;

        if (imgHeight > maxHeight) {
          imgHeight = maxHeight;
          imgWidth = imgHeight * aspectRatio;
        }

        if (index % 2 === 0 && index !== 0) {
          pdf.addPage();
          yOffset = 10;
          pdf.setFillColor(31, 41, 55);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        }

        const xOffset = (pageWidth - imgWidth) / 2; // Center the image horizontally

        pdf.addImage(
          imgData,
          'PNG',
          xOffset,
          yOffset,
          imgWidth,
          imgHeight,
          undefined,
          'FAST',
        );
        yOffset += imgHeight + margin;

        if (index % 2 === 1) {
          yOffset = 10; // Reset yOffset for the next page
        }
      } catch (error) {
        console.error('Error capturing element:', error);
        pdf.setTextColor(255, 255, 255);
        pdf.text('Error capturing chart', margin, yOffset);
        yOffset += 20;
      }
    }
  };

  for (let i = 0; i < selectedDisplays.length; i++) {
    await captureAndAddChart(selectedDisplays[i], i);
  }

  pdf.save(`${auditName}.pdf`);

  // Clean up
  root.unmount();
  document.body.removeChild(container);
};
