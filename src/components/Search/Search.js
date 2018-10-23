import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import MoodBad from '@material-ui/icons/MoodBad'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import BouncingLoader from '../BouncingLoader/BouncingLoader'
import { deburr } from '../../utils/utils'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: 'relative'
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
  }
})

function renderInput(inputProps) {
  const { InputProps, classes, ...other } = inputProps

  return (
    <InputBase
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
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const companyName = suggestion.node.Id
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
    const { loading, error, allCompaniesNames } = this.props.data

    if (error) {
      return (
        <Grid container direction="column" justify="center" alignItems="center">
          <MoodBad className={classes.icon} color="disabled" />
          <Typography variant="h5" color="inherit">
            Something went bad. Please, try again.
          </Typography>
        </Grid>
      )
    }

    return (
      <div className={classes.root}>
        {!loading ? (
          <Downshift
            onChange={selectedItem => {
              console.log(`You have selected item ${selectedItem}`)
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
              <div className={classes.container}>
                {renderInput({
                  fullWidth: true,
                  classes,
                  InputProps: getInputProps({
                    placeholder: 'Search a company'
                  })
                })}
                <div {...getMenuProps()}>
                  {isOpen ? (
                    <Paper className={classes.paper} square>
                      {allCompaniesNames.edges
                        .filter(({ node }) => {
                          const companyName = deburr(node.Id.toLowerCase())
                          const searchInput = deburr(inputValue.toLowerCase())
                          return (
                            companyName.includes(searchInput) &&
                            searchInput.length > 1
                          )
                        })
                        .map((suggestion, index) => {
                          return renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({
                              item: suggestion.node.Id
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

export const getCompaniesQuery = gql`
  query {
    allCompaniesNames {
      edges {
        node {
          Id
        }
      }
    }
  }
`

export default withStyles(styles)(graphql(getCompaniesQuery)(Search))
