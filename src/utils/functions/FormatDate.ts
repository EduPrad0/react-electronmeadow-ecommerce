import { format } from "date-fns";

function formatadata(date: string) {
  return date
    ? format(new Date(date), "dd/MM/yyyy HH:mm:ss")
    : "--/--/---- 00:00:00";
}

export function formatDate(date: Date) {
  const d = new Date(date);

  let iso = `${d.getFullYear().toString()}-`;
  iso += `${(d.getMonth() + 1).toString().padStart(2, "0")}-`;
  iso += `${d.getDate().toString().padStart(2, "0")}T`;
  iso += `${d.getHours().toString().padStart(2, "0")}:`;
  iso += `${d.getMinutes().toString().padStart(2, "0")}:`;
  iso += d.getSeconds().toString().padStart(2, "0");
  const datad = formatadata(iso);
  return datad;
}
