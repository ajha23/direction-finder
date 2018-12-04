import React, { Component } from 'react';

import { maps } from '../../../common/services';

import './UserInputForm.css'


class UserInputForm extends Component {
    originInput;
    originInputAutoComplete;
    destInput;
    destInputAutoComplete;


    getRoute = () => {
        const origin = this.originInputAutoComplete.getPlace();
        const dest = this.destInputAutoComplete.getPlace();
        this.props.getDirections(origin, dest);
    };

    resetForm = () => {
      this.props.resetForm();
      document.getElementById('ContactForm').reset();

    }


    renderAutoComplete = async () => {
        const maps = await this.props.maps();

        this.originInputAutoComplete = new maps.places.Autocomplete(this.originInput);

        this.destInputAutoComplete = new maps.places.Autocomplete(this.destInput);
    };


    componentDidMount() {
        this.renderAutoComplete();
    }

    render() {
        return (
            <form id='ContactForm' ref={this.formReset} onSubmit={this.handleSubmit}>
                <input id="origin-input" className="controls" type="text"
                    placeholder="Enter an origin location" ref={el => (this.originInput = el)} />

                <input id="destination-input" className="controls" type="text"
                    placeholder="Enter a destination location" ref={el => (this.destInput = el)} />

                <button type="button" className="controls" onClick={this.getRoute}>
                    Go
               </button>
               
                <button type="button" className="controls" onClick={this.resetForm}>
                    Reset
                </button>
            </form>
        );
    }
}

UserInputForm.defaultProps = {
    maps
};

export default UserInputForm;