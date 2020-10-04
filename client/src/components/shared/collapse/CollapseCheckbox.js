import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

export class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: [],
    filters: [],
  };
  componentDidMount() {
    if (!this.state.open) {
      this.setState({ open: this.props.initalState });
    }
  }
  handleToggleArrow = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleToggleCheck = (filterItemId) => {
    const { checked } = this.state;
    const newChecked = [...checked];
    const currentIndex = newChecked.findIndex((id) => id === filterItemId);
    if (newChecked.includes(filterItemId)) {
      newChecked.splice(currentIndex, 1);
    } else {
      newChecked.push(filterItemId);
    }
    this.setState(
      {
        checked: newChecked,
      },
      () => {
        this.props.handleFilters(newChecked);
      }
    );
  };
  renderList = () => {
    if (this.props.list) {
      return this.props.list.map((filterItem) => (
        <ListItem key={filterItem._id} style={{ padding: "10px 0" }}>
          <ListItemText primary={filterItem.name}> </ListItemText>
          <ListItemSecondaryAction>
            <Checkbox
              color="primary"
              onChange={() => {
                this.handleToggleCheck(filterItem._id);
              }}
              checked={this.state.checked.includes(filterItem._id)}
            />
          </ListItemSecondaryAction>
        </ListItem>
      ));
    }
  };
  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleToggleArrow}
            style={{ padding: "10px 0 0 0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.state.open === true ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox;
