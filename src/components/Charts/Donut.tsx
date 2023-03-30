import React from 'react'
import {
  Chart,
  ChartTitle,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTooltip,
  ChartSeriesLabels,
} from "@progress/kendo-react-charts";


/* const COLORS = [
  "#059669",
  "#B91C1C",
 "#6366F1",
  "#2563EB",
 "#D97706",
]
 */
// Graph data
/* const applicationsStatusThisMonth = [
  {
    status: "Accepted",
    value: 14,
    color: COLORS.accepted,
  },
  {
    status: "Interviewing",
    value: 14,
    color: COLORS.interviewing,
  },
  {
    status: "Rejected",
    value: 40,
    color: COLORS.rejected,
  },
  {
    status: "Pending",
    value: 32,
    color: COLORS.pending,
  },
]; */

// Show category label for each item in the donut graph
const labelContent = (e:any) => e.category;



const Donut = ({data,title}:any) => {




 /*  function insertColor(dataNotColor:any[]){
    let dataColor:any = []
    dataNotColor.forEach((element:any,index:any)=>{
      element.color = COLORS[index]
      dataColor.push(element)
    })

    return dataColor
  } */

  const controlableAmountTotal = (data:any ) =>{
    let total = 0
    // eslint-disable-next-line
    data.map((item:any) => {
        total = total + item.controlable_amount
    })
    return total
  }

  const renderTooltip = (context:any) => {
    const { value } = context.point || context;
    const total = controlableAmountTotal(data)
    return (
      <div>
        Quantidade: {value}un
        <p>Percentual: {(value/total)*100}%</p>
      </div>
    );
  };

  return (
    <Chart>
      <ChartTitle text={title} />
      <ChartLegend visible={false} />
      <ChartTooltip render={renderTooltip}/>
      <ChartSeries>
        <ChartSeriesItem
          type="donut"
          data={data}
          categoryField="name"
          field="controlable_amount"
        >
          <ChartSeriesLabels
            color="#fff"
            background="none"
            content={labelContent}
          />
        </ChartSeriesItem>
      </ChartSeries>
    </Chart>
  );
};

export default Donut;
