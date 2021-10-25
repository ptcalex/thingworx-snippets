/*** Calculate binned data distribution by bin size ***/

// INFOTABLE:AnalyticsTimedValue
let it = DataShapes.AnalyticsTimedValue.CreateValues();
for (let ix = 0; ix < 1000; ix++) {
	it.AddRow({
    timestamp: ix,
    value: 100 * Math.random()
  });
}

// Split into bins of given size
// Only consider a [min,max] subrange of the input 
const BinSize = 5;
let result = me.CalculateBinnedDataDistributionForBinSize({
  timedValues: it,
  binSize: BinSize,
  min: 0,
  max: 100
});

