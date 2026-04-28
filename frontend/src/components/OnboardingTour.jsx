import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  { target: 'logo', content: 'Welcome to Stacks Clicker V2! This is your gateway to the Stacks ecosystem.' },
  { target: 'interaction-section', content: 'Here you can interact with various smart contracts - Click, Tip, and Vote!' },
  { target: 'stats-aside', content: 'Track your real-time performance and transaction history here.' },
  { target: 'wallet-section', content: 'Connect your wallet and monitor network status right here.' }
];

export default function OnboardingTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Effect to manage body overflow and initial focus when the tour becomes visible
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    const original = document.body.style.overflow;
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      const firstBtn = document.querySelector('.tour-btn.primary');
      firstBtn?.focus();
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [isVisible]); // Re-run this effect when isVisible changes

  // Existing effect to check localStorage and trigger tour visibility
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem('hasSeenTour', 'true');
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      dismiss();
    }
  }, [currentStep, dismiss]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="tour-overlay-backdrop" onClick={dismiss} role="presentation">
        <motion.div
          className="tour-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-title"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 id="tour-title" className="sr-only">Application Onboarding Tour</h2>
          <div className="tour-header">
            <div className="tour-step-dots">
              {steps.map((_, i) => (
                 <div
                  key={i}
                  className={`step-dot ${i === currentStep ? 'active' : ''}`}
                  aria-label={`Step ${i + 1}${i === currentStep ? ', current' : ''}`}
                  role="img"
                 />
              ))}
            </div>
            <button type="button" className="tour-close-top" onClick={dismiss} aria-label="Close tour overlay" title="Close tour"><span aria-hidden="true">×</span></button>
          </div>
          <div className="tour-progress" aria-live="polite" style={{ fontVariantNumeric: 'tabular-nums' }}>Step {currentStep + 1} of {steps.length}</div>
          <p className="tour-content">{steps[currentStep].content}</p>
          <div className="tour-footer" role="navigation" aria-label="Tour Navigation">
            <div className="footer-left">
              <button type="button" className="tour-skip" onClick={dismiss}>
                Skip
              </button>
              {currentStep > 0 && (
                <button type="button" className="tour-back" onClick={handleBack}>
                  Back
                </button>
              )}
            </div>
            <button type="button" className="tour-next" onClick={handleNext}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
