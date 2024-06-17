import React from "react";
import '../App.css';
import { Grid } from "@mui/material";

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
  <Grid container style={{ backgroundColor: "black", color: "white" , display: "flex",
    flexDirection: "column", }}>
    <Grid item>
    <h1 style={{ color: "white" }}>Welcome {user?.display_name}</h1>
    </Grid>
    <Grid item
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Grid container justifyContent="space-between" style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <h2>Your Playlists</h2>
      {playlists.map((playlist) => (
        <Grid
        item
          key={playlist.id}
         className="card"
         style={{marginBottom: "1rem"}}
        >
            <Grid container>
          <Grid item xs={4} sm={6}>
            {playlist.images && playlist.images.length > 0 ? (
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                width={100}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <img
                src="default-image-url"
                alt="default"
                width={100}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </Grid>
          <Grid item xs={8} sm={6}>
            <h2 style={{ fontSize: "30px" }}>{playlist.name}</h2>
            <button onClick={() => handlePlay(playlist.uri)}>Play</button>
            <button onClick={handlePause}>Pause</button>
          </Grid>
          </Grid>
        </Grid>
      ))}
      </Grid>
    </Grid>
  </Grid>
);

export default HomePage;
