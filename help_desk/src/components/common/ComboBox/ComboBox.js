import React, { Component } from 'react';
import './ComboBox.css';

class ComboBox extends Component {
    render() {
        return (
            <React.Fragment>
                <label htmlFor={this.props.name}>{this.props.title}</label>
                <select 
                    name={this.props.name}
                    required={this.props.required}
                    value={this.props.value}
                    onChange={this.props.onChange}  
                    data-live-search="true"                  
                >
                    {this.props.list.map((item, i) => (
                        <option key={i} value={item.key}>
                            {item.value}
                        </option>
                    ))}
                </select>
            </React.Fragment>
        );
    }
}

export default ComboBox;