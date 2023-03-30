import * as React from "react";


import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";

import "hammerjs";

const Bar = ({data,title,xLabel}:any) => {

return (
  <Chart style={{ height: 350 }}>
  <ChartTitle text={title} />
  <ChartLegend position="top" orientation="horizontal" />
  <ChartCategoryAxis>
    <ChartCategoryAxisItem categories={[xLabel]} startAngle={45} />
  </ChartCategoryAxis>
  <ChartSeries>
    {data.map((item:any, idx:any) => (
       <ChartSeriesItem
        key={idx}
        type="column"
        tooltip={{ visible: true }}
        data={item.data}
        name={item.name}
      />)
    )}
  </ChartSeries>
</Chart>
)}

export default Bar


