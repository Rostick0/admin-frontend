import Echo from "laravel-echo";
import Pusher from "pusher-js";

// BROADCAST_DRIVER=pusher
// PUSHER_APP_KEY=app-key
// PUSHER_HOST=http://localhost
// PUSHER_APP_SECRET=app-secret
// PUSHER_PORT=6001
// PUSHER_APP_CLUSTER=mt1

export const initSocket = ({ window, config, accessToken }) => {
  window.Pusher = Pusher;

  window.Echo = new Echo({
    broadcaster: config.public.BROADCAST_DRIVER,
    key: config.public.PUSHER_APP_KEY,
    wsHost: config.public.HOST,
    // wsHost: 'localhost',
    wsPort: config.public.PUSHER_PORT,
    cluster: config.public.PUSHER_APP_CLUSTER,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
    auth: {
      headers: {
        Authorization: "Bearer " + accessToken.value,
      },
    },
    authEndpoint: `${config.public.BACK_URL}/broadcasting/auth`,
  });
};

export const socketListenAll = ({ window, user }) => {
  window.Echo.private(`message.${user.value?.id}`).listen(
    "Message",
    (event) => {
      // console.log(event);
      // const { addMessage } = useTempMessage();

      // addMessage(event?.data);
      // if (event?.chat_id == userChatSelected.value?.chat_id) {
      //   store.commit('createMessage', event);
      // } else if (event?.user_id != me?.value?.user?.id) {
      //   store.commit('addMessageIds', event?.chat_id);
      //   store.commit('editChat', event);

      //   store.dispatch('syncAddAlert', { alert: event, typeAlert: 'message' })
      // }
    }
  );
};
