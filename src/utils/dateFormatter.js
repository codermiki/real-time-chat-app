/**
 * Format an ISO 8601 UTC date string into an object with local time parts
 *
 * @param {string} isoString - The ISO date string (e.g. "2025-08-19T16:45:31.812Z")
 * @param {string} [locale=navigator.language] - Locale string (defaults to browser's locale)
 * @returns {{day: string, year: string, time: string}} - Formatted parts
 */
export const formatDateParts = (isoString, locale = navigator.language) => {
   const date = new Date(isoString);

   const day = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "2-digit",
   }).format(date);

   const year = new Intl.DateTimeFormat(locale, {
      year: "numeric",
   }).format(date);

   const time = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // set to false if you prefer 24h format
   }).format(date);

   return { day, year, time };
};
