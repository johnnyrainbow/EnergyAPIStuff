const { fetchData, formatData } = require("./energy_data");

const host =
  "https://wabi-australia-southeast-api.analysis.windows.net/public/reports/querydata?synchronous=true";

const headers = {
  "Content-Type": "application/json",
  RequestId: "10f107ce-46ec-b344-e338-f5e17c86663b",
  "X-PowerBI-ResourceKey": "b467bb6f-5c93-41f4-9d16-4aef23834d10",
};

const body = {
  version: "1.0.0",
  queries: [
    {
      Query: {
        Commands: [
          {
            SemanticQueryDataShapeCommand: {
              Query: {
                Version: 2,
                From: [
                  {
                    Name: "s",
                    Entity: "Sheet1",
                    Type: 0,
                  },
                ],
                Select: [
                  {
                    Column: {
                      Expression: {
                        SourceRef: {
                          Source: "s",
                        },
                      },
                      Property: "Organisation",
                    },
                    Name: "Sheet1.Organisation",
                  },
                  {
                    Column: {
                      Expression: {
                        SourceRef: {
                          Source: "s",
                        },
                      },
                      Property: "Outage Location",
                    },
                    Name: "Sheet1.Outage Location",
                  },
                  {
                    Column: {
                      Expression: {
                        SourceRef: {
                          Source: "s",
                        },
                      },
                      Property: "Start Date",
                    },
                    Name: "Sheet1.Start Date",
                  },
                  {
                    Aggregation: {
                      Expression: {
                        Column: {
                          Expression: {
                            SourceRef: {
                              Source: "s",
                            },
                          },
                          Property: "End Date",
                        },
                      },
                      Function: 3,
                    },
                    Name: "Min(Sheet1.End Date)",
                  },
                  {
                    Column: {
                      Expression: {
                        SourceRef: {
                          Source: "s",
                        },
                      },
                      Property: "Daily Impact (TJ)",
                    },
                    Name: "Sheet1.Daily Impact (TJ)",
                  },
                  {
                    Column: {
                      Expression: {
                        SourceRef: {
                          Source: "s",
                        },
                      },
                      Property: "Notification Number",
                    },
                    Name: "Sheet1.Notification Number",
                  },
                ],
                OrderBy: [
                  {
                    Direction: 1,
                    Expression: {
                      Column: {
                        Expression: {
                          SourceRef: {
                            Source: "s",
                          },
                        },
                        Property: "Start Date",
                      },
                    },
                  },
                ],
              },
              Binding: {
                Primary: {
                  Groupings: [
                    {
                      Projections: [0, 2, 3, 4, 5],
                    },
                  ],
                },
                Secondary: {
                  Groupings: [
                    {
                      Projections: [1],
                    },
                  ],
                },
                DataReduction: {
                  DataVolume: 3,
                  Primary: {
                    Top: {},
                  },
                  Secondary: {
                    Top: {},
                  },
                },
                Version: 1,
              },
              ExecutionMetricsKind: 1,
            },
          },
        ],
      },
      CacheKey:
        '{"Commands":[{"SemanticQueryDataShapeCommand":{"Query":{"Version":2,"From":[{"Name":"s","Entity":"Sheet1","Type":0}],"Select":[{"Column":{"Expression":{"SourceRef":{"Source":"s"}},"Property":"Organisation"},"Name":"Sheet1.Organisation"},{"Column":{"Expression":{"SourceRef":{"Source":"s"}},"Property":"Outage Location"},"Name":"Sheet1.Outage Location"},{"Column":{"Expression":{"SourceRef":{"Source":"s"}},"Property":"Start Date"},"Name":"Sheet1.Start Date"},{"Aggregation":{"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"s"}},"Property":"End Date"}},"Function":3},"Name":"Min(Sheet1.End Date)"},{"Column":{"Expression":{"SourceRef":{"Source":"s"}},"Property":"Daily Impact (TJ)"},"Name":"Sheet1.Daily Impact (TJ)"},{"Column":{"Expression":{"SourceRef":{"Source":"s"}},"Property":"Notification Number"},"Name":"Sheet1.Notification Number"}],"OrderBy":[{"Direction":1,"Expression":{"Column":{"Expression":{"SourceRef":{"Source":"s"}},"Property":"Start Date"}}}]},"Binding":{"Primary":{"Groupings":[{"Projections":[0,2,3,4,5]}]},"Secondary":{"Groupings":[{"Projections":[1]}]},"DataReduction":{"DataVolume":3,"Primary":{"Top":{}},"Secondary":{"Top":{}}},"Version":1},"ExecutionMetricsKind":1}}]}',
      QueryId: "",
      ApplicationContext: {
        DatasetId: "ae09d643-4538-4d8b-bb25-6c75ca2e9814",
        Sources: [
          {
            ReportId: "a9a4dc27-9c32-4298-89bc-081795140305",
            VisualId: "c242d1cba63a781ca1a1",
          },
        ],
      },
    },
  ],
  cancelQueries: [],
  modelId: 2763051,
};

const run = async () => {
  const data = await fetchData(host, body, headers);
  console.dir("----------- Raw Data -----------");
  console.dir(data, { depth: null });
  console.dir("----------- Raw Data End -----------");
  const formattedData = formatData(data);
  console.dir("----------- Formatted Data -----------");
  console.dir(formattedData);
  console.dir("----------- Formatted Data End -----------");
};

run();
