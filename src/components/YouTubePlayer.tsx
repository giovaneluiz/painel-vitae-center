import React, { useEffect } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { WebView } from 'react-native-webview'
interface YouTubePlayerProps {
  videoId: string
  isVisible: boolean
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  isVisible,
}) => {
  useEffect(() => {
    // O vídeo continua rodando mesmo quando isVisible = false
    // Apenas mudamos a opacidade, não destruímos o iframe
  }, [isVisible])

  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&showinfo=0`

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, !isVisible && styles.hidden]}>
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: 'none' }}
        />
      </View>
    )
  }

  // Se for ANDROID (APK), usamos a WebView
  return (
    <View style={[styles.container, !isVisible && styles.hidden]}>
      <WebView
        style={styles.video}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false} // Permite autoplay
        source={{ uri: videoUrl }}
      />
    </View>
  )
}

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
  video: {
    flex: 1,
    backgroundColor: '#000',
  },
})
