/*** Create a ThingWorx Analytics clustering model ***/

let DatasetJobID = "..."; // the ID of a previously created dataset

let datasetRef = DataShapes.AnalyticsDatasetRef.CreateValues();
datasetRef.AddRow({ datasetUri: "dataset:/" + DatasetJobID, format: "parquet" });

// ClusteringThing: this THING name can be different in your environment
let jobid = Things["AnalyticsServer_ClusteringThing"].CreateJob({ 
	jobName: "Cluster Job " + Math.floor(100 + 900 * Math.random()),
	clusterCount: 5,
	description: "Asset clustering",
	datasetRef: datasetRef,
	tags: undefined
});

// optionally save the job ID into a property for later reuse
me.ClusterJobID = jobid; // you must have previously created this property

