import React from 'react';
import Card from 'material-ui/Card/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardMedia from 'material-ui/Card/CardMedia';
import CardTitle from 'material-ui/Card/CardTitle';
import FlatButton from 'material-ui/FlatButton';
import CardText from 'material-ui/Card/CardText';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux'
import PopupNeedLogin from '../PopupNeedLogin'
import * as injectTapEventPlugin from 'react-tap-event-plugin';

class CardExpandable extends React.Component {


  constructor(props) {
    super(props);
    injectTapEventPlugin();
    this.state = {
      expanded: false,
      count : 0
    };
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/countBooks').then(function(response) {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.includes("application/json")) {
          return response.json();
        }
        throw new TypeError("Oops, we haven't got JSON!");
      })
      .then(function(count) {debugger; this.setState({count:count.length}) }.bind(this))
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

    if(!this.props.logged)
       return <PopupNeedLogin />

    return (
      <Card expanded={this.state.expanded}>
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
        Libri inseriti dagli utenti: 
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
     
      
      
    export default connect(mapStateToProps)(CardExpandable)