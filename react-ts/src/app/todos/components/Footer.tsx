import * as React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../duck/actions'

const footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter={VisibilityFilters.SHOW_ALL}>
      ALL
    </FilterLink>
    {' '}
    <Filterlink filter={VisibilityFilters.SHOW_Active}>
      Active
    </Filterlink>
    {' '}
    <Filterlink filter={VisibilityFilters.SHOW_COMPLETED}>
      Completed
    </Filterlink>
  </p>
)

export default Footer
