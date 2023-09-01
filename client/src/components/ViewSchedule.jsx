import { useEffect, useState } from "react";
import { apiInstance } from "../api/axiosInstance";
import { API_ENDPOINTS } from "../constants/endpoints";
import { Box, Paper } from "@mui/material";
import ModalInfo from "./shared/ModalInfo";

function ViewSchedule() {
  const [schedules, setSchedules] = useState([]);

  // fetch the schedulings of logged in user
  const fetchSchedules = async () => {
    try {
      const { data } = await apiInstance.get(API_ENDPOINTS.CANDIDATE_SCHEDULE);
      console.log(data);
      setSchedules(data.schedules);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <Box sx={{ marginTop: "6rem", display: "flex", justifyContent: "start" }}>
      {schedules.map((schedule) => {
        const timeFormatter = (time) => {
          const newTime = new Date(time);
          const newHour = newTime.getHours();
          const newMinute = newTime.getMinutes();
          const startString = `${newHour}:${
            newMinute < 10 ? "0" + newMinute : newMinute
          }`;
          return startString;
        };
        const { _id, start, end, meetDate } = schedule;
        const { name, email, mobile } = schedule.recruiterId;
        const startTime = timeFormatter(start);
        const endTime = timeFormatter(end);

        return (
          <Paper
            key={_id}
            sx={{
              width: "25%",
              padding: "1rem 2rem",
              margin: "1rem",
              backgroundColor: "#42F5B9",
              paddingBottom: "2rem",
              fontSize: "1.2rem",
            }}>
            <ModalInfo title={"Recruiter"} info={name}></ModalInfo>
            <ModalInfo title={"Date"} info={meetDate}></ModalInfo>
            <ModalInfo
              title={"Time"}
              info={`${startTime} -- ${endTime}`}></ModalInfo>
            <ModalInfo title={"Email"} info={email}></ModalInfo>
            <ModalInfo title={"Mobile"} info={mobile}></ModalInfo>
          </Paper>
        );
      })}
    </Box>
  );
}

export default ViewSchedule;
