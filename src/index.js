import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import YTSearch from 'youtube-api-search'
import VideoDetail from './components/video_detail'
const API_KEY = 'AIzaSyDNwz6UBvLSRjcJghGFMMNuBs-U7WJ_QgI'//`${process.env.REACT_APP_API_KEY}`

//Create new component
//Component produces jsx/html
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            videos: [],
            selectedVideo: null
        }

        this.videoSearch('surfboards')
    }
    
    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            })
        })
    }

    render() {
        return (
            <div>
                <div className="title">
                    Mindless YouTube!
                </div>
                <div className='subtitle'>
                    Just start typing what you're broadly interested in, and we'll pull up the top trending videos for you (ex, dogs, NBA, Fortnite)
                </div>

                <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                    videos={this.state.videos} />
            </div>
        )
    }
}

//Show component html in DOM
ReactDOM.render(<App />, document.getElementById('root'))