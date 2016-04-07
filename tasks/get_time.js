module.exports = function() {
  var currentMinute,
      currentHour,
      upcomingMinute,
      upcomingHour,
      td = new Date();

  currentMinute = (parseInt(td.getMinutes() / 15) * 15);
  currentHour   = td.getHours();

  upcomingMinute = currentMinute  === 45 ? 0 : currentMinute + 15;
  upcomingHour   = upcomingMinute === 0  ? currentHour + 1 : currentHour;
  upcomingHour   = upcomingHour   === 24 ? 0 : upcomingHour;

  return({
    current: {
      hour:   currentHour,
      minute: currentMinute
    },
    upcoming: {
      hour:   upcomingHour,
      minute: upcomingMinute
    }
  });
}
