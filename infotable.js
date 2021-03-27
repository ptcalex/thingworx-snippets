
/*** CREATE INFOTABLE ***/

// Name:STRING (name of DATASHAPE with fields field1 and field2)
let infotable = DataShapes[Name].CreateValues();
infotable.AddRow({ field1: value1, field2: value2 })



/*** ITERATE INFOTABLE ***/

// Infotable:INFOTABLE
Infotable.rows.toArray().forEach(obj => {
  // obj represents a row object
});



/*** INTERPOLATE INFOTABLE ***/

// Input:INFOTABLE (infotable to interpolate) - result infotable with 'count' rows
let result = Resources["InfoTableFunctions"].Interpolate({
	t: Input,
	timeColumn: "timestamp", // field name of Input infotable representing time
	columns: "value", // field name of Input infotable representing the value to interpolate 
	mode: "ROWCOUNT", // 'count' represents the number of rows in the resulting infotable
  count: 10, // Input is split in 10 blocks / each is interpolated into a different result row
	stats: "SMOOTH"
});

// Input:INFOTABLE (infotable to interpolate) - input infotable with blocks of 'count' milliseconds
let result = Resources["InfoTableFunctions"].Interpolate({
	t: Input,
	timeColumn: "timestamp", // field name of Input infotable representing time
	columns: "value", // file name of Input infotable representing the value to interpolate 
	mode: "INTERVAL", // 'count' represents the time interval to interpolate
  count: 1000*60, // interpolate each minute of Input data with a single result row
	stats: "SMOOTH"
});



