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
            <div >
                <input id="origin-input" class="controls" type="text"
                    placeholder="Enter an origin location" ref={el => (this.originInput = el)} />

                <input id="destination-input" class="controls" type="text"
                    placeholder="Enter a destination location" ref={el => (this.destInput = el)} />

                <button type="button" class="controls" onClick={this.getRoute}>
                    Go
               </button>
            </div>
        );
    }
}

UserInputForm.defaultProps = {
    maps
};

export default UserInputForm;