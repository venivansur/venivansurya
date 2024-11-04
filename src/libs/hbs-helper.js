const hbs = require("hbs");

hbs.registerHelper("get_full_time", (date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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

  return `${tanggal} ${bulan} ${tahun} ${jam}:${menit} WIB`;
})

hbs.registerHelper("get_distance_time", (timePost) => {
  const timeNow = new Date();
  const distance = timeNow - timePost; // hasilnya miliseconds -> 1000ms = 1 detik

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

})

hbs.registerHelper("get_duration",(start, end)  =>{
    const startDate = new Date(start);
    const endDate = new Date(end);
    const duration = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)); // in days
    const months = Math.floor(duration / 30);
    const days = duration % 30;
    return `${months} month(s) and ${days} day(s)`; // Adjust to show months and days
})

