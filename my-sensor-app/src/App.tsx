// ** MUI Imports
import Card from "@mui/material/Card";

import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/system";

interface wsReturn {
  temperature: number;
  Humidity: number;
}

// import io from 'socket.io-client'
import { useEffect, useState } from "react";
import ApexLineChart from "./components/SensorComponent";
import Grid from "@mui/material/Grid";
import { TemperatureAlertModal } from "./components/Modal";

const Home = () => {
  const [message, setMessage] = useState<wsReturn | null>(null);
  const [series, setSeries] = useState([
    { name: "Humidity", data: [] as { x: number; y: number }[] },
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const handleClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    // Cria a conexão WebSocket
    const socket = new WebSocket("ws://localhost:1880/test/esp32");

    // Evento de mensagem recebida
    socket.onmessage = (event) => {
      setMessage(JSON.parse(event.data));
      const newData = JSON.parse(event.data);
      console.log("newData", newData);
      const newTemp = newData.temperature;
      if (newTemp > 31) {
        setShowAlert(true);
      }
      setSeries((prevSeries) => {
        const newSeries = [...prevSeries];
        const now = new Date().getTime(); // Timestamp atual
        newSeries[0].data.push({ x: now, y: newTemp });
        if (newSeries[0].data.length > 20) {
          newSeries[0].data.shift();
        }

        return newSeries;
      });
    };

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    // Evento de fechamento da conexão
    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Evento de erro
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Feche a conexão quando o componente for desmontado
    return () => {
      socket.close();
    };
  }, []);
  console.log(message);

  return (
    <Grid container sx={{ display: "flex", flexDirection: "column" }}>
      <Grid sx={{ display: "flex", gap: "1rem" }}>
        <Grid>
          <Card>
            <CardHeader title="Temperatura" />
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.2rem",
              }}
            >
              <Box>
                <Typography sx={{ mb: 4 }}>
                  Card destinado às leituras de temperatura
                </Typography>
                <Typography sx={{ color: "primary.main" }}>
                  As leituras provenientes do sensor DHT11 com ESP 32
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "2.5rem" }}>
                  {message?.temperature.toFixed(2) ?? 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card>
            <CardHeader title="Humidade" />
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.2rem",
              }}
            >
              <Box>
                <Typography sx={{ mb: 4 }}>
                  Card destinado às leituras de humidade
                </Typography>
                <Typography sx={{ color: "primary.main" }}>
                  As leituras provenientes do sensor DHT11 com ESP 32
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: "2.5rem" }}>
                  {message?.Humidity.toFixed(2) ?? 0}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid sx={{ marginTop: "1rem" }}>
        <ApexLineChart data={series} />
      </Grid>
      <TemperatureAlertModal
        open={showAlert}
        temperature={message?.temperature.toFixed(2) ?? ""}
        onClose={handleClose}
      />
    </Grid>
  );
};

export default Home;
