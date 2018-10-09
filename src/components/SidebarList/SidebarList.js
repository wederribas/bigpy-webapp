import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import HighlightIcon from '@material-ui/icons/Highlight'
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

function SidebarList(props) {
  const { classes } = props

  return (
    <div id={'Testing'} className={classes.root}>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <WhatshotIcon />
          </ListItemIcon>
          <ListItemText primary="Top 10" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HighlightIcon />
          </ListItemIcon>
          <ListItemText primary="Insights" />
        </ListItem>
      </List>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
      </List>
    </div>
  )
}

SidebarList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SidebarList)
