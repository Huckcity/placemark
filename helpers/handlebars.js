const helpers = (hbs) => {
  hbs.registerHelper("formatDate", (date) => {
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
    return prettyDate;
  });

  hbs.registerHelper("truncateToWords", (str, len) => {
    // Helper to truncate string to len words
    if (!str) {
      return "";
    }
    const truncated = str.split(" ").slice(0, len).join(" ");
    return `${truncated}...`;
  });

  hbs.registerHelper("ifEq", function (str1, str2, options) {
    // Helper to check if two strings are equal
    if (str1 === str2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  hbs.registerHelper("lastItemByCreateDate", (arr) => {
    // Helper to get last item in array by create date
    if (!arr) {
      return "";
    }
    const sorted = arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return sorted[0];
  });

  hbs.registerHelper("average", (item, divisor) => {
    // Helper to get calc average of two numbers
    if (!item || !divisor) {
      return "";
    }
    return (item / divisor).toFixed(2);
  });
};

export default helpers;
