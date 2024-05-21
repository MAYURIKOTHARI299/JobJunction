import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../utils";
import ApplicationCard from "../components/ApplicationCard";
const noProfileImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png";

const Application = () => {
  const [jobs, setJobs] = useState([]);
  const getObj = async (id) => {
    let res;
    try {
      res = await apiRequest({
        url: "/jobs/get-job-detail/" + id,
        method: "GET",
      });
      console.log("res", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchJobObjects = async () => {
      try {
        const jobsApplied = JSON.parse(
          localStorage.getItem("userInfo")
        ).jobsApplied;
        console.log("onloading of appl", jobsApplied);
        const jobObjects = [];
        for (const jobId of jobsApplied) {
          const obj = await getObj(jobId);
          if (obj) {
            jobObjects.push(obj);
          }
        }
        setJobs(jobObjects);
        console.log(jobObjects);
      } catch (error) {
        console.error("Error fetching job objects:", error);
      }
    };

    fetchJobObjects();
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      {jobs?.map((cmp, index) => (
        <ApplicationCard job={cmp.data} key={index} />
      ))}
    </div>
  );
};

export default Application;
