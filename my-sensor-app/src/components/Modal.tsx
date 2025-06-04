// src/components/TemperatureAlertModal.tsx
import { Modal, Box, Typography, Fade, Backdrop } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface Props {
  open: boolean;
  onClose: () => void;
  temperature: string;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  textAlign: "center",
  animation: "pulse 1.5s infinite",
};

export const TemperatureAlertModal = ({
  open,
  onClose,
  temperature,
}: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <WarningAmberIcon
            sx={{ fontSize: 60, color: "warning.main", mb: 2 }}
          />
          <Typography variant="h6" color="warning.main">
            Alerta de Temperatura!
          </Typography>
          <Typography sx={{ mt: 1 }}>
            A temperatura atingiu <strong>{temperature}°C</strong>
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};
