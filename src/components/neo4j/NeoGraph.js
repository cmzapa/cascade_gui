import React, { Component } from "react";
import ResizeAware from "react-resize-aware";
import PropTypes from "prop-types";
import NeoVis from 'neovis.js'

class NeoGraph extends Component {
  constructor(props) {
    super(props);
    this.visRef = React.createRef();
  }

  componentDidMount() {
    const { neo4jUri, 
	    neo4jUser, 
	    neo4jPassword, 
            initial_cypher = "MATCH (n)-[r]-(m) RETURN n, r, m"
    
    } = this.props;
    const config = {
      container_id: this.visRef.current.id,
      server_url: neo4jUri,
      server_user: neo4jUser,
      server_password: neo4jPassword,
      labels: {
        Requirement: {
          caption: "req_id"
        },
        Report: {
          caption: "id"
        }
      },
      relationships: {
        SATISFIES: {
          thickness: "weight"
        },
        POS_RELATES: {
          thickness: "weight"
        },
        RELATES_TO: {
          thickness: "weight"
        }
      },
      initial_cypher: initial_cypher
    };
    this.vis = new NeoVis(config);
    this.vis.render();
  }
  componentDidUpdate() {
    // fixes issue with visualization not centering  
    if (this.vis._network) {
      this.vis._network.fit();
    }
  }

  render() {
    const { width, height, containerId, backgroundColor } = this.props;
    return (
          <div
            id={containerId}
            ref={this.visRef}
            style={{
              width: '100%',
              height: `${height}px`,
              backgroundColor: `${backgroundColor}`
            }}
          />
    );
  }
}

NeoGraph.defaultProps = {
  width: 600,
  height: 600,
  backgroundColor: "#d3d3d3"
};

NeoGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  containerId: PropTypes.string.isRequired,
  neo4jUri: PropTypes.string,
  neo4jUser: PropTypes.string,
  neo4jPassword: PropTypes.string,
  backgroundColor: PropTypes.string
};

class ResponsiveNeoGraph extends Component {
  state = {
    width: 600,
    height: 600
  };

  handleResize = ({ width, height }) => {
    // console.log("resize", width, height);
    const side = Math.max(width, height) / 2;
    this.setState({
      width: side,
      height: side
    });
  };

  render() {
    const responsiveWidth = this.state.width;
    const responsiveHeight = this.state.height;
    const neoGraphProps = {
      ...this.props,
      width: responsiveWidth,
      height: responsiveHeight
    };
    return (
              <ResizeAware
                style={{ position: "relative" }}
                onlyEvent
                onResize={this.handleResize}
              >
                <NeoGraph {...neoGraphProps} />
              </ResizeAware>
    );
  }
}

const responsiveNeoGraphDefaultProps = Object.keys(NeoGraph.defaultProps)
  .filter(d => d !== "width" && d !== "height")
  .reduce((accumulator, key) => {
    return Object.assign(accumulator, { [key]: NeoGraph.defaultProps[key] });
  }, {});

ResponsiveNeoGraph.defaultProps = {
  ...responsiveNeoGraphDefaultProps
};

const responsiveNeoGraphPropTypes = Object.keys(NeoGraph.propTypes)
  .filter(d => d !== "width" && d !== "height")
  .reduce((accumulator, key) => {
    return Object.assign(accumulator, { [key]: NeoGraph.propTypes[key] });
  }, {});

ResponsiveNeoGraph.propTypes = {
  ...responsiveNeoGraphPropTypes
};

export { NeoGraph, ResponsiveNeoGraph };
