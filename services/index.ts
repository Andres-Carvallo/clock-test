import axios from "axios";

export interface ITime {
  abbreviation: string;
  client_ip:    string;
  datetime:     Date;
  day_of_week:  number;
  day_of_year:  number;
  dst:          boolean;
  dst_from:     null;
  dst_offset:   number;
  dst_until:    null;
  raw_offset:   number;
  timezone:     string;
  unixtime:     number;
  utc_datetime: Date;
  utc_offset:   string;
  week_number:  number;
}

const getTimeData = async (timeZone: string): Promise<Date> => {
  const timeFetch = await axios.get(`http://worldtimeapi.org/api/timezone/${timeZone}`);
  const timeInfo = timeFetch.data;
  const date = new Date(timeInfo.unixtime * 1000);
  return date;
}

const getTimeZones = async (): Promise<string[]> => {
  const timeZonesFetch = await axios.get(`http://worldtimeapi.org/api/timezone/`);
  const timeZoneInfo = timeZonesFetch.data;
  return timeZoneInfo;
}

export {
  getTimeData,
  getTimeZones
};
