import React from "react";
import IncomingCallSvg from "../../assets/icons/IncomingCallSvg.jsx";
import IncomingCallReceivedSvg from "../../assets/icons/IncomingCallReceivedSvg.jsx";
import moment from "moment";

const ActivityListItem = ({ activityData }) => {
  const date = moment(activityData.created_at).format("hh:mm");
  const timeframe = moment(activityData.created_at).format("a");

  const iconTypeToDisplay = (call_type) => {
    if (call_type === "missed") {
      return <IncomingCallSvg />;
    } else if (call_type === "answered") {
      return <IncomingCallReceivedSvg />;
    }
  };

  return (
    <div className="activity-list-item">
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
        <div className="time">{date}</div>
        <div className="timeframe">{timeframe}</div>
      </div>
    </div>
  );
};
export default ActivityListItem;
