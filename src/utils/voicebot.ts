// Utility to trigger the ElevenLabs AI voice agent widget
// Uses the official elevenlabs-agent:expand custom event API

export const openVoicebot = () => {
  const widget = document.querySelector('elevenlabs-convai');

  if (widget) {
    // Official API: dispatch custom event to expand the widget
    document.dispatchEvent(
      new CustomEvent('elevenlabs-agent:expand', {
        detail: { action: 'expand' },
      })
    );
  } else {
    // Widget not loaded yet - scroll to contact as fallback
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
};
