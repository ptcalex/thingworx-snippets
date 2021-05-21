/*** Import from CSV with DATETIME format field ***/

let DataShapeName = "..."; // fields of input CSV file
let result = Resources["CSVParserFunctions"].ReadCSVFile({
	fileRepository: "SystemRepository",
	path: "/data.csv",
	hasHeader: true,
	fieldDelimiter: ",",
	dateFormat: "YYYY-MM-dd HH:mm:ss.SSS", // MM is month of year, mm is minute of hour
	dataShape: DataShapeName
});

/*
  For complete dateFormat settings, see:
  https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html

  The pattern syntax is mostly compatible with java.text.SimpleDateFormat
  Time zone names cannot be parsed and a few more symbols are supported. 
*/

