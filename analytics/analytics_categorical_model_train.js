/*
    TO    Create a categorical model
    I     Get a reference to a dataset
          Train a model using a dataset using GetModelTags() and GetLearners()
    SERVICE PARAMETERS:
      DatasetJobID: the dataset used to train the categorical model
    RESULT:
      Job ID: the job ID related to the model being created
*/

const ModelName = "BeltFreq Categorical Model";

let result = 0;
try {
  let datasetRef = getDatasetReferenceFromJobID(DatasetJobID);
  let modelJobID = trainModelFromDataset(datasetRef);
  result = modelJobID;
}
catch (error) {
    logger.error("TrainCategoricalModel: " + error);
}


/* IMPLEMENTATION DETAILS */

function getDatasetReferenceFromJobID(jobID) {
  let datasetRef = DataShapes.AnalyticsDatasetRef.CreateValues();
  datasetRef.AddRow({ datasetUri: "dataset:/" + jobID, format: "parquet" });
  return datasetRef;
}

function trainModelFromDataset(datasetRef) {
  // const TrainingThing = Things["AnalyticsServer_TrainingThing"];
  const TrainingThing = Things[me.TrainingThing];

  const MaxAllowedFields = 20;
  const EnsembleTechnique = "ELITE_AVERAGE";
  const ValidationHoldout = 0.2;
  const ComparisonMetric = "PEARSONS";
  const Goal = "BeltFrequencyLevel";

  return TrainingThing.CreateJob({
    jobName: ModelName,
    maxAllowedFields: MaxAllowedFields,
    description: ModelName,
    ensembleTechnique: EnsembleTechnique,
    useRedundancyFilter: false,
    validateOnTraining: true,
    tags: getModelTags(),
    validationHoldoutPercentage: ValidationHoldout,
    comparisonMetric: ComparisonMetric,
    learners: getLearners(),
    createConfidenceModel: false, // not supported for categorical goals
    // confidenceLevels: undefined /* INFOTABLE */,
    goalField: Goal,
    datasetRef: datasetRef
  });
}

function getModelTags() {
  let tags = DataShapes.GenericStringList.CreateValues();
  tags.AddRow({ item: "buildermodel" });
  tags.AddRow({ item: "buildermodelname:" + ModelName });
  return tags;
}

function getLearners() {
  let learners = DataShapes.AnalyticsTrainingLearner.CreateValues();
  learners.AddRow({ learningTechnique: "LOGISTIC_REGRESSION" });
  learners.AddRow({ learningTechnique: "DECISION_TREE", maxDepth: 12 });
  learners.AddRow({ learningTechnique: "NEURAL_NET", hiddenUnitPercentage: 0.2, layerCount: 3, hiddenActivation: "SIGMOID", layerWithLoss: "AUTO" });
  learners.AddRow({ learningTechnique: "RANDOM_FOREST", maxDepth: 3, treeCount: 25 });
  learners.AddRow({ learningTechnique: "GRADIENT_BOOST", maxDepth: 3, numberOfIterations: 100 });
  return learners;
}

