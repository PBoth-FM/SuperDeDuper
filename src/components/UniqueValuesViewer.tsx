import React, { useState, useCallback } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';

export function UniqueValuesViewer() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const uniqueValues = input
    .split('\n')
    .filter(line => line !== '')
    .reduce<string[]>((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, [])
    .sort();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(uniqueValues.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [uniqueValues]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Super De-Duper</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="input" className="block text-sm font-medium text-gray-700">
              Input Text
            </label>
            <span className="text-sm text-gray-500">
              {input.split('\n').filter(line => line !== '').length} values
            </span>
          </div>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[400px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste your text here, one value per line..."
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Unique Values
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {uniqueValues.length} unique
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2 py-1 text-sm text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="w-full h-[400px] p-3 border border-gray-300 rounded-lg bg-gray-50 overflow-auto whitespace-pre font-mono">
            {uniqueValues.join('\n')}
          </div>
        </div>
      </div>
    </div>
  );
}