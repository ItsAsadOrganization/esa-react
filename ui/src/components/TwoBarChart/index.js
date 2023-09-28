
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TwoBarChart = ({ data, dataKey1, dataKey2 }) => {
  return (
      <BarChart
        width={500}
        height={300}
        data={data}
      
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey1} fill="#8884d8" />
        <Bar dataKey={dataKey2} fill="#82ca9d" />
      </BarChart>
  )
}

export default TwoBarChart