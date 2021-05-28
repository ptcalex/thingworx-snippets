/*** Create INFOTABLE with existing DATASHAPE entity ***/

let dataShapeEntityName = "..."; // name of DATASHAPE entity with fields "field1" and "field2"
let infotable = DataShapes[dataShapeEntityName].CreateValues();
infotable.AddRow({ field1: value1, field2: value2 })

