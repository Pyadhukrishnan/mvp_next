export const formatDateToYYYYMMDD = (date: Date): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid date object provided");
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit format
    const day = String(date.getDate()).padStart(2, "0");
  
    return `${year}/${month}/${day}`;
  };