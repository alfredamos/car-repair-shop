export  const formattedDate = (fDate: Date) => {
    // Extract year, month, and day
    const year = fDate.getFullYear();
    const month = (fDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = fDate.getDate().toString().padStart(2, '0');

    // Format the date as "YYYY-MM-DD"
    return `${year}-${month}-${day}`;
}