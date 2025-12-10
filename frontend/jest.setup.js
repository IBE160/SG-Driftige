// Polyfill for structuredClone
if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
}

// This import is for the side effects of extending Jest's expect
require('@testing-library/jest-dom');
