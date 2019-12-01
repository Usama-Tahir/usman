import React, { Component } from "react";
import "./residential.css";
import { json_Residential as data } from "./data";
class Residential extends Component {
  constructor() {
    super();
    this.state = {
      searchObject: "",
      block: "",
      status: ""
    };
  }
  componentDidMount() {}

  onChangeSearch = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  submitData = (e) => {
    e.preventDefault();
    const { searchObject } = this.state;
    const { features } = data;
    const updatedData = features.map(feature => {
      if (feature.properties.Plot_No === searchObject) {
        feature.properties.Block = this.state.block;
        feature.properties.Status = this.state.status;
      }
      return feature;
    });
    data.features = updatedData;
    console.log('DATA NOW IS: ', data);
  }
  loadDataFromFile = e => {
    e.preventDefault();
    console.log("we come here!");
    const { searchObject } = this.state;
    const { features } = data;
    const findData = features.find(
      feature => feature.properties.Plot_No === searchObject
    );
    console.log("DATA FETCHED IS: ", findData);
    if (findData) {
      // Usman is jaga state set krni ha. means data form me load is jga se hoga.
      this.setState({
        block: findData.properties.Block,
        status: findData.properties.Status
      });
    }
  };
  render() {
    const mystyle = {
      margin: "auto",
      maxWidth: "300px"
    };
    return (
      <div>
        {/* form for search */}
        <form className="example" style={mystyle}>
          <input
            type="text"
            placeholder="Search.."
            name="searchObject"
            onChange={this.onChangeSearch}
            value={this.state.searchObject}
          />
          <button type="submit" onClick={this.loadDataFromFile}>
            <i className="fa fa-search"></i>
          </button>
        </form>

        {/* form for data updates */}
        <form >
          <input
            type="text"
            placeholder="block"
            name="block"
            onChange={this.onChangeSearch}
            value={this.state.block}
          />
          <input
            type="text"
            placeholder="status"
            name="status"
            onChange={this.onChangeSearch}
            value={this.state.status}
          />
          <button type="submit" onClick={this.submitData}>
            Update Data
          </button>
        </form>
      </div>
    );
  }
}

export default Residential;
