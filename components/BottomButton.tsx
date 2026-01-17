import React, { ReactNode } from 'react';

interface BottomButtonProps {
  onClick: () => void;       // type for your click handler
  children: ReactNode;       // type for React children
}

export default function BottomButton({ onClick, children }: BottomButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',    // stick to viewport
        bottom: '20px',       // distance from bottom
        left: '50%',          // center horizontally
        transform: 'translateX(-50%)',
        padding: '12px 24px',
        fontSize: '16px',
        borderRadius: '8px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        zIndex: 1000,         // above other elements
      }}
    >
      {children}
    </button>
  )
}

