function formatDate(dateString: string, includeYear: boolean = true): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric', // 26
    month: 'short', // Sept
    ...(includeYear && {year: 'numeric'}), // Only include year if `includeYear` is true
  });
}

export function formatTripDates(
  startDateString: string,
  endDateString: string,
): {startDate: string; endDate: string} {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const includeYear = startDate.getFullYear() !== endDate.getFullYear();

  const formattedStartDate = formatDate(startDateString, includeYear);
  const formattedEndDate = formatDate(endDateString, includeYear);

  return {
    startDate: formattedStartDate,
    endDate: formattedEndDate,
  };
}
