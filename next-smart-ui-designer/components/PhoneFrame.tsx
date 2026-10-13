import type { ReactNode } from 'react';

export function PhoneFrame({
  header,
  children,
  className
}: {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`phone-frame ${className ?? ''}`}>
      <div className="phone-screen">
        {header && (
          <div className="phone-screen-header">
            {header}
          </div>
        )}
        <div className={`phone-screen-content ${header ? '' : 'phone-screen-content-full'}`}>
          {children}
        </div>
      </div>
      <div id="phone-overlays" />
    </div>
  );
}