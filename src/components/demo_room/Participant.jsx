
import { useEffect,useState, useRef,useCallback } from "react";
import kurentoUtils from 'kurento-utils';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';

import './Participant.scss'

const Participant = ({ isOwnCamera, name, sendMessage, sdpAnswer, candidate, isAudioOn = true, isVideoOn = true }) => {
    const rtcPeer = useRef(null);
    const videoRef = useRef(null);
    const [containerElement, setContainerElement] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (sdpAnswer) {
            console.log("------------------------------------------------sdp answer")
            rtcPeer.current.processAnswer(sdpAnswer, function (error) {
                if (error) return console.error(error);
            });
        }
    }, [sdpAnswer]);

    useEffect(() => {
        if (candidate) {
            rtcPeer.current.addIceCandidate(candidate, function (error) {
                if (error) {
                    console.error("Error adding candidate: " + error);
                    return;
                }
            });
        }
    }, [candidate]);

    useEffect(() => {
        if (!rtcPeer.current) {
            if (isOwnCamera) {
                const constraints = {
                    audio: isAudioOn,
                    video: isVideoOn ? {
                        width: { ideal: 1920, max: 3840 },
                        height: { ideal: 1080, max: 2160 },
                        frameRate: { ideal: 30, max: 60 },
                        aspectRatio: { ideal: 16/9 },
                        facingMode: "user",
                        echoCancellation: true,
                        noiseSuppression: true,
                        mirror: false 
                    } : false
                };
                console.log(constraints);
                let options = {
                    localVideo: videoRef.current,
                    mediaConstraints: constraints,
                    onicecandidate: onIceCandidate,
                    sendSource: 'webcam',
                    configuration: {
                        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
                    }
                }
                rtcPeer.current = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
                    function (error) {
                        if (error) {
                            return console.error(error);
                        }
                        this.generateOffer(offerToReceiveVideo);
                    });
            } else {
                let options = {
                    remoteVideo: videoRef.current,
                    onicecandidate: onIceCandidate,
                    mediaConstraints: {
                        audio: isAudioOn,
                        video: isVideoOn
                    },
                    configuration: {
                        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
                    }
                }
                rtcPeer.current = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
                    function (error) {
                        if (error) {
                            return console.error(error);
                        }
                        this.generateOffer(offerToReceiveVideo);
                    });
            }
        }
    }, [isOwnCamera, isAudioOn, isVideoOn, name, sendMessage]);

 
    const offerToReceiveVideo = (error, offerSdp, wp) => {
        if (error) return console.error("sdp offer error")
        console.log('Invoking SDP offer callback function');

        const modifiedSdp = setHighBitrate(offerSdp);

        let msg = {
            id: "receiveVideoFrom",
            sender: name,
            sdpOffer: modifiedSdp
        };
        sendMessage(msg);
    }

    const setHighBitrate = (sdp) => {
        const sdpLines = sdp.split('\r\n');
        let mLineIndex = -1;

        // Find m= line for video
        for (let i = 0; i < sdpLines.length; i++) {
            if (sdpLines[i].startsWith('m=video')) {
                mLineIndex = i;
                break;
            }
        }

        if (mLineIndex === -1) {
            console.log('Could not find the m line for video');
            return sdp;
        }

        // Find next m= line
        let nextMLineIndex = -1;
        for (let i = mLineIndex + 1; i < sdpLines.length; i++) {
            if (sdpLines[i].startsWith('m=')) {
                nextMLineIndex = i;
                break;
            }
        }

        if (nextMLineIndex === -1) {
            nextMLineIndex = sdpLines.length;
        }


        const maxBitrate = 2000;
        const insertAt = nextMLineIndex - 1;
        const fmtpLine = `a=fmtp:96 max-fr=60;max-fs=8160;max-br=${maxBitrate}`;
        sdpLines.splice(insertAt, 0, fmtpLine);

        return sdpLines.join('\r\n');
    }

    const onIceCandidate = (candidate) => {
        console.log("Local candidate" + JSON.stringify(candidate));
        let message = {
            id: 'onIceCandidate',
            candidate: candidate,
            name: name
        };
        sendMessage(message);
    } 
    

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const toggleFullscreen = useCallback(() => {
        console.log("Toggle fullscreen called, containerElement:", containerElement);
        if (!isMounted) {
            console.log("Component is not mounted, aborting fullscreen toggle");
            return;
        }

        if (!document.fullscreenElement) {
            if (containerElement) {
                if (containerElement.requestFullscreen) {
                    containerElement.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable fullscreen: ${err.message}`);
                    });
                } else if (containerElement.mozRequestFullScreen) { // Firefox
                    containerElement.mozRequestFullScreen();
                } else if (containerElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
                    containerElement.webkitRequestFullscreen();
                } else if (containerElement.msRequestFullscreen) { // IE/Edge
                    containerElement.msRequestFullscreen();
                }
            } else {
                console.error('Container element not found');
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
                document.msExitFullscreen();
            }
        }
    }, [containerElement, isMounted]);


  

    return (
        <div 
            className="student-video-item" 
            ref={(el) => {
                if (el) {
                    console.log("Container ref set");
                    setContainerElement(el);
                }
            }}
        >
            <video className="student-video non-mirrored" ref={videoRef} autoPlay playsInline></video>
            <button className="fullscreen-button" onClick={toggleFullscreen}>
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
            </button>
        </div>
    )
}

export default Participant;