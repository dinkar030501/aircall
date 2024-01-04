import React, { useState } from "react";

import ActivityList from "./components/Body/ActivityList.jsx";

const Body = () => {
  const [listType, setListType] = useState("activity");
  const onClickSetList = (type) => {
    if (listType !== "activity") {
      setListType(type);
    } else if (listType !== "archived") {
      setListType(type);
    }
  };

  return (
    <div>
      <ul className="list-type-tabs">
        <li onClick={() => onClickSetList("activity")}>Activity List</li>
        <li onClick={() => onClickSetList("archived")}>Archived List</li>
      </ul>
      <ActivityList listType={listType} />
    </div>
  );
};

export default Body;
