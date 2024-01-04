import React, { useState } from "react";

import ActivityList from "./components/Body/ActivityList.jsx";

const Body = () => {
  const [listType, setListType] = useState("activity");
  const [isArchiveStatusUpdateForAll, setIsArchiveStatusUpdateForAll] =
    useState(false);
  const onClickSetList = (type) => {
    if (listType !== "activity") {
      setListType(type);
    } else if (listType !== "archived") {
      setListType(type);
    }
  };
  const updateArchiveStatus = () => {
    setIsArchiveStatusUpdateForAll(true);
  };

  return (
    <div>
      <div className="nav-buttons">
        <ul className="list-type-tabs">
          <li
            className={listType === "activity" ? "active" : ""}
            onClick={() => onClickSetList("activity")}
          >
            Activity List
          </li>
          <li
            className={listType === "archived" ? "active" : ""}
            onClick={() => onClickSetList("archived")}
          >
            Archived List
          </li>
        </ul>
        <button className="archive-toggle-btn" onClick={updateArchiveStatus}>
          {listType === "activity" ? "Archive All" : "Unarchive All"}
        </button>
      </div>
      <ActivityList
        listType={listType}
        isArchiveStatusUpdateForAll={isArchiveStatusUpdateForAll}
      />
    </div>
  );
};

export default Body;
