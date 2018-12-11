import React, { Component } from 'react';
import './table.css'


class Table extends Component {

    render() {
        var years = []
        for (var y = 2018; y >= 1900; y--) {
            years.push(<option key={y}>{y}</option>)
        }
        return ( 
            <div className="container">
            <form>
              <div className="row">
                <h4>Information</h4>
                <div className="input-group input-group-icon">
                  <input type="text" placeholder="Full Name"/>
                  <div className="input-icon"><i className="fa fa-user"></i></div>
                </div>
              </div>
              <div className="row">
                <div className="col-half">
                  <h4>Date of Birth</h4>
                  <div className="input-group">
                    <select>
                      <option> 1 Jan</option> <option> 2 Feb</option>
                      <option> 3 Mar</option> <option> 4 Apr</option>
                      <option> 5 May</option> <option> 7 June</option> 
                      <option> 7 July</option> <option> 8 Aug</option> 
                      <option> 9 Sept</option> <option>10 Oct</option> 
                      <option>11 Nov</option> <option>12 Dec</option> 
                    </select>
                    <select>
                        {years}
                    </select>
                  </div>
                </div>
                <div className="col-half">
                  <h4>Gender</h4>
                  <div className="input-group">
                    <input type="radio" name="gender" value="male" id="gender-male"/>
                    <label htmlFor="gender-male">Male</label>
                    <input type="radio" name="gender" value="female" id="gender-female"/>
                    <label htmlFor="gender-female">Female</label>
                  </div>
                </div>
              </div>
              
              <div className="row">
                <input type="submit" />
              </div>
            </form>
          </div>
          
        )
    }
}

export default Table;