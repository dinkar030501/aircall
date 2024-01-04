import React, { useEffect, useState } from "react";
import ActivityListItem from "./ActivityListItem.jsx";
import { BASE_URL } from "../../constants/constants.js";

const ActivityList = ({ listType }) => {
  const [activityData, setactivityData] = useState([]);

  const fetchData = () => {
    fetch(BASE_URL)
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        setactivityData(resp);
      });
  };
  const listVisible = () => {
    if (listType === "activity") {
      return activityData
        .filter((data) => !data.is_archived)
        .map((data) => {
          return <ActivityListItem activityData={data} key={data.id} />;
        });
    } else {
      return activityData
        .filter((data) => data.is_archived)
        .map((data) => {
          return <ActivityListItem activityData={data} key={data.id} />;
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div className="activity-list-container">{listVisible()}</div>;
};

export default ActivityList;
