import React from "react";

const CallDetailsContainer = ({
  listType,
  call_duration,
  handleArchiveStatus,
}) => {
  const callDuration = () => {
    if (call_duration < 60) return `${call_duration} sec`;

    let minutes = Math.floor(call_duration / 60);
    const seconds = call_duration % 60;
    if (minutes < 60) return `${minutes} min ${seconds} sec`;
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${hours}h ${minutes} min ${seconds} sec`;
  };

  return (
    <div className="call-detail-container">
      <div className="archive-btn">
        <button
          onClick={() => {
            console.log("clicked");
            handleArchiveStatus();
          }}
        >
          {listType === "activity" ? "Archive Call" : "Unarchive"}
        </button>
      </div>
      <div>call duration: {callDuration()}</div>
    </div>
  );
};

export default CallDetailsContainer;
