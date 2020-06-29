import React, { Component } from "react";
import LyricsDataService from "../services/LyricsDataService";
import { Link } from "react-router-dom";
import { strict } from "assert";


export default class NewGame extends Component {
    constructor(props) {
        super(props);
        this.retrieveCategories = this.retrieveCategories.bind(this);
        this.setActiveCategory = this.setActiveCategory.bind(this);
        this.retrieveSongs = this.retrieveSongs.bind(this);
        this.onChangeSongTitle = this.onChangeSongTitle.bind(this);
        this.guess = this.guess.bind(this);

        this.state = {
            categories: [],
            songs: [],
            chosenCategory: null,
            currentCategory: null,
            currentIndex: -1,
            randomSong: null,
            guess: "",
            correct_guess: false
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

    retrieveSongs() {
        LyricsDataService.getByCategory(encodeURI(this.state.chosenCategory))
            .then(response => {
                this.setState({
                    songs: response.data
                })
                console.log(response.data)
            })
            .then(() => {
                this.setState({
                    randomSong: this.state.songs[Math.floor(Math.random() * this.state.songs.length)]
                })
                console.log(this.state.randomSong)
            })
            .catch(err => {
                console.log(err)
            })
    }

    setActiveCategory(category, index) {
        this.setState({
            currentCategory: category,
            currentIndex: index
        });
    }

    getRandomSong() {
        this.setState({
            randomSong: this.state.songs[Math.floor(Math.random() * this.state.songs.length)]
        })

    }

    onChangeSongTitle(guess) {
        const song_title = guess.target.value;
        this.setState({
            guess: song_title
        })
    }

    guess() {
        this.setState({
            correct_guess: (this.state.randomSong.song_title == this.state.guess)
        })
    }



    render() {
        const categories = this.state.categories;
        const currentCategory = this.state.currentCategory;
        const currentIndex = this.state.currentIndex;
        const chosenCategory = this.state.chosenCategory;
        const songs = this.state.songs;
        const randomSong = this.state.randomSong;
        const guess = this.state.guess;
        const correct_guess = this.state.correct_guess;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Category List</h4>

                    <ul className="list-group">
                        {categories &&
                            categories.map((category, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveCategory(category, index)}
                                    key={index}
                                >
                                    {category}
                                </li>
                            ))}
                    </ul>

                    <button className="badge badge-primary mr-2" onClick={() => {
                        this.setState({
                            chosenCategory: this.state.currentCategory

                        })
                        this.retrieveSongs()
                    }}>
                        Choose category
                    </button>
                </div>

                <div className="col-md-6">
                    {chosenCategory ? (
                        <div>
                            <h4>Game</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {chosenCategory}
                            </div>
                            <div>
                                <label>
                                    <strong>Lyrics:</strong>
                                </label>{" "}
                                {randomSong ? (
                                    randomSong.lyrics
                                ) : ("No lyrics found")}
                            </div>
                            <div>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Guess the song title..."
                                        value={guess}
                                        onChange={this.onChangeSongTitle}
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={() => {
                                                this.setState({
                                                    correct_guess: (guess.toLowerCase() == randomSong.song_title.toLowerCase().split(" (")[0].split(" -")[0])
                                                })
                                            }}
                                        >
                                            Guess!
                                            </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {correct_guess ? ("Yay you quessed it right") : ("")}
                            </div>
                            <div>
                                <button className="badge badge-primary mr-2" onClick={() => {
                                    this.setState({
                                        songs: [],
                                        guess: "",
                                        correct_guess: false
                                    })
                                    this.retrieveSongs()
                                }}>
                                    New song!
                                </button>
                            </div>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Please choose a category...</p>
                            </div>
                        )}
                </div>
            </div>

        )
    }
}

