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

  hbs.registerHelper("equalIds", function (id1, id2, options) {
    // Helper to check if two mongoose object id's are equal
    if (id1.equals(id2)) {
      return true;
    }
    return false;
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
      return false;
    }
    return (item / divisor).toFixed(2);
  });

  hbs.registerHelper("isLiked", (userFavs, placeId) => {
    // Helper to check if user has liked a place
    const placeIdString = placeId.toString();
    if (!userFavs || !placeId) {
      return false;
    }
    return userFavs.includes(placeIdString);
  });

  hbs.registerHelper("stars", (rating) => {
    // Helper to get stars from rating
    if (!rating) {
      return "";
    }
    const ratingRoundedDown = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < ratingRoundedDown; i++) {
      stars.push("<i class='fas fa-star'></i>");
    }
    if (rating % 1 !== 0) {
      stars.push("<i class='fas fa-star-half-alt'></i>");
    }

    return stars.join("");
  });

  hbs.registerHelper("last", function (array) {
    return array[array.length - 1];
  });
};

export default helpers;
