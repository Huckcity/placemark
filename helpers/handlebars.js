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

  hbs.registerHelper("truncateToWords", function (str, len) {
    // Helper to truncate string to len words
    if (!str) {
      return "";
    }
    const truncated = str.split(" ").slice(0, len).join(" ");
    return truncated + "...";
  });

  hbs.registerHelper("ifEq", function (str1, str2, options) {
    // Helper to check if two strings are equal
    if (str1 === str2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
};

export default helpers;
