type PlaySoundProps = {
  elmRef: React.MutableRefObject<HTMLAudioElement | null>;
};
export const PlaySound = ({ elmRef }: PlaySoundProps) => {
  if (elmRef.current) {
    const sound = elmRef.current;
    if (!sound.paused) {
      sound.pause();
      sound.currentTime = 0;
    }
    sound.volume = 0.04;
    sound.play();
  }
};
