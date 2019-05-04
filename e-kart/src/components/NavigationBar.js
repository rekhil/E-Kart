import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../sharedStyle.css'

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
    }

    changeSearchTextHandler = event => {
        this.setState({ searchText: event.target.value })
    }

    onSearchSubmit = () => {
        this.setState({ searchText: '' })
    }

    render() {
        return (
            <div className='navigationBar'>
                <Link to='/' >E-kart</Link>
                <input type='text' value={this.state.searchText} onChange={this.changeSearchTextHandler} />
                <button type='submit' onClick={this.onSearchSubmit} >Search</button>
                <Link to='/'>Home</Link>
                <Link to='/cartdetails'>My cart</Link>
                <Link to='/signin'>Sign In</Link>
                <Link to='/signup'>Sign Up</Link>
            </div>
        )
    }
}

export default NavigationBar;