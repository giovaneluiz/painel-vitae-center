import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

interface YouTubePlayerProps {
  videoId: string;
  isVisible: boolean;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, isVisible }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // O vídeo continua rodando mesmo quando isVisible = false
    // Apenas mudamos a opacidade, não destruímos o iframe
  }, [isVisible]);

  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0`;

  return (
    <View style={[styles.container, !isVisible && styles.hidden]}>
      <iframe
        ref={iframeRef}
        width="100%"
        height="100%"
        src={videoUrl}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{ border: 'none', display: 'block' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
});