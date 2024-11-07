import Echo from "laravel-echo";
import Pusher from "pusher-js";

// BROADCAST_DRIVER=pusher
// PUSHER_APP_KEY=app-key
// PUSHER_HOST=http://localhost
// PUSHER_APP_SECRET=app-secret
// PUSHER_PORT=6001
// PUSHER_APP_CLUSTER=mt1

export const initSocket = (window, accessToken) => {
  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "app-key",
    // wsHost: "92.63.179.235",
    wsHost: "localhost",
    // wsHost: "127.0.0.1",
    wsPort: 6001,
    cluster: "mt1",
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    auth: {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    },
    authEndpoint: "http://localhost/broadcasting/auth",
    // authEndpoint: "http://127.0.0.1/broadcasting/auth",
    // authEndpoint: "http://92.63.179.235/broadcasting/auth",
  });
};

export const socketListenAll = (window, user, addMessage) => {
  window.Echo.private(`message.${user?.id}`).listen("Message", (event) => {
    addMessage(event?.data);
  });
};
