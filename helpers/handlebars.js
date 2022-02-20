const helpers = (hbs) => {
  hbs.registerHelper("formatDate", function (date) {
    // Helper to format date to "Last edited at HH:MM on DD MMM"
    if (!date) {
      return "";
    }
    const options = {
      weekday: "short",

      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const prettyDate = new Date(date).toLocaleString("en-US", options);
    return `Last edited on ${prettyDate}`;
  });
};

export default helpers;
