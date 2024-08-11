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
                        width: { ideal: 1280, max: 1920 },
                        height: { ideal: 720, max: 1080 },
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
                    sendSource: 'webcam'
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
        let msg = {
            id: "receiveVideoFrom",
            sender: name,
            sdpOffer: offerSdp
        };
        sendMessage(msg);
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