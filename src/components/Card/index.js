import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import Toggle from 'material-ui/lib/toggle';
import { connect } from 'react-redux'

class CardExpandable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      count : null
    };
  }

  handleExpandChange = (expanded) => {
    fetch('/api/countBooks').then(function(response) {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(function(count) { this.setState({count:count}) }.bind(this))
      .catch(function(error) { console.log(error); });
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };

  render() {
    return (
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={this.props.userInfo.name}
          subtitle="Subtitle"
          avatar={this.props.userInfo.img}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>
          This toggle controls the expanded state of the component.
          <Toggle toggled={this.state.expanded} onToggle={this.handleToggle} />
        </CardText>
        <CardMedia
          expandable={true}
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
        <CardText expandable={true}>
          {this.state.count}
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onTouchTap={this.handleExpand} />
          <FlatButton label="Reduce" onTouchTap={this.handleReduce} />
        </CardActions>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
    
        const { userInfo, logged } = state.userWrapper
        return {
          userInfo,
          logged
        }
      }
     
      
      
    export default connect(mapStateToProps,undefined)(CardExpandable)