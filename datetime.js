
/*** CREATE DATE INTERVAL ***/

// Name:STRING (name of DataShape with fields: StartDate, EndDate)
// Interval:STRING (format: <number><time unit>, see below)

let result = DataShapes[Name].CreateValues();
let now = new Date();
let fromDate = new Date();
let toDate = new Date();
let n = Interval.slice(0, -1); // get number before the last character
switch (Interval.slice(-1)) { // get last character
    case "h":  fromDate = new Date(now.setTime(now.getTime() - n*3600*1000)); break; 
    case "d":  fromDate = new Date(now.setDate(now.getDate() - n)); break; 
    case "w":  fromDate = new Date(now.setDate(now.getDate() - 7*n)); break; 
    case "m":  fromDate = new Date(now.setMonth(now.getMonth() - n)); break; 
    case "y":  fromDate = new Date(now.setFullYear(now.getFullYear() - n)); break; 
}
result.AddRow({ StartDate: fromDate, EndDate: toDate });

