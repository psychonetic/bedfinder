import React from 'react'
import high_carep_image from '../../../images/HC+_orange.png'
import high_care_image from '../../../images/HC_orange.png'
import low_carep_image from '../../../images/LC+_orange.png'
import low_care_image from '../../../images/LC_orange.png'
import { withStyles } from "@material-ui/core/styles"
import List from '@material-ui/core/List';
import FilerListItem from './filterlistitem'
import { FilterContext } from '../../../utils/useFilter'

const styles = theme => ({})

const FilterList = props => {
    const { classes } = props;
    const filterContext = React.useContext(FilterContext)
    const filters = filterContext.severityFilters

    const handleClick = filerName => {
        filters[filerName].active = !filters[filerName].active
        filterContext.setSeverityFilters(filters)
        filterContext.filterFn()
    }

    return (
        <div className={classes.FilterListWrapper}>
            <List>
                <FilerListItem active={filters.icu_low_care.active}
                    filterName={filters.icu_low_care.name}
                    handleClick={handleClick}
                    filterIcon={low_care_image}
                    filterText="Schweregrad 1">
                </FilerListItem>
                <FilerListItem
                    active={filters.ecmo_icu_low_care.active}
                    filterName={filters.ecmo_icu_low_care.name}
                    handleClick={handleClick}
                    filterIcon={low_carep_image}
                    filterText="Schweregrad 2">

                </FilerListItem>
                <FilerListItem
                    active={filters.icu_high_care.active}
                    filterName={filters.icu_high_care.name}
                    handleClick={handleClick}
                    filterIcon={high_care_image}
                    filterText="Schweregrad 3">

                </FilerListItem>
                <FilerListItem
                    active={filters.ecmo_icu_high_care.active}
                    filterName={filters.ecmo_icu_high_care.name}
                    handleClick={handleClick}
                    filterIcon={high_carep_image}
                    filterText="Schweregrad 4">
                </FilerListItem>
            </List>
        </div>
    )
}

export default withStyles(styles)(FilterList)