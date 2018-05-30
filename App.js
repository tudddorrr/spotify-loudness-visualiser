import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Bar } from 'react-chartjs-2'
import analysis from './Timelapse'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.getData()
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Spotify Analysis</h1>
          <p>Visualising the loudness of 'Timelapse.json' (Timelapse by Scattle) from the Spotify music analysis service</p>
        </header>
        <div className="App-intro">
          <Bar data={this.state.data} />
        </div>
      </div>
    )
  }

  getData() {
    let sets = []
    analysis.segments.forEach(s => {
      if(s.confidence>0.5) sets.push(s.loudness_max)
    })

    let labels = []
    analysis.segments.forEach(s => {
      if(s.confidence>0.6) labels.push(s.start)
    })

    let data = {
      labels: labels,
      datasets: [{
        label: "Loudness",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: sets
      }]
    }

    return data
  }
}

export default App
