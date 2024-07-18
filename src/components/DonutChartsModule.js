import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Text } from 'recharts';
import Papa from 'papaparse';
import '../styles/DonutChartsModule.css';

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        strokeWidth={2}  // Thicker stroke for active section
        stroke="#ffffff"
/>
      <Text
        x={cx}
        y={cy}
        dy={5}
        textAnchor="middle"
        fill="#333"
        fontSize="59px"
        fontWeight="bold"
        fontFamily='PublicoWeb'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </Text>
      <Text
        x={cx}
        y={cy}
        dy={30}
        textAnchor="middle"
        fill="#666"
        fontSize="20px"
      >
        {payload.name}
      </Text>
    </g>
  );
};

const DonutChart = ({ data, colors, title }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">{title}</h3>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={sortedData}
              cx="50%"
              cy="50%"
              innerRadius={130}
              outerRadius={170}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              startAngle={90}
              endAngle={-270}
              strokeWidth={2}  // This controls the width of the stroke
              stroke="#ffffff"  // This sets the color of the stroke
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="legend-container">
        <table className="legend-table">
          <thead>
            <tr>
              <th className="text-left" colSpan="2">Category</th>
              <th className="text-right">%</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry, index) => (
              <tr key={index}>
                <td className="text-left legend-table-key-col">
                  <span className="color-key" style={{ backgroundColor: colors[index] }}></span>
                </td>
                <td className="text-left">{entry.name}</td>
                <td className="text-right">{entry.value.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DonutChartsModule = () => {
  const [allData, setAllData] = useState({});
  const [selectedFund, setSelectedFund] = useState('');
  const [availableFunds, setAvailableFunds] = useState([]);

  const colorMap = {
    "Asset classes": {
      "Bonds": "#007BC4",
      "Cash": "#9FBEAF",
      "Equity": "#de6106",
      "Alternatives": "#00adc6"
    },
    "Regions": {
      "Emerging markets": "#027180",
      "US": "#E196AA",
      "Europe": "#678A81",
      "Asia": "#862567",
      "Asia ex Japan": "#862567",
      "UK": "#9194B0",
      "Japan": "#B5D2F0"
    },
    "Sectors": [
      "#006698", "#00456e", "#66b0dc", "#268fcd", "#b5d0ee"
    ],
    "Investment managers": [
      "#006e80", "#9fbeaf", "#b5d0ee", "#e196aa", "#862567",
      "#914146", "#9190ac", "#58756d", "#4c9aa6", "#bcd1c7",
      "#d3e3f5", "#eab5c3", "#ac6996", "#a7676b", "#a7a6bd",
      "#85a199", "#80b7bf", "#cfded7", "#e1ecf8", "#fad6de"
    ]
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const data = result.data.reduce((acc, row) => {
          if (!acc[row.Fund]) {
            acc[row.Fund] = {};
          }
          if (!acc[row.Fund][row.ChartType]) {
            acc[row.Fund][row.ChartType] = [];
          }
          if (row.Value) {
            acc[row.Fund][row.ChartType].push({
              name: row.Category,
              value: parseFloat(row.Value)
            });
          }
          return acc;
        }, {});

        setAllData(data);
        const funds = Object.keys(data);
        setAvailableFunds(funds);
        setSelectedFund(funds[0]);
      },
    });
  };

  const handleFundChange = (event) => {
    setSelectedFund(event.target.value);
  };

  const getColor = (chartType, category, index) => {
    if (chartType === 'Asset classes' || chartType === 'Regions') {
      return colorMap[chartType]?.[category] || '#000000';
    } else {
      const colorArray = colorMap[chartType] || [];
      return colorArray[index % colorArray.length] || '#000000';
    }
  };

  const renderCharts = () => {
    if (!selectedFund || !allData[selectedFund]) return null;

    return Object.entries(allData[selectedFund]).map(([chartType, data], index) => {
      const colors = data.map((item, i) => getColor(chartType, item.name, i));
      return (
        <DonutChart 
          key={index}
          data={data}
          colors={colors}
          title={`Breakdown across ${chartType}`}
        />
      );
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept=".csv" />
      {availableFunds.length > 0 && (
        <select className="fund-select" value={selectedFund} onChange={handleFundChange}>
          {availableFunds.map(fund => (
            <option key={fund} value={fund}>{fund}</option>
          ))}
        </select>
      )}
      <div className="donut-charts-container">
        {renderCharts()}
      </div>
    </div>
  );
};

export default DonutChartsModule;