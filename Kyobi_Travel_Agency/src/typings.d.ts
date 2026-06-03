declare global {
  interface Window {
    buildResultsList?: () => void;
    updateBudget?: () => void;
    initLegacy?: () => void;
  }
}

export {};
