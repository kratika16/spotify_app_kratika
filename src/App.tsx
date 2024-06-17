import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl} from "./auth/SpotifyAuth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/Home";
import LoginPage from "./components/Login";
import Header from "./components/Header";
import "./App.css";

const spotifyApi = new SpotifyWebApi();

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  console.log("Player", player)

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      localStorage.setItem("spotifyToken", _token); //storing token in localStorage incase user refreshes the page it shouldn't logout
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
          setPlayer(player); //sets the player once it is ready
        });

        player.addListener(
          "not_ready",
          ({ device_id }: { device_id: string }) => {
            console.log("Device ID has gone offline", device_id);
          }
        );

        player.connect();
      };
    } else {
      const storedToken = localStorage.getItem("spotifyToken");
      if (storedToken) {
        setToken(storedToken);
        spotifyApi.setAccessToken(storedToken);

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
              cb(storedToken);
            },
          });

          player.addListener(
            "ready",
            ({ device_id }: { device_id: string }) => {
              setDeviceId(device_id);
              console.log("Ready with Device ID", device_id);
              setPlayer(player);
            }
          );

          player.addListener(
            "not_ready",
            ({ device_id }: { device_id: string }) => {
              console.log("Device ID has gone offline", device_id);
            }
          );

          player.connect();
        };
      }
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
    if (deviceId) {
      spotifyApi
        .pause({
          device_id: deviceId,
        })
        .catch((error) => {
          console.error("Error pausing the playback:", error);
        });
    }
  };

  return (
    <Router>
      <div className="App">
        {user && <Header user={user} />}
        <Routes>
          <Route
            path="/home"
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
