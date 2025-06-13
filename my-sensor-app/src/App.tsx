import Typography from "@mui/material/Typography";

import { Box } from "@mui/system";

export interface wsReturn {
  temperature: number;
  Humidity: number;
}

// import io from 'socket.io-client'
import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import { TemperatureAlertModal } from "./components/Modal";
import { AppBar, Button, Toolbar } from "@mui/material";
import HomeComponent from "./components/Home";
import { TemperatureAlertTable } from "./components/TemperatureAlertTable";

type View = "home" | "relatorios" | "dashboard";

type dados = {
  x: number;
  y: number;
};

export interface seriesProps {
  name: string;
  data: dados[];
}

export interface AlertEntry {
  temperature: number;
  timestamp: string;
  reason: string;
}

const Home = () => {
  const [message, setMessage] = useState<wsReturn | null>(null);
  const [currentView, setCurrentView] = useState<View>("home");
  const [series, setSeries] = useState<seriesProps[]>([
    { name: "Humidity", data: [] },
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlerts] = useState<AlertEntry[]>([]);
  const handleClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    const alert: AlertEntry = {
      temperature: 45,
      timestamp: new Date().toLocaleString(),
      reason: "Temperatura acima do limite (30°C)",
    };
    setTimeout(() => setAlerts([alert]), 3000);
  }, []);

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
        const alert: AlertEntry = {
          temperature: newTemp,
          timestamp: new Date().toLocaleString(),
          reason: "Temperatura acima do limite (30°C)",
        };

        setAlerts((prev) => [...prev, alert]);
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
      <Grid sx={{ paddingBottom: "1rem" }}>
        <AppBar position="static">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Logo</Typography>
            <Box>
              <Button color="inherit" onClick={() => setCurrentView("home")}>
                Início
              </Button>
              <Button
                color="inherit"
                onClick={() => setCurrentView("relatorios")}
              >
                Relatórios
              </Button>
              <Button
                color="inherit"
                onClick={() => setCurrentView("dashboard")}
              >
                Dashboard
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Grid>

      {currentView === "home" && (
        <HomeComponent message={message} series={series} />
      )}
      {currentView === "relatorios" && (
        <TemperatureAlertTable data={alertData} />
      )}

      <TemperatureAlertModal
        open={showAlert}
        temperature={message?.temperature.toFixed(2) ?? ""}
        onClose={handleClose}
      />
    </Grid>
  );
};

export default Home;
