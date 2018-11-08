import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Chart from 'chart.js'

class ChartWrapper extends Component {
  componentDidMount() {
    const newChart = new Chart(this.myCanvas, {
      type: this.props.type,
      options: this.props.options,
      data: this.props.data
    })

    this.chart = newChart
  }

  componentWillUnmount() {
    this.chart.destroy()
  }

  render() {
    return (
      <canvas
        ref={canvas => (this.myCanvas = canvas)}
        width={this.props.width}
        height={this.props.height}
      />
    )
  }
}

ChartWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  options: PropTypes.object,
  data: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
}

ChartWrapper.defaultProps = {
  options: {}
}

export default ChartWrapper
