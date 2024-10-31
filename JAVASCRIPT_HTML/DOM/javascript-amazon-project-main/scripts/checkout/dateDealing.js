export function isSatSun(date){
    const isWeekendDay = date.format('dddd') === "Saturday" || date.format('dddd') === "Sunday" ? true : false; 
    return  isWeekendDay
}


export function nextDayNoWeekend(date, days_to_add)
{
    //console.log(`${date}`);
    while(days_to_add > 0)
        {
            //console.log(`${date}`);
            date = date.add(1,"days");
            if(isSatSun(date) === false)
            {
                days_to_add--;
            }
            
            
        }
        //console.log(`NEXT DAY NO WEEKEND: ${date}`);
    return date.format('dddd');
}