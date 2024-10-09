export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ru",
  messages: {
    en: {
      draft: "draft",
      pending: "pending",
      canceled: "canceled",
      working: "working",
      completed: "completed",
      rejected: "rejected",
    },
    ru: {
      draft: "черновик",
      pending: "ожидание",
      canceled: "отменён",
      working: "в работе",
      completed: "завершён",
      rejected: "отклонён",
    },
  },
}));
