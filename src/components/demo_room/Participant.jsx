import { useEffect, useRef } from "react";
import kurentoUtils from 'kurento-utils';
import './Participant.scss'

const Participant = ({ isOwnCamera, name, sendMessage, sdpAnswer, candidate, isAudioOn = true, isVideoOn = true }) => {
    const rtcPeer = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        if (sdpAnswer) {
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

    return (
        <div className="student-video-item">
            <video className="student-video" ref={videoRef} autoPlay playsInline></video>
        </div>
    )
}

export default Participant;