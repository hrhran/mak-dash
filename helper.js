const convertTime = (time) => {
  var theDate = new Date(time * 1000);
  return (dateString = theDate
    .toGMTString()
    .replace(/^(.+?),/, "")
    .replace("GMT", ""));
};

module.exports = {
  convertTime,
};
