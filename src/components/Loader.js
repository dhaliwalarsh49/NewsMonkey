import React, { Component } from 'react'
import loader from '../loading.gif'

export default class Loader extends Component {
  render() {
    return (
      <div className='text-center'>
            <img className='my-4' src={loader} alt='Loading...'/>
      </div>
    )
  }
}
