import { useState } from "react";
import GridLayout, { Layout as ReactGridLayout } from "react-grid-layout";

import ChartsCard from "charts/ChartsCard";
import ChartsCardContent from "charts/ChartsCardContent";

import { useStore } from "store/store";

const layout = [
  { i: "1", x: 0, y: 0, w: 1, h: 4 },
  { i: "2", x: 1, y: 0, w: 1, h: 4 },
];

const FlexibleLayout = () => {
  const { stock, filterDataByDate, credit } = useStore();
  const [currentLayout] = useState<ReactGridLayout[]>(layout);

  const handleOnChangeStock = (e) => {
    filterDataByDate({ date: e.target.value, type: "stock" });
  };

  const handleOnChangeCredit = (e) => {
    filterDataByDate({ date: e.target.value, type: "credit" });
  };

  const radioButtonStock = {
    options: [
      {
        value: -6,
        label: "6M",
      },
      {
        value: -12,
        label: "12M",
      },
      {
        value: -36,
        label: "3Y",
      },
      {
        value: -60,
        label: "5Y",
      },
      {
        value: "FYTD",
        label: "FYTD",
      },
      {
        value: "YTD",
        label: "YTD",
      },
    ],
    onChange: handleOnChangeStock,
  };

  const radioButtonCredit = {
    options: [
      {
        value: -6,
        label: "6M",
      },
      {
        value: -12,
        label: "12M",
      },
      {
        value: -36,
        label: "3Y",
      },
      {
        value: -60,
        label: "5Y",
      },
      {
        value: "FYTD",
        label: "FYTD",
      },
      {
        value: "YTD",
        label: "YTD",
      },
    ],
    onChange: handleOnChangeCredit,
  };

  return (
    <>
      <GridLayout
        cols={2}
        rowHeight={96}
        maxRows={1}
        className="layout"
        compactType={"horizontal"}
        style={{ maxWidth: 1500 }}
        width={1500}
        isBounded={true}
        layout={currentLayout}
        isResizable={true}
        resizeHandles={["se"]}
        draggableCancel={".no-drag"}
      >
        <div key={"1"}>
          <ChartsCard title="Stock Performance" radioOptions={radioButtonStock}>
            <ChartsCardContent
              chartsData={stock}
              title="Last Price"
              subTitle={"495.5"}
            />
          </ChartsCard>
        </div>
        <div key={"2"}>
          <ChartsCard
            title="Corporate Credit Performance"
            radioOptions={radioButtonCredit}
          >
            <ChartsCardContent
              chartsData={credit}
              title="Weigh Bond and Excess Returns"
              subTitle={"6.44BPS"}
            />
          </ChartsCard>
        </div>
      </GridLayout>
    </>
  );
};

export default FlexibleLayout;
