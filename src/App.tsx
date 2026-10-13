import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { QUIZ_QUESTIONS } from './data/quizData';
import {
  UserSelections,
  QuizQuestion,
  EndingStory,
  TransmigrationId,
  CheatId,
  IdentityId,
  RaceId,
  BruteGoalId,
  GenreId
} from './types';
import { resolveEnding } from './data/endingsData';
import { getAllCombinations } from './data/combinations';
import { getUnlockedEndings, recordUnlockedEnding } from './utils/storage';
import { QuestionCard } from './components/QuestionCard';
import { ResultView } from './components/ResultView';
import { GalleryModal } from './components/GalleryModal';
import { Navbar } from './components/Navbar';
import { AmbientBackground } from './components/AmbientBackground';
import { soundFx } from './utils/audio';

export function App() {
  // Navigation & Step State
  // 1: Transmigration (Q1)
  // 2: Cheat (Q2)
  // 3: Identity / Brute Goal (Q3)
  // 4: Race (if Peasant) OR Genre (Standard routes)
  // 5: Genre (if Peasant)
  // 99: Result View
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selections, setSelections] = useState<UserSelections>({});
  const [currentEnding, setCurrentEnding] = useState<EndingStory | null>(null);

  // Unlocked Endings System State
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [isNewUnlock, setIsNewUnlock] = useState<boolean>(false);

  // Gallery Modal State
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);

  // Load unlocked endings from local storage
  useEffect(() => {
    setUnlockedIds(getUnlockedEndings());
  }, []);

  // Calculate total steps based on route
  const getTotalSteps = (): number => {
    if (selections.cheat === 'brute_force') return 3;
    if (selections.identity === 'peasant') return 5;
    return 4;
  };

  // Determine current active question
  const getCurrentQuestion = (): { question: QuizQuestion; totalSteps: number } => {
    const totalSteps = getTotalSteps();

    if (currentStep === 1) {
      return { question: QUIZ_QUESTIONS.q1, totalSteps };
    }
    if (currentStep === 2) {
      return { question: QUIZ_QUESTIONS.q2, totalSteps };
    }
    if (currentStep === 3) {
      if (selections.cheat === 'brute_force') {
        return { question: QUIZ_QUESTIONS.q3_brute, totalSteps: 3 };
      }
      return { question: QUIZ_QUESTIONS.q3_identity, totalSteps };
    }
    if (currentStep === 4) {
      if (selections.identity === 'peasant') {
        // Peasant route step 4: Non-living for 'other' cheat, biological races for standard cheats
        if (selections.cheat === 'other') {
          return { question: QUIZ_QUESTIONS.q4_race_other, totalSteps: 5 };
        }
        return { question: QUIZ_QUESTIONS.q4_race, totalSteps: 5 };
      }
      // Standard route step 4: Genre selection
      if (selections.identity === 'demon_king') {
        return { question: QUIZ_QUESTIONS.q4_genre_demon, totalSteps: 4 };
      }
      if (selections.identity === 'sage') {
        return { question: QUIZ_QUESTIONS.q4_genre_sage, totalSteps: 4 };
      }
      return { question: QUIZ_QUESTIONS.q4_genre_5, totalSteps: 4 };
    }
    // Step 5: Peasant dedicated Genre selection
    return { question: QUIZ_QUESTIONS.q5_genre_peasant, totalSteps: 5 };
  };

  // Build breadcrumb human labels
  const getBreadcrumbLabels = (): string[] => {
    const labels: string[] = [];
    if (selections.transmigration) {
      const q1Opt = QUIZ_QUESTIONS.q1.options.find((o) => o.id === selections.transmigration);
      if (q1Opt) labels.push(q1Opt.badge || q1Opt.label);
    }
    if (selections.cheat) {
      const q2Opt = QUIZ_QUESTIONS.q2.options.find((o) => o.id === selections.cheat);
      if (q2Opt) labels.push(q2Opt.label);
    }
    if (selections.identity) {
      const q3Opt = QUIZ_QUESTIONS.q3_identity.options.find((o) => o.id === selections.identity);
      if (q3Opt) labels.push(q3Opt.label);
    }
    if (selections.race) {
      const qrOpt = QUIZ_QUESTIONS.q4_race.options.find((o) => o.id === selections.race)
        || QUIZ_QUESTIONS.q4_race_other.options.find((o) => o.id === selections.race);
      if (qrOpt) labels.push(qrOpt.label);
    }
    if (selections.bruteGoal) {
      const qbOpt = QUIZ_QUESTIONS.q3_brute.options.find((o) => o.id === selections.bruteGoal);
      if (qbOpt) labels.push(qbOpt.label);
    }
    return labels;
  };

  // Complete and unlock an ending
  const finalizeEnding = (finalSelections: UserSelections) => {
    setSelections(finalSelections);
    const ending = resolveEnding(finalSelections);
    const { isNew } = recordUnlockedEnding(ending.id);
    setIsNewUnlock(isNew);
    setUnlockedIds(getUnlockedEndings());
    setCurrentEnding(ending);
    setCurrentStep(99); // Result view
  };

  // Handle Option Selection
  const handleSelectOption = (optionId: string) => {
    if (currentStep === 1) {
      setSelections((prev) => ({ ...prev, transmigration: optionId as TransmigrationId }));
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      const cheat = optionId as CheatId;
      setSelections((prev) => ({
        ...prev,
        cheat,
        // Reset subsequent answers if cheat changes
        identity: undefined,
        race: undefined,
        bruteGoal: undefined,
        genre: undefined
      }));
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      if (selections.cheat === 'brute_force') {
        // Brute Force route concludes directly on step 3!
        finalizeEnding({
          ...selections,
          bruteGoal: optionId as BruteGoalId
        });
        return;
      }

      const identity = optionId as IdentityId;
      setSelections((prev) => ({
        ...prev,
        identity,
        race: undefined,
        genre: undefined
      }));
      setCurrentStep(4);
      return;
    }

    if (currentStep === 4) {
      if (selections.identity === 'peasant') {
        // Peasant chooses Race, then proceeds to Step 5 (Genre)
        setSelections((prev) => ({
          ...prev,
          race: optionId as RaceId,
          genre: undefined
        }));
        setCurrentStep(5);
        return;
      }

      // Standard route (Hero, Demon King, Sage, Saint) finishes on Step 4
      finalizeEnding({
        ...selections,
        genre: optionId as GenreId
      });
      return;
    }

    if (currentStep === 5) {
      // Peasant route finishes on Step 5 with Genre
      finalizeEnding({
        ...selections,
        genre: optionId as GenreId
      });
    }
  };

  // Step Back Navigation
  const handleStepBack = () => {
    soundFx.playHover();
    if (currentStep > 1 && currentStep <= 5) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Reset entire quiz to start a new adventure
  const handleReset = () => {
    setCurrentStep(1);
    setSelections({});
    setCurrentEnding(null);
    setIsNewUnlock(false);
  };

  // Open specific ending from Gallery
  const handleSelectEndingFromGallery = (ending: EndingStory) => {
    setIsGalleryOpen(false);
    setCurrentEnding(ending);
    setIsNewUnlock(false);
    setCurrentStep(99);
  };

  const { question, totalSteps } = getCurrentQuestion();
  const totalPossibleEndings = getAllCombinations().length;

  return (
    <div className="relative min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Ambience */}
      <AmbientBackground />

      {/* Global Navbar */}
      <Navbar
        unlockedCount={unlockedIds.length}
        totalEndings={totalPossibleEndings}
        onOpenGallery={() => setIsGalleryOpen(true)}
        onReset={handleReset}
        isResultPage={currentStep === 99}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center">
        {currentStep !== 99 ? (
          <div className="w-full flex flex-col items-center">
            {/* Top Back & Quick Action Row */}
            {currentStep > 1 && (
              <div className="w-full max-w-2xl px-4 pt-4 flex items-center justify-between">
                <button
                  id="btn-back-step"
                  onClick={handleStepBack}
                  className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-300 transition-colors py-1 px-2.5 rounded-lg bg-stone-900/60 border border-stone-800 hover:border-stone-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>返回上一步</span>
                </button>

                <button
                  id="btn-restart-quiz"
                  onClick={handleReset}
                  className="text-xs text-stone-400 hover:text-stone-300 transition-colors py-1 px-2.5 rounded-lg bg-stone-900/40 hover:bg-stone-900/80"
                >
                  重新开始
                </button>
              </div>
            )}

            {/* Question Card */}
            <QuestionCard
              question={question}
              onSelectOption={handleSelectOption}
              totalSteps={totalSteps}
              currentStep={currentStep}
              breadcrumbLabels={getBreadcrumbLabels()}
            />
          </div>
        ) : (
          /* Ending & Psychological Assessment Result View */
          currentEnding && (
            <ResultView
              ending={currentEnding}
              isNewUnlock={isNewUnlock}
              unlockedCount={unlockedIds.length}
              totalEndings={totalPossibleEndings}
              onRestart={handleReset}
              onOpenGallery={() => setIsGalleryOpen(true)}
            />
          )
        )}
      </main>

      {/* Global Footer */}
      <footer className="relative z-10 w-full py-4 border-t border-stone-900/80 bg-stone-950/60 backdrop-blur-sm text-center text-xs text-stone-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>异世界转生命运之书 · 探索多元时空终章与 16 种潜意识人格</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              图鉴档案馆 ({unlockedIds.length} 篇已收录)
            </button>
            <span>•</span>
            <span className="font-mono text-stone-400">v1.0.0</span>
          </div>
        </div>
      </footer>

      {/* Ending Gallery Compendium Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        unlockedEndingIds={unlockedIds}
        onSelectEndingToView={handleSelectEndingFromGallery}
        onUpdateUnlockedIds={(ids) => setUnlockedIds(ids)}
      />
    </div>
  );
}

export default App;
