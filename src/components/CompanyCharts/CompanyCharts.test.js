import React from 'react'
import { render } from '../../utils/test-utils'
import CompanyCharts from './CompanyCharts'

const chartData = [
  {
    year: '2018',
    count: '541'
  }
]

test('<CompanyCharts /> component renders component', () => {
  const { container } = render(<CompanyCharts data={chartData} />)

  expect(container.firstChild).toMatchSnapshot()
})
