import React from 'react'
import FilterOverlay from '../components/filter/overlay';

export default function withOverlay(Component) {
    return class extends React.Component {
      render() {
        return (
          <FilterOverlay>
            <Component></Component>
          </FilterOverlay>
        )
      }
    }
  }