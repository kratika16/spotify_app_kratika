const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = "5d0f7f791d8f4e699ede87897ad45ed7";
const REDIRECT_URI = process.env.NODE_ENV === 'production'
  ? 'https://master--kratika-spotify.netlify.app/callback'
  : 'http://localhost:3000/callback';
console.log("hey", CLIENT_ID, REDIRECT_URI)
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-read-playback-state',
  'user-modify-playback-state'
];

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join('%20')}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {} as { [key: string]: string });
};
