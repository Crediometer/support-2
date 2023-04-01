import React from 'react';
import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';

const BarChart = ({ height, color = [], data }) => {
  const theme = useTheme();

  var graph = data.dataGraph.sort(function (a, b) {
    return a._id.month - b._id.month;
  });
  var months = [];
  var dataRes = [];

  graph.forEach((element) => {
    dataRes.push(element.amount);
    months.push(element.Month);
  });

  const option = {
    title: {
      // title of our chart
      text: 'Bar Chart',
    },
    xAxis: {
      // name of X Axis
      name: 'X Axis',
      type: 'category',
      // Contains the values for XAxis
      data: months,
    },
    yAxis: {
      // name of Y Axis
      name: 'Y Axis',
      type: 'value',
    },
    //To enable tooltips
    tooltip: {},
    // To enable toolbox
    toolbox: {
      feature: {
        // displays a options to direct save chart as a image
        saveAsImage: {},
      },
    },

    series: {
      data: dataRes,
      type: 'bar',
    },
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: ['#b11203', '#452322', '#559029'],
      }}
    />
  );
};

export default BarChart;
