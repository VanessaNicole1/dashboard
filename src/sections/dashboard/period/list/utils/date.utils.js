export const getFullYears = (date) => new Date(date).getFullYear()

export const getMonth = (date) => { 
    const monthName = new Date(date).toLocaleDateString('es-ES', { month: 'long' });
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
}

export const convertToSpanishDate = (currrentDate) => {
    const dateToConvert = new Date(currrentDate);
    const spanishDate = dateToConvert.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return spanishDate;
  }