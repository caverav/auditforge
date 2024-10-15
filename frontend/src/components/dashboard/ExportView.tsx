import React, { forwardRef } from 'react';

type ExportViewProps = {
  auditName: string;
  selectedDisplays: string[];
  displays: { id: string; name: string; component: React.ComponentType }[];
};

// eslint-disable-next-line react/display-name
const ExportView = forwardRef<HTMLDivElement, ExportViewProps>(
  ({ auditName, selectedDisplays, displays }, ref) => {
    return (
      <div className="bg-white text-black p-8" ref={ref}>
        <h1 className="text-4xl font-bold mb-8">{auditName}</h1>
        {selectedDisplays.map(displayId => {
          const display = displays.find(d => d.id === displayId);
          if (display) {
            const Component = display.component;
            return (
              <div className="mb-8" key={display.id}>
                <h2 className="text-2xl font-bold mb-4">{display.name}</h2>
                <Component />
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  },
);

export default ExportView;
