import moment from "jalali-moment";

export const ShamsiToIsoString = (shamsi: string) => {
    
  let date = moment.from(shamsi, "fa", "YYYY/MM/DD").format("YYYY-MM-DD");
  return `${date}T00:00:00.000Z`;
};
