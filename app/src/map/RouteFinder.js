import React, { Component } from 'react';

import { UserInputForm, Map, RouteInfo } from './component';
import { fetchDirections } from './services';

import './RouteFinder.css'


class RouteFinder extends Component {
    constructor() {
        super();
        this.state = {
            RouteFinderResponse: null,

        };
    }

    getDirections = async (origin, dest) => {

        const response = await fetchDirections(origin, dest).catch(e => {
            this.showErrorMessage('Internal server error');
        });



        if (response && response.error) {
            this.showErrorMessage(response.error);
            return;
        }


        if (response && response.path) {
            this.setState(() => ({
                RouteFinderResponse: response
            }));
        }
    };

    showErrorMessage = message => {
        this.setState(() => ({
            RouteFinderResponse: null
        }));
        alert(message);
    };

    render() {
        const { RouteFinderResponse} = this.state;
        return (
            <div className="routefinder-container">

                <div className="routefinder-form-container">
                    <UserInputForm getDirections={this.getDirections} />
                    <div className="routefinder-route-info">
                        {RouteFinderResponse && (
                            <RouteInfo {...RouteFinderResponse} />
                        )}
                    </div>
                </div>
                <Map directions={RouteFinderResponse} />
            </div>
        );
    }
}

export default RouteFinder;