/*** Score a ThingWorx Analytics clustering model ***/

let DatasetJobID = "..."; // the ID of a previously created dataset containing items to score
let ClusteringJobID = "..."; // the ID of a previously created clustering model

let datasetRef = DataShapes.AnalyticsDatasetRef.CreateValues();
datasetRef.AddRow({ datasetUri: "dataset:/" + DatasetJobID, format: "parquet" });

// which fields of the input dataset shall be included in the result
let identifiers = DataShapes.GenericStringList.CreateValues();
identifiers.AddRow({ item: "AssetID" });
identifiers.AddRow({ item: "ProductFamily" });

let score = Things["AnalyticsServer_PredictionThing"].RealtimeScore({
	modelUri: "results:/clusters/" + ClusteringJobID,
	datasetRef: datasetRef,
  identifierFields: identifiers
});

// create an INFOTABLE dynamically, with columns defined on-the-fly
let result = { dataShape: { fieldDefinitions: {} }, rows: [] };
result.dataShape.fieldDefinitions["_1"] = { name: "Asset", baseType: "STRING" };
result.dataShape.fieldDefinitions["_2"] = { name: "ProductFamily", baseType: "INTEGER" };
result.dataShape.fieldDefinitions["_3"] = { name: "Cluster", baseType: "STRING" };
score.rows.toArray().forEach(row => {
  // the order of row fields depend on the input DATASHAPE   
  let asset = row.identifier_1, pf = row.identifier_2, cl = row.Clustering_mo;
  result.rows.push({ Asset: asset, ProductFamily: pf, Cluster: String.fromCharCode(65 + Number(cl)) });
});

// export result to CSV
Resources["CSVParserFunctions"].WriteCSVFile({
	fileRepository: "SystemRepository",
	path: "/clusters.csv",
	data: result,
	withHeader: true
});

