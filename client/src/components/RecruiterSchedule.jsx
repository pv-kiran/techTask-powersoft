import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Paper, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";

import { useEffect, useState } from "react";
// import { v4 as uuid } from "uuid";

import { apiInstance } from "../api/axiosInstance";
import { API_ENDPOINTS } from "../constants/endpoints";

import "../App.css";

// import LockIcon from "@mui/icons-material/Lock";
const RecruiterSchedule = () => {
  // states related to calender events
  const [events, setEvents] = useState([]);
  const [info, setInfo] = useState({});

  // state for form - schedule
  const [schedule, setSchedule] = useState({ title: "", description: "" });

  // modal logic
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // to habdle calender events -
  const handleSelect = (info) => {
    setInfo(info);
    handleOpen();
  };

  // handle modal form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // handle form submissin
  const handleSubmit = async (e) => {
    e.preventDefault();
    // accesing the event info - calender
    const { start, end } = info;
    // accessing schedule info - form
    const { title, description } = schedule;
    const newSchedule = {
      start,
      end,
      title,
      description,
    };

    try {
      // saving the schedule data
      const { data } = await apiInstance.post(
        API_ENDPOINTS.RECRUITER_SCHEDULE,
        newSchedule
      );
      const response = data?.newSchedule;
      // updating the events
      setEvents([
        ...events,
        {
          start: new Date(response.start),
          end: new Date(response.end),
          title,
          description,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
    // reverting the states
    setSchedule({ title: "", description: "" });
    setInfo({});
    handleClose();
  };

  // fetch all the schedules added by recruiter
  const fetchSchedules = async () => {
    try {
      const { data } = await apiInstance.get(API_ENDPOINTS.RECRUITER_SCHEDULE);
      const events = data?.schedules.map((item) => {
        return {
          ...item,
          start: new Date(item.start),
          end: new Date(item.end),
        };
      });
      console.log(events);
      setEvents(events);
    } catch (err) {
      console.log(err);
    }
  };

  // invoking the fetch schedules api
  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <Paper
      elevation={2}
      style={{
        padding: "1rem",
        margin: "auto",
        marginTop: "6rem",
        width: "75%",
        marginBottom: "1rem",
      }}>
      <FullCalendar
        height={550}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          start: "today prev next",
          center: "title",
          end: "timeGridDay timeGridWeek dayGridMonth",
        }}
        initialView="timeGridDay"
        events={events}
        selectable={true}
        select={handleSelect}
        views={["timeGridDay", "timeGridWeek", "dayGridMonth"]}
        slotDuration="01:00:00"
        slotMinTime="09:00:00" // Set the minimum time to 9 AM
        slotMaxTime="18:00:00"
        allDaySlot={false}
        validRange={{
          start: new Date(), // Set the valid start date to the current date
        }}
        selectAllow={(selectInfo) => {
          const dayOfWeek = selectInfo.start.getDay();
          return dayOfWeek !== 0 && dayOfWeek !== 6 && dayOfWeek !== 5;
        }}
        dayCellDidMount={(args) => {
          const dayOfWeek = args.date.getDay();
          if (dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 5) {
            args.el.classList.add("red-column");
          }
        }}
        hiddenDays={[0, 6]}
        eventClassNames={(args) => {
          if (args.event.extendedProps.isBooked) {
            return ["green-event"];
          }
        }}
        eventContent={renderEventContent}
      />
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
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Title
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={schedule.title}
            name="title"
            onChange={(e) => {
              handleChange(e);
            }}
            fullWidth
            sx={{ marginBottom: ".5rem" }}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Description
          </Typography>
          <textarea
            name="description"
            id=""
            value={schedule.description}
            onChange={(e) => handleChange(e)}
            rows={6}
            style={{
              width: "100%",
              border: "1px dotted solid",
              borderRadius: ".2rem",
              padding: ".4rem",
              fontSize: "1rem",
            }}></textarea>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "1.5rem", width: "100%", padding: ".5rem" }}>
            Confirm
          </Button>
        </Box>
      </Modal>
    </Paper>
  );
};

// for rendering scheduled events
function renderEventContent(eventInfo) {
  const { timeText, event } = eventInfo;
  console.log(event.extendedProps.candidateId);
  return (
    <Box
      sx={{
        padding: ".1rem",
      }}>
      <Typography variant="h6" color="black">
        {timeText}
      </Typography>
      <Typography variant="subtitle1">{event.title}</Typography>
      {event.extendedProps.isBooked ? (
        <Typography variant="subtitle1">
          <span>Candidate: {event.extendedProps.candidateId.name}</span> -{" "}
          <span>Email: {event.extendedProps.candidateId.email}</span>
        </Typography>
      ) : (
        <Typography variant="subtitle1">
          {event.extendedProps.description}
        </Typography>
      )}
      {/* {event.extendedProps.isBooked && <LockIcon></LockIcon>} */}
    </Box>
  );
}

export default RecruiterSchedule;
