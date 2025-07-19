const dateFormat = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleString("en-IN", {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export default dateFormat;
