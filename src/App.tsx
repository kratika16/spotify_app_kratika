import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl} from "./auth/SpotifyAuth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/Login";
import HomePage from "./components/Home";

const spotifyApi = new SpotifyWebApi();

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotifyApi.setAccessToken(_token);

      spotifyApi.getMe().then((user: any) => {
        setUser(user);
      });

      spotifyApi.getUserPlaylists().then((playlists: any) => {
        setPlaylists(playlists.items);
      });

      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Spotify Web Player",
          getOAuthToken: (cb: (token: string) => void) => {
            cb(_token);
          },
        });

        player.addListener("ready", ({ device_id }: { device_id: string }) => {
          setDeviceId(device_id);
          console.log("Ready with Device ID", device_id);
          setPlayer(player); // Set player after ready
        });

        player.addListener(
          "not_ready",
          ({ device_id }: { device_id: string }) => {
            console.log("Device ID has gone offline", device_id);
          }
        );

        player.connect();
      };
    }
  }, []);

  const handlePlay = (uri: string) => {
    if (deviceId) {
      spotifyApi
        .play({
          device_id: deviceId,
          context_uri: uri,
        })
        .catch((error) => {
          console.error("Error playing the playlist:", error);
        });
    }
  };

  const handlePause = () => {
    if (player) {
      player
        .pause()
        .then(() => {
          console.log("Playback paused successfully");
        })
        .catch((error: any) => {
          console.error("Error pausing the playback:", error);
        });
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/callback"
            element={
              token ? (
                <HomePage
                  user={user}
                  playlists={playlists}
                  deviceId={deviceId}
                  handlePlay={handlePlay}
                  handlePause={handlePause}
                />
              ) : (
                <LoginPage />
              )
            }
          />
          <Route
            path="/"
            element={
              token ? (
                <HomePage
                  user={user}
                  playlists={playlists}
                  deviceId={deviceId}
                  handlePlay={handlePlay}
                  handlePause={handlePause}
                />
              ) : (
                <LoginPage />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
