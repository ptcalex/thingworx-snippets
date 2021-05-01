/*** Create a STREAM ***/

let StreamName = "..."; // the name of the STREAM entity to create
let DataShapeName = "..."; // the name of an existing DATASHAPE entity to use for the STREAM
let ProjectName = "..."; // the name of an existing PROJECT entity

Resources["EntityServices"].CreateThing({
  name: StreamName,
  thingTemplateName: "Stream",
  projectName: ProjectName
});   

let stream = Things[streamName];
stream.EnableThing();
stream.SetDataShape({ name: DataShapeName });
stream.RestartThing();

