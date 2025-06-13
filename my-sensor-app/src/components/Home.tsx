import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
} from "@mui/material";
import ApexLineChart from "./SensorComponent";
import type { seriesProps, wsReturn } from "../App";

interface HomeProps {
  message: wsReturn | null;
  series: seriesProps[];
}

export default function HomeComponent({ message, series }: HomeProps) {
  return (
    <>
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
            <CardHeader title="Umidade" />
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
    </>
  );
}
