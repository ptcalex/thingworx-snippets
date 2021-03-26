
/*** CREATE INFOTABLE ***/

// Name:STRING (name of DATASHAPE with fields field1 and field2)
let infotable = DataShapes[Name].CreateValues();
infotable.AddRow({ field1: value1, field2: value2 })



/*** ITERATE INFOTABLE ***/

// Infotable:INFOTABLE
Infotable.rows.toArray().forEach(obj => {
  // obj represents a row object
});

