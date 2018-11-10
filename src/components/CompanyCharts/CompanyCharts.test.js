import React from 'react'
import { render } from '../../utils/test-utils'
import CompanyCharts from './CompanyCharts'

const chartsData = {
  reportsPerDate: [
    {
      year: '2018',
      count: '541'
    }
  ],
  companyReportsPerRegion: [
    {
      count: '61406',
      region: 'SE'
    },
    {
      count: '24333',
      region: 'NE'
    }
  ],
  companyRatingPerYear: [
    {
      average: '2.77',
      year: '2014'
    },
    {
      average: '2.51',
      year: '2015'
    }
  ],
  companyReportsPerGender: [
    {
      count: '34509',
      gender: 'F'
    },
    {
      count: '78990',
      gender: 'M'
    }
  ],
  companyReportsPerAge: [
    {
      ageRange: '0-20',
      count: '8289'
    },
    {
      ageRange: '61-70',
      count: '878'
    }
  ]
}

test('<CompanyCharts /> component renders component', () => {
  const { container } = render(<CompanyCharts data={chartsData} />)

  expect(container.firstChild).toMatchSnapshot()
})
