/*** Create a ThingWorx Analytics dataset ***/


// the name of the THING exposing the API of the DataMicroserver
// http://support.ptc.com/help/thingworx_hc/api_docs/#templates/DataMicroserver.html
let datathing = Things.AnalyticsServer_DataThing; // might need to use a different name

// reference a CSV dataset on a repository
let Data = "SystemRepository/data.csv"; // specify repository and CSV file name
let datasetRef = DataShapes.AnalyticsDatasetRef.CreateValues();
datasetRef.AddRow({ datasetUri: encodeURI("thingworx://" + Data), format: "csv" });

// infer metadata for the dataset
let metadata = datathing.DetectMetadataJSON({ datasetRef: datasetRef });

// save the dataset metadata into a repository as a JSON file
Things.SystemRepository.SaveText({ path: "meta.json", content: JSON.parse(metadata) });

// tag the dataset being created
let tags = DataShapes.GenericStringList.CreateValues();
let Tag = "yourtag"; // change that
tags.AddRow({ item: "builderdataset" });
tags.AddRow({ item: "builderdatasetname:" + Tag });

// once created, a dataset can be referenced via the job ID of the job that created it
let jobid = datathing.CreateDataset({
    csvHasHeaders: true,
    metadataFileURI: encodeURI("thingworx://SystemRepository/meta.json"),
    csvURI: encodeURI("thingworx://" + Data),
    tags: tags
});    

// optionally save the job ID into a property for later reuse
me.DatasetJobID = jobid; // you must previously create the property

