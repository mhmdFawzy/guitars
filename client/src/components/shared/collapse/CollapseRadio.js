import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faAngleDown from "@fortawesome/fontawesome-free-solid/faAngleDown";
import faAngleUp from "@fortawesome/fontawesome-free-solid/faAngleUp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export class CollapseRadio extends Component {
  state = {
    open: true,
    value: "[]",
  };

  handleToggleArrow = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleToggleCheck = (event) => {
    console.log(event.target.value);
    this.setState(
      {
        value: event.target.value,
      },
      this.props.handleFilters(JSON.parse(event.target.value))
    );
  };
  renderList = () => {
    if (this.props.list) {
      return this.props.list.map((value) => (
        <FormControlLabel
          key={value._id}
          value={`[${value.array}]`}
          control={<Radio />}
          label={value.name}
        />
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
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={this.state.value}
                onChange={this.handleToggleCheck}
              >
                {this.renderList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseRadio;
