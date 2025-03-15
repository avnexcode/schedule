import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const DAYS: { id: number; name: string }[] = [
  { id: 1, name: "monday" },
  { id: 2, name: "tuesday" },
  { id: 3, name: "wednesday" },
  { id: 4, name: "thursday" },
  { id: 5, name: "friday" },
];

const TIMES: { id: number; startTime: string; endTime: string }[] = [
  { id: 1, startTime: "07:30", endTime: "09:00" },
  { id: 2, startTime: "09:00", endTime: "10:30" },
  { id: 3, startTime: "10:30", endTime: "12:00" },
  { id: 4, startTime: "12:30", endTime: "14:00" },
  { id: 5, startTime: "14:00", endTime: "15:30" },
  { id: 6, startTime: "15:30", endTime: "17:00" },
];

const MAJORS: { id: number; name: string }[] = [
  { id: 1, name: "informatics engineering" },
  { id: 2, name: "electrical engineering" },
  { id: 3, name: "agricultural engineering" },
];

type ScheduleOptions = {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  lesson: string;
  major: string;
  batch: number;
};

const SCHEDULE_OPTIONS: ScheduleOptions[] = [
  // Informatics Engineering
  {
    id: 1,
    day: "monday",
    startTime: "07:30",
    endTime: "09:00",
    lesson: "managemen project perangkat lunak",
    major: "informatics engineering",
    batch: 2022,
  },
  {
    id: 2,
    day: "monday",
    startTime: "09:00",
    endTime: "10:30",
    lesson: "pemrograman api",
    major: "informatics engineering",
    batch: 2022,
  },
  {
    id: 3,
    day: "tuesday",
    startTime: "10:30",
    endTime: "12:00",
    lesson: "sistem operasi",
    major: "informatics engineering",
    batch: 2022,
  },
  {
    id: 4,
    day: "tuesday",
    startTime: "12:30",
    endTime: "14:00",
    lesson: "kecerdasan komputasi",
    major: "informatics engineering",
    batch: 2022,
  },
  {
    id: 5,
    day: "tuesday",
    startTime: "14:00",
    endTime: "15:30",
    lesson: "pengolahan citra digital",
    major: "informatics engineering",
    batch: 2022,
  },
  {
    id: 6,
    day: "wednesday",
    startTime: "12:30",
    endTime: "14:00",
    lesson: "arsitektur dan aplikasi bisnis",
    major: "informatics engineering",
    batch: 2022,
  },
  {
    id: 7,
    day: "thursday",
    startTime: "19:00",
    endTime: "20:30",
    lesson: "administrasi jaringan",
    major: "informatics engineering",
    batch: 2022,
  },
  // Electrical Engineering
  {
    id: 8,
    day: "monday",
    startTime: "07:30",
    endTime: "09:00",
    lesson: "rangkaian listrik dasar",
    major: "electrical engineering",
    batch: 2023,
  },
  {
    id: 9,
    day: "monday",
    startTime: "09:00",
    endTime: "10:30",
    lesson: "sistem tenaga listrik",
    major: "electrical engineering",
    batch: 2023,
  },
  {
    id: 10,
    day: "tuesday",
    startTime: "10:30",
    endTime: "12:00",
    lesson: "elektronika daya",
    major: "electrical engineering",
    batch: 2023,
  },
  {
    id: 11,
    day: "tuesday",
    startTime: "12:30",
    endTime: "14:00",
    lesson: "mesin listrik",
    major: "electrical engineering",
    batch: 2023,
  },
  {
    id: 12,
    day: "wednesday",
    startTime: "14:00",
    endTime: "15:30",
    lesson: "sistem kendali",
    major: "electrical engineering",
    batch: 2023,
  },
  {
    id: 13,
    day: "thursday",
    startTime: "12:30",
    endTime: "14:00",
    lesson: "pengolahan sinyal digital",
    major: "electrical engineering",
    batch: 2023,
  },
  {
    id: 14,
    day: "friday",
    startTime: "14:00",
    endTime: "15:30",
    lesson: "sistem mikroprosesor",
    major: "electrical engineering",
    batch: 2023,
  },
  // Agricultural Engineering
  {
    id: 15,
    day: "monday",
    startTime: "07:30",
    endTime: "09:00",
    lesson: "mekanika tanah",
    major: "agricultural engineering",
    batch: 2024,
  },
  {
    id: 16,
    day: "monday",
    startTime: "09:00",
    endTime: "10:30",
    lesson: "sistem irigasi",
    major: "agricultural engineering",
    batch: 2024,
  },
  {
    id: 17,
    day: "tuesday",
    startTime: "10:30",
    endTime: "12:00",
    lesson: "mesin pertanian",
    major: "agricultural engineering",
    batch: 2024,
  },
  {
    id: 18,
    day: "wednesday",
    startTime: "12:30",
    endTime: "14:00",
    lesson: "teknik konservasi tanah",
    major: "agricultural engineering",
    batch: 2024,
  },
  {
    id: 19,
    day: "thursday",
    startTime: "14:00",
    endTime: "15:30",
    lesson: "rekayasa bangunan pertanian",
    major: "agricultural engineering",
    batch: 2024,
  },
  {
    id: 20,
    day: "thursday",
    startTime: "15:30",
    endTime: "17:00",
    lesson: "pengelolaan limbah",
    major: "agricultural engineering",
    batch: 2024,
  },
  {
    id: 21,
    day: "friday",
    startTime: "07:30",
    endTime: "09:00",
    lesson: "hidrologi",
    major: "agricultural engineering",
    batch: 2024,
  },
];

export const ScheduleTable = () => {
  const [schedules] = useState<ScheduleOptions[]>(SCHEDULE_OPTIONS);
  const [selectedMajor, setSelectedMajor] = useState<number | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);

  const filteredSchedules = schedules.filter((schedule) => {
    return (
      (selectedMajor === null ||
        MAJORS.find((major) => major.name === schedule.major)?.id ===
          selectedMajor) &&
      (selectedBatch === null || schedule.batch === selectedBatch)
    );
  });
  const getScheduleByDayAndTime = (day: string, time: string) => {
    return (
      filteredSchedules.find(
        (schedule) => schedule.day === day && schedule.startTime === time,
      )?.lesson ?? "-"
    );
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Jam</TableHead>
          {DAYS.map((day) => (
            <TableHead key={day.id} className="capitalize">
              {day.name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {TIMES.map((time) => (
          <TableRow key={time.id}>
            <TableCell className="font-medium">
              {time.startTime} - {time.endTime}
            </TableCell>
            {DAYS.map((day) => (
              <TableCell key={day.id} className="capitalize">
                {getScheduleByDayAndTime(day.name, time.startTime)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
