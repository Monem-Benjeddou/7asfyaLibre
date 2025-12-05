import { useState, useEffect } from 'react';

export function DialogSystem({ visible, conversation, onClose }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Reset message index when conversation changes
  useEffect(() => {
    if (visible && conversation) {
      setCurrentMessageIndex(0);
    }
  }, [visible, conversation]);

  // Calculate message state (safe even if conversation is null)
  const currentMessage = conversation?.messages?.[currentMessageIndex];
  const isLastMessage = conversation ? currentMessageIndex === conversation.messages.length - 1 : false;
  const totalMessages = conversation?.messages?.length || 0;

  // Handle keyboard input - must be before early return
  useEffect(() => {
    if (!visible || !conversation) return;

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'x' || e.key === 'z') {
        e.preventDefault();
        if (isLastMessage) {
          onClose();
        } else {
          setCurrentMessageIndex(prev => prev + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [visible, conversation, currentMessageIndex, isLastMessage, onClose]);

  // Early return after all hooks
  if (!visible || !conversation || !currentMessage) {
    return null;
  }

  const handleNext = () => {
    if (isLastMessage) {
      onClose();
    } else {
      setCurrentMessageIndex(prev => prev + 1);
    }
  };

  const speakerName = currentMessage.speaker === 'player' ? 'Vous' : conversation.speaker;
  const isPlayer = currentMessage.speaker === 'player';

  return (
    <div 
      className="fixed bottom-0 left-0 right-0"
      style={{ 
        pointerEvents: 'auto',
        zIndex: 1000,
        cursor: 'pointer'
      }}
      onClick={handleNext}
    >
      {/* Text Box - Pixel Art Style */}
      <div 
        className="mx-auto mb-4"
        style={{
          maxWidth: '900px',
          width: '95%',
          imageRendering: 'pixelated'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main text box */}
        <div
          style={{
            backgroundColor: '#F0E8D8',
            border: '4px solid #000000',
            padding: '16px 20px',
            boxShadow: '0 4px 0 rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}
        >
          {/* Character name box (left side) */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '20px',
              backgroundColor: isPlayer ? '#4040FF' : '#8040A0',
              border: '3px solid #000000',
              padding: '4px 12px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              textShadow: '2px 2px 0 #000000',
              imageRendering: 'pixelated',
              fontFamily: 'monospace'
            }}
          >
            {speakerName}
          </div>

          {/* Message text */}
          <div
            style={{
              minHeight: '60px',
              fontSize: '16px',
              lineHeight: '1.5',
              color: '#000000',
              fontFamily: 'monospace',
              paddingTop: '8px',
              imageRendering: 'pixelated'
            }}
          >
            {currentMessage.text}
          </div>

          {/* Continue indicator (bottom right) */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '20px',
              fontSize: '12px',
              color: '#000000',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              animation: 'blink 1s infinite'
            }}
          >
            {isLastMessage ? '[X] Fermer' : '[X] Continuer'}
          </div>
        </div>

        {/* Pixel art border decoration */}
        <div
          style={{
            height: '4px',
            backgroundColor: '#783C08',
            border: '2px solid #000000',
            marginTop: '-2px'
          }}
        />
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

