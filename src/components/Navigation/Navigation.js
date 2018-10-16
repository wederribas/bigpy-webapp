import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { IconButton } from '@material-ui/core'
import SidebarList from '../SidebarList/SidebarList'
import GitHubIcon from '../Icons/GitHubIcon'

const drawerWidth = 200

const styles = theme => ({
  root: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
})

function Navigation(props) {
  const { classes } = props
  return (
    <div id={'HelloThere'} className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {'BigPy — Customer Data Analysis'}
          </Typography>
          <div className={classes.grow} />
          <IconButton
            color="inherit"
            href="https://github.com/wederribas/bigpy-webapp"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.toolbar} />
        <SidebarList />
      </Drawer>
    </div>
  )
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navigation)
