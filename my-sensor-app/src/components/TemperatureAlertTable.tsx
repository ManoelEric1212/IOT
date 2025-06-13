import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";
import type { AlertEntry } from "../App";

interface Props {
  data: AlertEntry[];
}

export const TemperatureAlertTable: React.FC<Props> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Histórico de Alertas
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Data e Hora</TableCell>
            <TableCell>Temperatura (°C)</TableCell>
            <TableCell>Motivo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((alert, index) => (
            <TableRow key={index}>
              <TableCell>{alert.timestamp}</TableCell>
              <TableCell>{alert.temperature}</TableCell>
              <TableCell>{alert.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
