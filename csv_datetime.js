/*** Import from CSV with DATETIME field ***/


let result = Resources["CSVParserFunctions"].ReadCSVFile({
	fileRepository: "Foo",
	path: "/foo.csv",
	hasHeader: true,
	fieldDelimiter: ",",
	dateFormat: "yyyy-MM-dd HH:mm:ss.sss", // MM is month, mm is minute
	dataShape: "CN2_DatasetCSV_DS"
});

