import React, { useState } from "react";
import IncomingCallSvg from "../../assets/icons/IncomingCallSvg.jsx";
import IncomingCallReceivedSvg from "../../assets/icons/IncomingCallReceivedSvg.jsx";
import moment from "moment";
import CallDetailsContainer from "./CallDetailsContainer.jsx";

const ActivityListItem = ({ activityData, listType, updateArchiveStatus }) => {
  const [isCallDetailContainerVisible, setIsCallDetailContainerVisible] =
    useState(false);

  const date = moment(activityData.created_at).format("hh:mm");
  const timeframe = moment(activityData.created_at).format("a");

  const iconTypeToDisplay = (call_type) => {
    if (call_type === "missed" || call_type === "voicemail") {
      return <IncomingCallSvg />;
    } else if (call_type === "answered") {
      return <IncomingCallReceivedSvg />;
    }
  };

  const toggleCallDetailContainer = () => {
    setIsCallDetailContainerVisible(!isCallDetailContainerVisible);
  };

  return (
    <div>
      <div
        className="activity-list-item"
        onClick={() => toggleCallDetailContainer()}
      >
        <div className="call-icon">
          {iconTypeToDisplay(activityData.call_type)}
        </div>
        <div className="caller-info">
          <h3 className="caller-name">{activityData.from}</h3>

          <p className="via-info">
            {activityData.via ? `tried to call on ${activityData.via}` : ""}
          </p>
        </div>
        <div className="call-time">
          <div className="time">{date} </div>
          <div className="timeframe"> {timeframe}</div>
        </div>
      </div>
      <div
        className={isCallDetailContainerVisible ? "swipe-down-animation" : ""}
      >
        {isCallDetailContainerVisible ? (
          <CallDetailsContainer
            call_id={activityData.id}
            listType={listType}
            call_duration={activityData.duration}
            handleArchiveStatus={updateArchiveStatus}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default ActivityListItem;
