import React, {
  useState,
} from "react";
import { Input } from "@chakra-ui/react";

// function getFirstAndLastDayOfYearMonths(
//   month: number
// ): { dataInicio: string; dataFim: string } | null {
//   // Validação do mês (deve estar entre 1 e 12)
//   if (month < 0 || month > 12) {
//     console.error("Mês inválido. Forneça um mês entre 1 e 12.");
//     return null;
//   }

//   // Obtém o ano atual
//   const currentYear = new Date().getFullYear();

//   // Calcula o primeiro dia do mês anterior
//   const dataInicio = new Date(
//     currentYear,
//     month - 1,
//     1
//   ).toLocaleDateString("en-Us");

//   // Calcula o último dia do mês seguinte
//   const dataFim = new Date(currentYear, month, 0).toLocaleDateString(
//     "en-Us"
//   );

//   return {
//     dataInicio,
//     dataFim,
//   };
// }
function getDateToYYYYMM(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth()}`
    }`;
}

// function getMonthfromYYYYMMstring(dateValue: string) {
//   const date = new Date(dateValue);
//   console.log(date, date.getMonth())
//   if (date.getMonth() === 11) return 1;
//   return date.getMonth() + 2;
// }


export function MonthInput({ onChange }: { onChange: (value: any) => void }) {
  const [selectedMonth, setSelectedMonth] = useState(
    getDateToYYYYMM(new Date())
  );

  const handleMonthChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedMonth(event.target.value);
    onChange((event.target.value));
  };
  return (
    <>
      <Input type="month" value={selectedMonth} onChange={handleMonthChange} width={'fit-content'} textOverflow={'ellipsis'} maxW={{ md: 'none', base: '11.5rem' }} color={'primary'} />
    </>
    // <h1>oi</h1>
  );
}
