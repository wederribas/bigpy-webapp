import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import MoodBad from '@material-ui/icons/MoodBad'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import BouncingLoader from '../BouncingLoader/BouncingLoader'
import { deburr } from '../../utils/utils'

const MAX_SUGGESTION_ITEMS = 8

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
    marginTop: theme.spacing.unit * 30
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    maxWidth: theme.spacing.unit * 75
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  searchRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3
    }
  },
  searchInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 250
  },
  title: {
    fontWeight: 'initial'
  }
})

function renderInput(inputProps) {
  const { InputProps, classes, ...other } = inputProps

  return (
    <Input
      classes={{
        root: classes.searchRoot,
        input: classes.searchInput
      }}
      inputProps={{
        ...InputProps
      }}
      {...other}
    />
  )
}

function renderSuggestion({
  companyName,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlightedIndex = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(companyName) > -1

  return (
    <MenuItem
      {...itemProps}
      key={companyName}
      selected={isHighlightedIndex}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
      data-testid="company-name"
    >
      {companyName}
    </MenuItem>
  )
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
}

class Search extends Component {
  render() {
    const { classes } = this.props
    const { loading, error, companiesNames } = this.props.data

    if (error) {
      return (
        <Grid container direction="column" justify="center" alignItems="center">
          <MoodBad className={classes.icon} color="disabled" />
          <Typography data-testid="graphql-error" variant="h5" color="inherit">
            Something went bad. Please, try again.
          </Typography>
        </Grid>
      )
    }

    return (
      <div className={classes.root}>
        {!loading ? (
          <div className={classes.container}>
            <Typography
              classes={{ root: classes.title }}
              component="h1"
              variant="h1"
              color="primary"
              align="center"
              gutterBottom
            >
              BigPy
            </Typography>
            <Downshift
              onChange={selectedItem => {
                this.props.history.push(`dashboard/${encodeURI(selectedItem)}`)
              }}
            >
              {({
                getInputProps,
                getMenuProps,
                getItemProps,
                highlightedIndex,
                isOpen,
                inputValue,
                selectedItem
              }) => (
                <div>
                  {renderInput({
                    fullWidth: true,
                    disableUnderline: true,
                    classes,
                    InputProps: getInputProps({
                      placeholder: 'Search a company'
                    })
                  })}
                  <div {...getMenuProps()}>
                    {isOpen ? (
                      <Paper className={classes.paper} square>
                        {companiesNames
                          .filter(name => {
                            const companyName = deburr(name.toLowerCase())
                            const searchInput = deburr(inputValue.toLowerCase())
                            return (
                              companyName.includes(searchInput) &&
                              searchInput.length > 1
                            )
                          })
                          .slice(0, MAX_SUGGESTION_ITEMS)
                          .map((companyName, index) => {
                            return renderSuggestion({
                              companyName,
                              index,
                              itemProps: getItemProps({
                                item: companyName
                              }),
                              highlightedIndex,
                              selectedItem
                            })
                          })}
                      </Paper>
                    ) : null}
                  </div>
                </div>
              )}
            </Downshift>
          </div>
        ) : (
          <BouncingLoader />
        )}
      </div>
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
}

export const getCompaniesNamesQuery = gql`
  query {
    companiesNames
  }
`

export default withRouter(
  withStyles(styles)(graphql(getCompaniesNamesQuery)(Search))
)
