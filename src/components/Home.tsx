import React from "react";
import { Grid, Typography, Card, CardMedia, CardContent, CardActions, Button } from "@mui/material";

interface HomePageProps {
  user: any;
  playlists: any[];
  deviceId: string | null;
  handlePlay: (uri: string) => void;
  handlePause: () => void;
}

const HomePage: React.FC<HomePageProps> = ({
  user,
  playlists,
  deviceId,
  handlePlay,
  handlePause,
}) => (
  <Grid
    container
    style={{
      backgroundColor: "black",
      color: "white",
      minHeight: "100vh",
      padding: "2rem",
    }}
    spacing={4}
  >
    <Grid item xs={12} style={{ textAlign: "center" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Your Playlists
      </Typography>
    </Grid>
    {playlists.map((playlist) => (
      <Grid item xs={12} sm={6} md={4} key={playlist.id}>
        <Card style={{ backgroundColor: "#1e1e1e", color: "white" }}>
          {playlist.images && playlist.images.length > 0 ? (
            <CardMedia
              component="img"
              alt={playlist.name}
              height="140"
              image={playlist.images[0].url}
            />
          ) : (
            <CardMedia
              component="img"
              alt="default"
              height="140"
              image="default-image-url"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {playlist.name}
            </Typography>
          </CardContent>
          <CardActions style={{display: "flex", justifyContent: "space-around"}}>
            <Button
              size="small"
              color="primary"
              onClick={() => handlePlay(playlist.uri)}
              onTouchEnd={() => handlePlay(playlist.uri)}
              style={{ color: "#1DB954" }}
            >
              Play
            </Button>
            <Button
              size="small"
              color="secondary"
              onClick={handlePause}
              onTouchEnd={handlePause}
              style={{ color: "#f44336" }}
            >
              Pause
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default HomePage;
