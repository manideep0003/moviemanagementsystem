const API_BASE_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : window.location.origin;

const API_URL = API_BASE_URL + "/movies";