import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';

const LineChart = ({ height, color = [], data, isMerchant = true }) => {
  const theme = useTheme();
  var allMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  var cardless = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    card = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    transfer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  var deposit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    withdrawal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  if (isMerchant) {
    data.cardless.map((e) => {
      cardless[allMonths.indexOf(e.Month)] = e.amount;
    });
    console.log('returned  ', cardless);
    data.card.map((e) => {
      card[allMonths.indexOf(e.Month)] = e.amount;
    });
    data.transfer.map((e) => {
      transfer[allMonths.indexOf(e.Month)] = e.amount;
    });
  } else {
    data.deposit.map((e) => {
      deposit[allMonths.indexOf(e.Month)] = e.amount;
    });
    data.withdrawal.map((e) => {
      deposit[allMonths.indexOf(e.Month)] = e.amount;
    });
  } //
  // months = Array.from(months);
  // months.sort(function (a, b) {
  //   return allMonths.indexOf(a) - allMonths.indexOf(b);
  // });
  const option = {
    grid: { top: '10%', bottom: '10%', left: '5%', right: '5%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    xAxis: {
      type: 'category',
      data: allMonths, //[('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    series: isMerchant
      ? [
          {
            data: cardless,
            type: 'line',
            name: 'Cardless',
            stack: 'Cardless',
            smooth: true,
            symbolSize: 4,
            lineStyle: { width: 4 },
          },
          {
            data: card,
            type: 'line',
            stack: 'Card',
            name: 'Card',
            smooth: true,
            symbolSize: 4,
            lineStyle: { width: 4 },
          },
          {
            data: transfer,
            type: 'line',
            stack: 'Transfer',
            name: 'Transfer',
            smooth: true,
            symbolSize: 4,
            lineStyle: { width: 4 },
          },
        ]
      : [
          {
            data: deposit,
            type: 'line',
            name: 'Deposit',
            stack: 'Deposit',
            smooth: true,
            symbolSize: 4,
            lineStyle: { width: 4 },
          },
          {
            data: withdrawal,
            type: 'line',
            stack: 'withdrawal',
            name: 'withdrawal',
            smooth: true,
            symbolSize: 4,
            lineStyle: { width: 4 },
          },
        ],
  };

  return <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />;
};

export default LineChart;
