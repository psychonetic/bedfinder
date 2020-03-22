import React from 'react'
import Pusher from 'pusher-js'

const pusher = new Pusher('XXX', {
  cluster: 'eu',
  forceTLS: true
});

export function withPusher(Component) {
  return class extends React.Component {
    render() {
      return (
        <>
          <Component pusher={pusher} {...this.props} />
        </>
      )
    }
  }
} 
