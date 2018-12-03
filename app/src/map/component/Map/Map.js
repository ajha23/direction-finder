import React, { Component } from 'react';

import { maps } from '../../../common/services';

import './Map.css'



class Map extends Component {
    mapContainer;
    map;
    maps;


    initMap = async () => {
        this.maps = await this.props.maps();

        this.map = new this.maps.Map(this.mapContainer, {
            zoom: 14,
            center: { lat: 28.457523, lng: 77.026344 }
        });
    };


    preparePositionsFromPath = path => {
        return path.map(([lat, lng]) => new this.maps.LatLng(lat, lng));
    };


    drawDirections = ({ path }) => {
        const directionsService = new this.maps.DirectionsService();
        const directionsRenderer = new this.maps.DirectionsRenderer();

        directionsRenderer.setMap(this.map);

        const positions = this.preparePositionsFromPath(path);
        const waypoints = positions
            .slice(1, positions.length - 1)
            .map(location => ({ location, stopover: false }));


        const request = {
            origin: positions[0],
            destination: positions[positions.length - 1],
            waypoints,
            optimizeWaypoints: true,
            travelMode: this.maps.TravelMode.DRIVING
        };


        directionsService.route(request, (response, status) => {
            if (status === this.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('Error in direction service response');
            }
        });
    };

    componentDidMount() {
        this.initMap();
    }

    getSnapshotBeforeUpdate() {
        const { directions } = this.props;
        if (directions) {
            this.drawDirections(directions);
        }
        return null;
    }


    render() {
        return (
            <div id="map">
                <div className="map-container">
                    <div ref={el => (this.mapContainer = el)} />
                </div>
            </div>
        );
    }
}

Map.defaultProps = {
    maps
};

export default Map;










