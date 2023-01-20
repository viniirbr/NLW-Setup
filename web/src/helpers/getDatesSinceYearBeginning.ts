export function getDatesSinceYearBeginning(): Date[] {
    const today = new Date();
    const firstDayOfTheYear = new Date(`${today.getFullYear()}-01-01T00:00:00`)
    const datesSinceYearBeggining: Date[] = [];

    let date = firstDayOfTheYear;

    while (date <= today) {
        datesSinceYearBeggining.push(date);
        const theDayAfter = new Date();
        theDayAfter.setDate(date.getDate()+1);
        date = theDayAfter;
    }

    return datesSinceYearBeggining
}