import { Select } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

function getFirstAndLastDayOfYearMonths(month : number ) {
  // Validação do mês (deve estar entre 1 e 12)
  if (month < 1 || month > 12) {
    return "Mês inválido. Forneça um mês entre 1 e 12.";
  }

  // Obtém o ano atual
  const currentYear = new Date().getFullYear();

  // Calcula o primeiro dia do mês anterior
  const firstDayOfPreviousMonth = new Date(currentYear, month -1, 1).toLocaleDateString('pt-br');
  

  // Calcula o último dia do mês seguinte
  const lastDayOfNextMonth = new Date(currentYear, month, 0).toLocaleDateString('pt-br');

  return {
    firstDayOfPreviousMonth,
    lastDayOfNextMonth,
  };
}

enum Months {
  Janeiro = 1,
  Fevereiro = 2,
  Março = 3,
  Abril = 4,
  Maio = 5,
  Junho = 6,
  Julho = 7,
  Agosto = 8,
  Setembro = 9,
  Outubro = 10,
  Novembro = 11,
  Dezembro = 12,
}

export function MonthInput() {
  const [selectedMonth, setSelectedMonth] = useState(Months.Janeiro);

  const handleMonthChange = (event: any) => {
    setSelectedMonth(Number(event.target.value));
  };
  return (
    <div>
    <Select value={selectedMonth} onChange={handleMonthChange}>
      {Object.entries(Months).map(([monthName, monthValue]) => (
        <option key={monthValue} value={monthValue}>
          {monthName}
        </option>
      ))}
    </Select>
    <p>Selected Month: {selectedMonth}</p>
  </div>
  );
}