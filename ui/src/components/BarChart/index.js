
import React, { PureComponent } from 'react';
import { BarChart as ReBarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChart = ({ data, dataKey1 }) => {
  return (
      <ReBarChart
        width={500}
        height={300}
        data={data}
      
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey1} fill="#8884d8" />
      </ReBarChart>
  )
}

export default BarChart