function getFirstAndLastDayOfYearMonths(
  month: number
): { firstDayOfPreviousMonth: string; lastDayOfNextMonth: string } | null {
  // Validação do mês (deve estar entre 1 e 12)
  if (month < 1 || month > 12) {
    console.error("Mês inválido. Forneça um mês entre 1 e 12.");
    return null;
  }

  // Obtém o ano atual
  const currentYear = new Date().getFullYear();

  // Calcula o primeiro dia do mês anterior
  const firstDayOfPreviousMonth = new Date(
    currentYear,
    month - 1,
    1
  ).toLocaleDateString("pt-br");

  // Calcula o último dia do mês seguinte
  const lastDayOfNextMonth = new Date(currentYear, month, 0).toLocaleDateString(
    "pt-br"
  );

  return {
    firstDayOfPreviousMonth,
    lastDayOfNextMonth,
  };
}
function getDateToYYYYMM(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth()}`
    }`;
}

function getMonthfromYYYYMMstring(dateValue: string) {
  const date = new Date(dateValue);
  console.log(date, date.getMonth())
  return date.getMonth() + 2;
}

export {
  getFirstAndLastDayOfYearMonths,
  getDateToYYYYMM,
  getMonthfromYYYYMMstring,
}