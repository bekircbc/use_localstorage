import { useState, useEffect } from "react";
import "./App.scss";
import _jobs from "./data/jobs.json";

_jobs.forEach((job) => {
  job.status = "send";
});

const statuses = ["send", "wait", "interview", "declined", "accepted"];

function App() {
  const [displayKind, setDisplayKind] = useState("");
  const [jobs, setJobs] = useState([]);

  const saveToLocalStorage = () => {
    const jobAppState = {
      displayKind,
      jobs,
    };
    localStorage.setItem("jobAppState", JSON.stringify(jobAppState));
  };

  const loadFromLocalStorage = () => {
    const jobAppState = JSON.parse(localStorage.getItem("jobAppState"));
    // updateWithJsonFile(_jobs, jobAppState);
    // if (jobAppState === null) {
    //   setDisplayKind("full");
    //   setJobs(_jobs);
    // } else {
    //   setDisplayKind(jobAppState.displayKind);
    //   setJobs(jobAppState.jobs);
    // }
  };

  // const loadTechItems = () => {
  //   (async () => {
  //     const response = await fetch(techItemsUrl);
  //     let _techItems = await response.json();
  //     setTechItems(_techItems);
  //   })();
  // };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
  }, [displayKind, jobs]);

  const handleToggleView = () => {
    const _displayKind = displayKind === "full" ? "list" : "full";
    setDisplayKind(_displayKind);
  };

  const handleStatusChange = (job) => {
    let statusIndex = statuses.indexOf(job.status);
    statusIndex++;
    if (statusIndex > statuses.length - 1) {
      statusIndex = 0;
    }
    job.status = statuses[statusIndex];
    setJobs([...jobs]);
  };

  return (
    <div className="App">
      <h1>Job Application Process</h1>
      <button className="toggle" onClick={handleToggleView}>
        Toggle View
      </button>
      {displayKind === "full" ? (
        <JobsFull
          jobs={jobs}
          handleStatusChange={handleStatusChange}
          techItems={techItems}
        />
      ) : (
        <JobsList jobs={jobs} />
      )}
    </div>
  );
}

export default App;
