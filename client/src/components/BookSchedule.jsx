import { useContext, useEffect, useState } from "react";
import { apiInstance } from "../api/axiosInstance";
import { API_ENDPOINTS } from "../constants/endpoints";
import { Box, Button, Paper, Typography, Stack } from "@mui/material";

import Modal from "@mui/material/Modal";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { AuthContext } from "../context/AuthProvider";

import ModalInfo from "./shared/ModalInfo";
import { useNavigate } from "react-router-dom";

function BookSchedule() {
  // logic for recruiter selection, date picking, and booking
  const [recruiters, setRecruiters] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState({});
  const [selectedSlot, setSelectedSlot] = useState({});
  const [date, setDate] = useState(dayjs());
  const [recruiterAvailability, setRecruiterAvailability] = useState([]);

  // modal logic
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // loggedin user details
  const { authState } = useContext(AuthContext);

  const navigate = useNavigate();

  // fetching all the recruiters
  const fetchRecruiters = async () => {
    try {
      const { data } = await apiInstance.get(API_ENDPOINTS.ALL_RECRUITERS);
      setRecruiters(data?.recruiters);
      setSelectedRecruiter(data?.recruiters[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  // fetching slots of selected recruiter
  const fetchRecruiterSlots = async (recruiterId, date) => {
    try {
      const { data } = await apiInstance.get(
        API_ENDPOINTS.RECRUITER_SCHEDULES(recruiterId, date)
      );
      setRecruiterAvailability(data.schedules);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const { _id } = selectedRecruiter;
    const formattedDate = date.format("ddd MMM DD YYYY");
    if (_id && formattedDate) {
      fetchRecruiterSlots(_id, formattedDate);
    }
  }, [selectedRecruiter, date]);

  // handle form submission - slot booking
  const handleSubmit = async (e) => {
    console.log(selectedSlot);
    console.log(selectedRecruiter);
    const scheduleData = {
      recruiterId: selectedRecruiter._id,
    };
    e.preventDefault();
    try {
      const { data } = await apiInstance.post(
        API_ENDPOINTS.SCHEDULE_BOOKING(selectedSlot.id),
        scheduleData
      );
      console.log(data);
      navigate("/schedule/view");
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const shouldDisableDate = (day) => {
    // Disable Fridays, Saturdays, and Sundays
    return day.day() === 5 || day.day() === 6 || day.day() === 0;
  };

  return (
    <Paper
      sx={{
        padding: "1rem 2rem",
        margin: "auto",
        marginTop: "5.5rem",
        width: "80%",
        height: "83vh",
      }}>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Pick a Recruiter, Choose a Date and Book the Slot
      </Typography>
      {recruiters.map((recruiter) => {
        const { name, _id } = recruiter;
        return (
          <Button
            variant={selectedRecruiter?._id === _id ? "contained" : "outlined"}
            onClick={() => {
              setSelectedRecruiter(recruiter);
            }}
            key={_id}
            sx={{
              marginRight: "1rem",
            }}>
            {name}
          </Button>
        );
      })}
      <Stack
        direction="row"
        spacing={5}
        sx={{
          width: "100%",
          marginTop: "1.5rem",
        }}>
        <Box
          sx={{
            border: "1px #267ED4 solid",
            borderRadius: ".5rem",
            display: "flex",
            justifyContent: "flex-start",
            width: "50%",
          }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={dayjs()}
              value={date}
              minDate={dayjs()}
              shouldDisableDate={shouldDisableDate}
              onChange={(newValue) => {
                setDate(newValue);
              }}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            border: "1px #267ED4 solid",
            width: "50%",
            padding: ".6rem",
            borderRadius: ".5rem",
          }}>
          <Typography variant="subtitle1">
            Date : {date ? date.format("ddd, MMM DD, YYYY") : "none"}
          </Typography>
          <Stack sx={{ marginTop: ".5rem" }}>
            {recruiterAvailability.length > 0 ? (
              recruiterAvailability.map((item) => {
                const { start, end, _id } = item;
                console.log(_id);

                const timeFormatter = (time) => {
                  const newTime = new Date(time);
                  const newHour = newTime.getHours();
                  const newMinute = newTime.getMinutes();
                  const startString = `${newHour}:${
                    newMinute < 10 ? "0" + newMinute : newMinute
                  }`;
                  return startString;
                };

                const startString = timeFormatter(start);
                const endString = timeFormatter(end);

                return (
                  <Button
                    key={_id}
                    variant="outlined"
                    onClick={() => {
                      setSelectedSlot({
                        id: _id,
                        startString,
                        endString,
                      });
                      handleOpen();
                    }}
                    sx={{
                      margin: ".25rem auto",
                      width: "75%",
                    }}>
                    {startString} - {endString}
                  </Button>
                );
              })
            ) : (
              <Box>
                <Typography>No Available slots</Typography>
              </Box>
            )}
          </Stack>
        </Box>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}>
          <Typography id="modal-modal-title" variant="h6" textAlign="center">
            Booking Confirmation
          </Typography>
          <ModalInfo
            title={"Recruiter"}
            info={selectedRecruiter?.name}></ModalInfo>
          <ModalInfo
            title={"Date"}
            info={date?.format("ddd, MMM DD, YYYY")}></ModalInfo>
          <ModalInfo
            title={"Time"}
            info={`${selectedSlot.startString} - ${selectedSlot.endString}`}></ModalInfo>
          <ModalInfo title={"Candidate"} info={authState?.name}></ModalInfo>

          <ModalInfo title={"Email"} info={authState?.email}></ModalInfo>
          <ModalInfo title={"Phone"} info={authState?.mobile}></ModalInfo>
          <Button
            type="submit"
            sx={{
              width: "100%",
              marginTop: "1rem",
            }}
            variant="contained">
            Confirm
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
}

export default BookSchedule;
