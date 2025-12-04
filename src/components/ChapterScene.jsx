import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DialogueBox } from './DialogueBox';
import { ChoiceButton } from './ChoiceButton';

/**
 * ChapterScene Component
 * Main container for cinematic scenes
 */

export function ChapterScene({ chapter, onChoice, isChoiceAvailable }) {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);
  const [selectedChoiceDialogue, setSelectedChoiceDialogue] = useState(null);
  const [pendingChoice, setPendingChoice] = useState(null);

  const currentDialogue = chapter.dialogues[currentDialogueIndex];
  const availableChoices = chapter.choices?.filter(choice => 
    !isChoiceAvailable || isChoiceAvailable(choice)
  ) || [];

  const handleDialogueComplete = () => {
    if (currentDialogueIndex < chapter.dialogues.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      setShowChoices(true);
    }
  };

  const handleChoice = (choice) => {
    // Show follow-up dialogue if available
    if (choice.nextDialogue && chapter.followUpDialogues?.[choice.nextDialogue]) {
      setPendingChoice(choice);
      setSelectedChoiceDialogue(chapter.followUpDialogues[choice.nextDialogue]);
      setShowChoices(false);
    } else {
      // Apply choice immediately
      onChoice(choice);
    }
  };

  const handleFollowUpComplete = () => {
    setSelectedChoiceDialogue(null);
    // Apply the pending choice
    if (pendingChoice) {
      onChoice(pendingChoice);
      setPendingChoice(null);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
        style={{
          background: chapter.cinematic.background || 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Cinematic Description */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-12 md:top-20 left-1/2 transform -translate-x-1/2 max-w-3xl px-4 md:px-6 z-30 w-full"
      >
        <div className="bg-game-dark/80 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-gray-700 shadow-2xl">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 text-shadow">
            {chapter.title}
          </h1>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">
            {chapter.cinematic.description}
          </p>
        </div>
      </motion.div>

      {/* Dialogue */}
      <AnimatePresence mode="wait">
        {!showChoices && !selectedChoiceDialogue && currentDialogue && (
          <DialogueBox
            key={currentDialogue.id}
            dialogue={currentDialogue}
            onComplete={handleDialogueComplete}
          />
        )}
      </AnimatePresence>

      {/* Follow-up dialogue after choice */}
      <AnimatePresence>
        {selectedChoiceDialogue && (
          <DialogueBox
            dialogue={selectedChoiceDialogue}
            onComplete={handleFollowUpComplete}
          />
        )}
      </AnimatePresence>

      {/* Choices */}
      <AnimatePresence>
        {showChoices && !selectedChoiceDialogue && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-game-dark/95 backdrop-blur-md border-t border-gray-700 p-4 md:p-6 z-40"
          >
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                Que décidez-vous ?
              </h3>
              <div className="space-y-2 md:space-y-3">
                {availableChoices.map((choice) => (
                  <ChoiceButton
                    key={choice.id}
                    choice={choice}
                    onClick={handleChoice}
                    showEffects={true}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

