import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...props }) => {
  const inputId = id ?? label?.replace(/\s/g, '-').toLowerCase();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-surface-800">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-xl border border-surface-200 bg-white px-4 py-3 text-surface-900 placeholder:text-surface-300 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/25 disabled:bg-surface-100 disabled:opacity-60 ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400/25' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
