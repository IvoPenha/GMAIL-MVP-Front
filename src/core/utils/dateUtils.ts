function getFirstAndLastDayOfYearMonths(
  month: number
): { dataInicio: string; dataFim: string } | null {
  // Validação do mês (deve estar entre 1 e 12)
  if (month < 1 || month > 12) {
    console.error("Mês inválido. Forneça um mês entre 1 e 12.");
    return null;
  }

  // Obtém o ano atual
  const currentYear = new Date().getFullYear();

  // Calcula o primeiro dia do mês anterior
  const dataInicio = new Date(
    currentYear,
    month - 1,
    1
  ).toLocaleDateString("pt-br");

  // Calcula o último dia do mês seguinte
  const dataFim = new Date(currentYear, month, 0).toLocaleDateString(
    "pt-br"
  );

  return {
    dataInicio,
    dataFim,
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

function getFirstDayFromPreviousMonthAndLastDayOfTheMonthByYYYYMMstring(dateValue: string) {
  const date = new Date(dateValue);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dataInicio = new Date(year, month - 2, 1);
  const dataFim = new Date(year, month, 0);
  return {
    dataInicio: dataInicio.toLocaleDateString('pt-br'),
    dataFim: dataFim.toLocaleDateString('pt-br')
  }
}

export {
  getFirstAndLastDayOfYearMonths,
  getDateToYYYYMM,
  getMonthfromYYYYMMstring,
  getFirstDayFromPreviousMonthAndLastDayOfTheMonthByYYYYMMstring
}