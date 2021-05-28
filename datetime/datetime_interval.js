/*** Create DATETIME interval ***/

// Name:STRING (name of DataShape with fields: StartDate, EndDate)
let Name = "...";

// Interval:STRING (format: <number><time unit character ['h', 'd', 'w', 'm', 'y']>)
let Interval = "4h"; // 4 hours

let result = DataShapes[Name].CreateValues();
let fromDate = new Date(), toDate = new Date(), now = new Date();
let n = Number(Interval.slice(0, -1)); // get number before the last character
switch (Interval.slice(-1)) { // get last character
    case "h":  fromDate = new Date(now.setTime(now.getTime() - n*3600*1000)); break; 
    case "d":  fromDate = new Date(now.setDate(now.getDate() - n)); break; 
    case "w":  fromDate = new Date(now.setDate(now.getDate() - 7*n)); break; 
    case "m":  fromDate = new Date(now.setMonth(now.getMonth() - n)); break; 
    case "y":  fromDate = new Date(now.setFullYear(now.getFullYear() - n)); break; 
}
result.AddRow({ StartDate: fromDate, EndDate: toDate });

