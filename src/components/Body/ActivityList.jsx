import React, { useEffect, useState } from "react";
import ActivityListItem from "./ActivityListItem.jsx";
import { BASE_URL } from "../../constants/constants.js";
import ShimmerUI from "./ShimmerUI.jsx";

const ActivityList = ({ listType, isArchiveStatusUpdateForAll }) => {
  const [activityData, setactivityData] = useState([]);
  const [isActivityDataLoading, setIsActivityDataLoading] = useState(false);

  const fetchData = () => {
    setIsActivityDataLoading(true);
    fetch(`${BASE_URL}/activites`)
      .then((resp) => {
        return resp.json();
      })
      .then((resp) => {
        const compareDates = (a, b) => {
          const dateA = new Date(a.dateTime);
          const dateB = new Date(b.dateTime);

          return dateA - dateB;
        };
        resp.sort(compareDates);
        setactivityData(resp);
        setIsActivityDataLoading(false);
      });
  };

  const patchArchiveStatus = (call_id) => {
    const data = {
      is_archived: listType === "activity" ? true : false,
    };
    return fetch(`${BASE_URL}/activites/${call_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const handleArchiveStatus = (call_id) => {
    patchArchiveStatus(call_id).then(() => {
      fetchData();
    });
  };

  const listVisible = () => {
    if (listType === "activity") {
      return activityData
        .filter((data) => !data.is_archived)
        .map((data) => {
          if (!data.from) return;
          return (
            <ActivityListItem
              activityData={data}
              key={data.id}
              listType={listType}
              updateArchiveStatus={() => handleArchiveStatus(data.id)}
            />
          );
        });
    } else {
      return activityData
        .filter((data) => data.is_archived)
        .map((data) => {
          return (
            <ActivityListItem
              activityData={data}
              key={data.id}
              listType={listType}
              updateArchiveStatus={() => handleArchiveStatus(data.id)}
            />
          );
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isArchiveStatusUpdateForAll) {
      if (listType === "activity") {
        activityData.forEach((data) => {
          patchArchiveStatus(data.id);
        });
      } else {
        fetch(`${BASE_URL}/reset`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  });

  return isActivityDataLoading ? (
    <ShimmerUI />
  ) : (
    <div className="activity-list-container">{listVisible()}</div>
  );
};

export default ActivityList;
