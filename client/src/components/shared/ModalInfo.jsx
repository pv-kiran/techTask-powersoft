/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";

function ModalInfo({ title, info }) {
  return (
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <span style={{ fontWeight: "bold" }}>{title} </span>: {info}
    </Typography>
  );
}

export default ModalInfo;
