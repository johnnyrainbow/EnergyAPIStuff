const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const fetchData = async (host, body, headers) => {
  console.dir("-- Fetching for [Planned Gas Production Outages] -- ");

  const response = await fetch(host, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });

  if (response.status != 200) {
    console.log(
      "\x1b[31m",
      `-- API Data Fetch Failed -- (Status: ${response.status})`
    );
    // console.log(response);
    throw new Error(`Failed to fetch data`);
  }

  console.dir(`-- API Data Fetch Succeeded -- (Status: ${response.status})`);

  const data = await response.json();

  //   console.dir(data.results[0], {
  //     depth: null,
  //     colors: true,
  //   });
  return data;
};

const formatData = (data) => {
  const corePath = data.results[0].result.data.dsr.DS[0];

  const legendList = corePath.SH[0].DM1;
  const tasksList = corePath.ValueDicts.D0;
  const dailyImpactList = corePath.ValueDicts.D1;

  const items = corePath.PH[0].DM0;
  let resultItems = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    // console.dir(item, { depth: null, colors: true });

    //if the item has a reference instead of direct values, get the reference.
    let rVal = item.R;
    let referenceItem = rVal ? items[rVal - 1] : null;

    //references can point to other reference items, traverse until we reach root reference.
    while (referenceItem != null && referenceItem.R)
      referenceItem = referenceItem.R
        ? items[referenceItem.R - 1]
        : referenceItem;

    // console.log("REFERENCE ITEM ", referenceItem);
    const startDate = rVal
      ? new Date(item.C[0]).toUTCString()
      : new Date(item.C[1]).toUTCString();

    const endDate = new Date(item.X[0].M0).toUTCString();

    const task = rVal ? tasksList[referenceItem.C[0]] : tasksList[item.C[0]];

    const legend = item.X[0].S
      ? legendList[0]?.G4
      : legendList[item.X[0].I]?.G4;

    const notificationNumber = rVal ? referenceItem.C[3] : item.C[3];

    const dailyImpact = rVal
      ? dailyImpactList[referenceItem.C[2]]
      : dailyImpactList[item.C[2]];

    const resultItem = {
      legend,
      task,
      startDate,
      endDate,
      dailyImpact,
      notificationNumber,
    };
    // console.dir(resultItem, { depth: null, colors: true });
    resultItems.push(resultItem);
  }
  return resultItems;
};

module.exports = { fetchData, formatData };
