import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden quiz-ambient" aria-hidden="true">
      <div className="quiz-ambient__wash" />
      <div className="quiz-ambient__blob quiz-ambient__blob--one" />
      <div className="quiz-ambient__blob quiz-ambient__blob--two" />
    </div>
  );
};
