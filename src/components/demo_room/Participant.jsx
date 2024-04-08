import {useEffect, useRef} from "react";
import kurentoUtils from 'kurento-utils';
import './Participant.scss'
const Participant = ({isOwnCamera, name, sendMessage, sdpAnswer, candidate}) => {
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
        let userMediaPermissionGranted = false; // Flag to track user media permission

        const startUserMedia = () => {
            let constraints = {
                audio: true,
                video: {
                    mandatory: {
                        maxWidth: 320,
                        maxFrameRate: 30,
                        minFrameRate: 30
                    }
                }
            };
            let options = {
                localVideo: videoRef.current,
                mediaConstraints: constraints,
                onicecandidate: onIceCandidate
            }
            rtcPeer.current = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
                function (error) {
                    if (error) {
                        return console.error(error);
                    }
                    this.generateOffer(offerToReceiveVideo);
                });
        };

        // Check if navigator.mediaDevices and getUserMedia are available
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Execute logic only if user media permission is granted
            navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                .then(() => {
                    userMediaPermissionGranted = true; // Set flag to true when permission is granted
                })
                .catch((error) => {
                    console.error('Error accessing user media: ', error);
                });
        } else {
            console.error('getUserMedia is not supported in this environment');
        }

        // Execute logic only if user media permission is granted
        if (!rtcPeer.current && userMediaPermissionGranted) {
            if (isOwnCamera) {
                startUserMedia();
            } else {
                let options = {
                    remoteVideo: videoRef.current,
                    onicecandidate: onIceCandidate
                }
                rtcPeer.current = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
                    function (error) {
                        if (error) {
                            return console.error(error);
                        }
                        this.generateOffer(offerToReceiveVideo);
                    });
            }
        }
    }, []);
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
            <video className="student-video" ref={videoRef} autoPlay width="720px" height="480px"></video>
        </div>
    )
}

export default Participant;