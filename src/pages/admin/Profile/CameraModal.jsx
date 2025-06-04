import React, { useRef, useEffect, useState } from 'react';
import { FaCamera, FaTimes } from 'react-icons/fa';
import './CameraModal.css';

const CameraModal = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Could not access camera. Please check permissions.');
      console.error('Error accessing camera:', err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame on the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a data URL
      const photoData = canvas.toDataURL('image/jpeg');
      
      // Stop all video streams
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      // Pass the captured photo data to the parent component
      onCapture(photoData);
    }
  };

  return (
    <div className="camera-modal-overlay">
      <div className="camera-modal">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        {error ? (
          <div className="camera-error">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="camera-preview">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="camera-controls">
              <button className="capture-button" onClick={capturePhoto}>
                <FaCamera /> Take Photo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CameraModal; 