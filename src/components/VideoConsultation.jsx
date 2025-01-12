import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Grid, Typography, Paper } from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Mic,
  MicOff,
  CallEnd
} from '@mui/icons-material';

const VideoConsultation = ({ consultationId, onEnd }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const peerConnectionRef = useRef();
  const socketRef = useRef();

  useEffect(() => {
    initializeMedia();
    initializeWebRTC();

    return () => {
      cleanupMedia();
    };
  }, []);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const initializeWebRTC = () => {
    // Initialize WebRTC peer connection
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };

    peerConnectionRef.current = new RTCPeerConnection(configuration);

    // Add local stream tracks to peer connection
    if (localStream) {
      localStream.getTracks().forEach(track => {
        peerConnectionRef.current.addTrack(track, localStream);
      });
    }

    // Handle incoming remote stream
    peerConnectionRef.current.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Initialize WebSocket connection
    socketRef.current = new WebSocket('ws://your-websocket-server');
    
    socketRef.current.onmessage = handleSignalingData;
  };

  const handleSignalingData = async (event) => {
    const data = JSON.parse(event.data);
    
    if (data.type === 'offer') {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socketRef.current.send(JSON.stringify(answer));
    } else if (data.type === 'answer') {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data));
    } else if (data.type === 'ice-candidate') {
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const endCall = () => {
    cleanupMedia();
    if (onEnd) onEnd();
  };

  const cleanupMedia = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%', p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 1, bgcolor: 'background.paper' }}>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{ width: '100%', maxHeight: '70vh' }}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 1, bgcolor: 'background.paper', mb: 2 }}>
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%' }}
            />
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color={isAudioEnabled ? 'primary' : 'error'}
              onClick={toggleAudio}
            >
              {isAudioEnabled ? <Mic /> : <MicOff />}
            </Button>
            
            <Button
              variant="contained"
              color={isVideoEnabled ? 'primary' : 'error'}
              onClick={toggleVideo}
            >
              {isVideoEnabled ? <Videocam /> : <VideocamOff />}
            </Button>
            
            <Button
              variant="contained"
              color="error"
              onClick={endCall}
            >
              <CallEnd />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoConsultation;
