const convertTime = (time) => {
  var theDate = new Date(time * 1000);
  return (dateString = theDate
    .toGMTString()
    .replace(/^(.+?),/, "")
    .replace("GMT", ""));
};

const convertISO = (time) => {
  var theDate = new Date(time);
  return (dateString = theDate
    .toGMTString()
    .replace(/^(.+?),/, "")
    .replace("GMT", ""));
};



const formatDate = (data) =>{
  var date = new Date(data);  
  var d = date.getDate();
  var m = date.getMonth()+1;
  var y = date.getFullYear()
  return(d+ '-' +m+ '-' +y) 
}

module.exports = {
  convertTime,
  convertISO,
  formatDate,
};

