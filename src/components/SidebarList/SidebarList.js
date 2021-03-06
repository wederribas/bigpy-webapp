import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
  },
  noDecoration: {
    textDecoration: 'none'
  }
})

class SidebarList extends Component {
  state = {
    selectedIndex: 0
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index })
  }
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <List component="nav">
          <Link to="/" className={classes.noDecoration}>
            <ListItem
              data-testid="list-item"
              button
              selected={this.state.selectedIndex === 0}
              onClick={event => this.handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
          </Link>
          <Link to="/top10" className={classes.noDecoration}>
            <ListItem
              data-testid="list-item"
              button
              selected={this.state.selectedIndex === 1}
              onClick={event => this.handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <WhatshotIcon />
              </ListItemIcon>
              <ListItemText primary="Top 10" />
            </ListItem>
          </Link>
          <Link to="/insights" className={classes.noDecoration}>
            <ListItem
              data-testid="list-item"
              button
              selected={this.state.selectedIndex === 2}
              onClick={event => this.handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <HighlightIcon />
              </ListItemIcon>
              <ListItemText primary="Insights" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List component="nav">
          <Link to="/about" className={classes.noDecoration}>
            <ListItem
              data-testid="list-item"
              button
              selected={this.state.selectedIndex === 3}
              onClick={event => this.handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </Link>
        </List>
      </div>
    )
  }
}

SidebarList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SidebarList)
