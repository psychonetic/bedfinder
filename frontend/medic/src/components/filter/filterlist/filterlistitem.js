import React from 'react'
import { withStyles } from "@material-ui/core/styles"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    filterlist_item_image : {
       "margin-right": "5px"
    }
})

const FilterListItem = props => {
    const { id, filterName, classes } = props;
    
    const handleClick = () => {
        props.handleClick(props.filterName)
    };
    
    
    return ( 
        <ListItem button onClick={handleClick}>
            <img className={classes.filterlist_item_image} width="30" src={props.filterIcon} />
            <ListItemText primary={props.filterText} />
            <Checkbox
                checked={props.active}
                color="default"
                size="small"
                inputProps={{ 'aria-label': 'checkbox with small size' }}
            />
        </ListItem>
    )
}

export default withStyles(styles)(FilterListItem)