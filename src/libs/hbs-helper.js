const hbs = require("hbs");

hbs.registerHelper("get_full_time", (date) => {
  if (!(date instanceof Date)) {
    return 'Invalid date'; 
  }

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const tanggal = date.getDate();
  const bulan = months[date.getMonth()];
  const tahun = date.getFullYear();

  let jam = date.getHours();
  let menit = date.getMinutes();

  if (jam < 10) {
    jam = "0" + jam;
  }

  if (menit < 10) {
    menit = "0" + menit;
  }

  return `${tanggal} ${bulan} ${tahun} `;
});

hbs.registerHelper("get_distance_time", (timePost) => {
  if (!(timePost instanceof Date)) {
    return 'Invalid time'; //
  }

  const timeNow = new Date();
  const distance = timeNow - timePost; // 
  const seconds = Math.floor(distance / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const day = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 60) {
    return `${hours} hours ago`;
  } else if (day < 24) {
    return `${day} day ago`;
  }
});

hbs.registerHelper("get_duration", (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate) || isNaN(endDate)) {
    return 'Invalid date range'; // 
  }

  const duration = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)); // in days
  const months = Math.floor(duration / 30);
  const days = duration % 30;

  return `${months} month(s) and ${days} day(s)`; 
});



hbs.registerHelper('contains', function(array, value) {
  if (Array.isArray(array)) {
    return array.includes(value);
  }
  return false;  // Kembalikan false jika bukan array
});
