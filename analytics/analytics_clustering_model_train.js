/*

TO train a ThingWorx Analytics clustering model
I  get a dataset reference to a dataset represented by a job ID
   create a clustering model job

SERVICE PARAMETERS:
  DatasetJobID: the jobid of a previously created dataset

THING PROPERTIES:
  me.ClusteringThing: the analytics server entity acting as a proxy to the Clustering microservice
  me.ClusteringJobID: where this function saves the job ID just created

*/

let datasetRef = getDatasetReference(DatasetJobID);
let jobid = createClusteringModelJobFromDatasetReference(datasetRef);
let result = me.ClusteringJobID = jobid;

/*** IMPLEMENTATION DETAILS ***/

function getDatasetReference(jobID) {
  let datasetRef = DataShapes.AnalyticsDatasetRef.CreateValues();
  datasetRef.AddRow({ datasetUri: "dataset:/" + jobID, format: "parquet" });
  return datasetRef;  
}

function createClusteringModelJobFromDatasetReference(datasetRef) {
  return Things[me.ClusteringThing].CreateJob({ 
  jobName: "Cluster Job " + Math.floor(100 + 900 * Math.random()),
  clusterCount: 3,
  description: "Clustering Model",
  datasetRef: datasetRef,
  tags: undefined
  });
}
