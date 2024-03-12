import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import demoRoomService from "../../../../services/demoRoomService";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Participant from "../../../../components/demo_room/Participant";
import './DemoRoomPage.scss'
import hang_up_icon from "../../../../assets/red-hang-up-icon.png";

const DemoRoomPage = () => {
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const {roomId} = useParams();
    const navigate = useNavigate()
    const ws = useRef(new WebSocket('ws://localhost:8086/demo-room'));
    const participantsView = useRef(new Map());
    const userName = useRef(jwtDecode(Cookie.get('access_token')).sub);
    const [teacherName, setTeacherName] = useState('');


    useEffect(() => {
        checkIfExistence(roomId).then(r => console.log("heeey"));
        ws.current = new WebSocket('ws://localhost:8086/demo-room');
        console.log("Page Loaded - Opened WebSocket");
        triggerRender();
        ws.current.onopen = () => {
            console.log("WebSocket connection established.");
            sendMessage({
                id: 'joinRoom',
                name: userName.current,
                room: roomId,
            });

            ws.current.onmessage = (message) => {
                let parsedMessage = JSON.parse(message.data);
                console.info('Received message: ' + message.data);
                switch (parsedMessage.id) {
                    case 'existingParticipants':
                        onExistingParticipants(parsedMessage);
                        break;
                    case 'newParticipantArrived':
                        onNewParticipant(parsedMessage);
                        break;
                    case 'participantLeft':
                        onParticipantLeft(parsedMessage);
                        break;
                    case 'receiveVideoAnswer':
                        receiveVideoResponse(parsedMessage);
                        break;
                    case 'iceCandidate':
                        console.info(parsedMessage.candidate)
                        onIceCandidate(parsedMessage)
                        break;
                    default:
                        console.error('Unrecognized message', parsedMessage);
                }
            }
        };
        return () => {
            console.log("Page unloaded - Close WebSocket");
            ws.current.close();
        };
    }, []);


    const checkIfExistence = async (roomId) => {
        const isExists = await demoRoomService.isRoomExists(roomId);
        if (!isExists) {
            navigate("/")
        }
    }


    const onExistingParticipants = (msg) => {
        console.log(userName.current + " registered in room " + roomId);
        participantsView.current.set(userName.current, <Participant name={userName.current}
                                                                    isOwnCamera={true}
                                                                    sendMessage={sendMessage}/>)
        setTeacherName(msg.teacherName)
        msg.data.forEach(receiveVideo);
        triggerRender();
    }

    const sendMessage = (message) => {
        let jsonMessage = JSON.stringify(message);
        console.log('Sending message: ' + jsonMessage);
        ws.current.send(jsonMessage);
    }

    const onNewParticipant = (request) => {
        receiveVideo(request.name);
    }

    const receiveVideoResponse = (result) => {
        const participant = participantsView.current.get(result.name);

        if (participant) {
            const updatedParticipant = React.cloneElement(participant, {
                sdpAnswer: result.sdpAnswer,
            });
            participantsView.current.set(result.name, updatedParticipant);
            triggerRender();
        }
    }
    const triggerRender = () => {
        setUpdateTrigger(prev => !prev);
    };
    const onIceCandidate = (result) => {
        const participant = participantsView.current.get(result.name);

        if (participant) {
            const updatedParticipant = React.cloneElement(participant, {
                candidate: result.candidate,
            });
            participantsView.current.set(result.name, updatedParticipant);
            triggerRender();
        }
    }
    const receiveVideo = (sender) => {
        participantsView.current.set(sender, <Participant name={sender}
                                                          sendMessage={sendMessage}
        />)

        triggerRender();
    }
    const handleLeaveRoom = () => {
        participantsView.current.clear();
        sendMessage({
            id: 'leaveRoom'
        });
        ws.current.close();
        navigate("/classes");
        window.location.reload()
    }
    const onParticipantLeft = (request) => {
        participantsView.current.delete(request.name)
        triggerRender();
    }
    console.log(teacherName)
    return (
        <div className="DemoRoomPage">
            <div className="students-video-wrapper">
                {Array.from(participantsView.current.values()).map((participant, index) => {
                    if (participant.props.name === teacherName) return;
                    return (
                        <div className="demo-video-item" key={index}>
                            {participant}
                        </div>
                    )
                })}
            </div>
            <div className="teacher-video">
                {
                    participantsView.current.get(teacherName)
                }
                <div className="hang-up-button">
                    <img onClick={handleLeaveRoom} src={hang_up_icon} alt="hang-up-icon" className="hang-up-icon"/>
                </div>
            </div>
        </div>
    )
}

export default DemoRoomPage;