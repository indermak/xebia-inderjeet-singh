import React from 'react';
import { connect } from 'react-redux';
import { searchRequest } from '../../actions';

class SearchPlanet extends React.Component {
    state = {
        isAllowed: false,
        count: 0
    }
    componentDidMount() {
        const { username } = this.props;
        if (username === 'Luke Skywalker') {
            this.setState({ isAllowed: true })
        }
        this.interval = setInterval(() => {
            this.setState({ count: 0 })
        }, 60000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderPlanets = () => {
        const { result, planet } = this.props;
        if (planet && result && result.length) {
            const fontSize = 12;
            const planets = result.sort((a, b) => ((parseInt(a.population, 10) > parseInt(b.population, 10)) ? 1 : -1));
            return planets.map((planet, index) => {
                return <li style={{ fontSize: fontSize + index }} key={`planet${index}`}> {planet.name}</li>
            })
        }
    }

    handleSearch = (e) => {
        const { count, isAllowed } = this.state;
        const planet = e.target.value;
        if (count < 16 || isAllowed) {
            this.setState({ count: count + 1 }, () => {
                this.props.searchRequest(planet);
            })
        }

    }

    render() {
        const { isLoading, error } = this.props;
        return (
            <div className="container" style={{ paddingTop: '5vh' }}>
                <div className="center">
                    <h2>Search</h2>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" id="usr" onChange={this.handleSearch} />
                    <ul>{this.renderPlanets()}</ul>
                </div>
                <br />
                {isLoading && (<div>
                    Loading Planets...
                </div>)}
                {error && (<div>
                    {error}
                </div>)}
            </div>
        )
    }

}

const mapStateToProps = ({ search, login }) => ({
    result: search.result,
    isLoading: search.isLoading,
    error: search.error,
    planet: search.planet,
    username: login.user && login.user.name
});

const mapDispatchToProps = dispatch => ({
    searchRequest: (data) => dispatch(searchRequest(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchPlanet);
