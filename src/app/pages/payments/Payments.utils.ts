const PL_MONTHS = [
  'styczeń',
  'luty',
  'marzec',
  'kwiecień',
  'maj',
  'czerwiec',
  'lipiec',
  'sierpień',
  'wrzesień',
  'październik',
  'listopad',
  'grudzień',
];

const formatIssueDate = (type: string, value: string): string => {
  if (type !== 'Rent') return value;

  const match = /^(\d{4})-(\d{2})-\d{2}/.exec(value);
  if (!match) return value;

  const [, year, month] = match;
  const monthName = PL_MONTHS[Number(month) - 1];

  return monthName ? `${monthName} ${year}` : value;
};

export const hasInput = (value: unknown) => String(value ?? '').trim() !== '';

export const replaceStringVariables = (
  type: string,
  string: string,
  variables: Record<string, string | number | boolean>,
): string =>
  string.replace(/##(.*?)##/g, (match, key: string) => {
    const value = variables[key];

    if (value === undefined) return match;

    return key === 'issueDate' ? formatIssueDate(type, String(value)) : String(value);
  });
