import React, { Component } from "react";
import LyricsDataService from "../services/LyricsDataService";
import { Link } from "react-router-dom";

export default class NewGame extends Component {
    constructor(props) {
        super(props);
        this.retrieveCategories = this.retrieveCategories.bind(this);

        this.state = {
            categories: []
        };
    };

    componentDidMount() {
        this.retrieveCategories();
    }

    retrieveCategories() {
        LyricsDataService.getAll()
            .then(response => {
                const data = response.data
                const categories = [];
                data.map((song) => {
                    if (categories.indexOf(song.category) < 0)
                        categories.push(song.category)
                })
                this.setState({
                    categories: categories
                })
                console.log(categories)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const categories = this.state.categories;
        return (
            <div className="col-md-6">
                <h4>Category List</h4>

                <ul className="list-group">
                    {categories &&
                        categories.map((category) => (
                            <li
                                className={
                                    "list-group-item "
                                }
                            >
                                {category}
                            </li>
                        ))}
                </ul>
            </div>
        )
    }
}

