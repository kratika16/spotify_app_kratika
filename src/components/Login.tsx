import { loginUrl } from "../auth/SpotifyAuth";

const LoginPage: React.FC = () => (
  // <a href={loginUrl}>Login to Spotify</a>
  <div
    style={{
      backgroundColor: "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <h2
      style={{
        color: "white",
        marginTop: "8rem",
        textAlign: "center",

        fontFamily: "CircularSp, Helvetica Neue, Helvetica, Arial, sans-serif",
      }}
    >
      Log in to spotify
    </h2>
    <div>
      <a style={{ textDecoration: "none" }} href={loginUrl? loginUrl : "#"}>
        <span className="loginButton">Log In</span>
      </a>
    </div>
    <p style={{ color: "#6a6a6a", fontWeight: "400", marginTop: "5rem" }}>
      Don't have an account?
      <a
        style={{
          color: "white",
          fontWeight: "400",
          marginInlineStart: "8px",
          textDecoration: "underline",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#1ed760";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "white";
        }}
      >
        <span>Sign up for Spotify</span>
      </a>
    </p>
  </div>
);

export default LoginPage;
