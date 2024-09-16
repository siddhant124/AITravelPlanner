export function formatTripDates(startDate: string, endDate: string) {
  // Parse the dates to extract day, month, and year
  const startDateParts = startDate.split(' ');
  const endDateParts = endDate.split(' ');

  // Extract the years from both dates
  const startYear = startDateParts[2];
  const endYear = endDateParts[2];

  // Check if years are the same
  if (startYear === endYear) {
    // Return without the year
    // return `${startDateParts[0]} ${startDateParts[1]} to ${endDateParts[0]} ${endDateParts[1]}`;
    return {
      startDate: `${startDateParts[0]} ${startDateParts[1]}`,
      endDate: `${endDateParts[0]} ${endDateParts[1]}`,
    };
  } else {
    // Return with the year
    return {startDate: startDate, endDate: endDate};
  }
}
