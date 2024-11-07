export default () => {
  const tempMessages = useState("tempMessages", () => []);

  const addMessage = (message) => {
    tempMessages.value = [...tempMessages.value, message];
  };

  return {
    tempMessages,
    addMessage,
  };
};
