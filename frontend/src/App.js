import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchInfo from "./components/SearchInfo";
import axios from "axios";
import SearchToggler from "./components/SearchToggler";
import SearchTabContainer from "./components/SearchTabContainer";
import WarningAlert from "./components/WarningAlert";

class App extends React.Component {
  state = {
    tweets: [],
    hashtags: [],
    info: {},
    isBusy: false,
    term: "",
    activeTab: "tweet"
  };

  componentDidMount() {
    this.handleFetchTweets();
  }

  handleFetchTweets = async (term = "twitter") => {
    this.setState({ isBusy: true });
    this.setState({ term: term });
    this.toggleTab("tweet");

    try {
      const resp = await axios.get(`/api/twitter/?search=${term}`);

      this.setState({ showWarning: false });

      if (resp.status === 200) {
        const results = resp.data;
        this.setState({
          showWarning: false,
          tweets: results.tweets,
          hashtags: results.hashtags,
          info: {
            count: results.count,
            completed_in: results.completed_in,
            next: results.nex
          }
        });
      } else if (resp.status === 429) {
        console.error("Too many requests.");
      }
    } catch (err) {
      console.log(err);
      this.setState({ showWarning: true });
    } finally {
      this.setState({ isBusy: false });
    }
  };

  toggleTab = tab => {
    this.setState({ activeTab: tab });
  };

  render() {
    return (
      <div style={{paddingTop: 56}}>
        {this.state.showWarning && (
          <WarningAlert message="Please check your network connectivity." />
        )}
        <SearchBar
          title="Twitter SE v1.0"
          onFetchTweets={this.handleFetchTweets}
          isBusy={this.state.isBusy}
        />
        <div className="container-fluid" style={{ width: 960 }}>
          <SearchInfo {...this.state.info} isBusy={this.state.isBusy} />
          <SearchToggler
            hide={this.state.isBusy || this.state.tweets.length === 0}
            onToggleTab={this.toggleTab}
            activeTab={this.state.activeTab}
            hashtagCount={this.state.hashtags.length}
          />
          {this.state.isBusy ? (
            <h2 className={"text-center"}>
              <img src="/ajax-loader.gif" alt="loader" width="30" heigh="30" />{" "}
              Searching...
            </h2>
          ) : (
            <SearchTabContainer
              results={
                this.state.activeTab === "tweet"
                  ? this.state.tweets
                  : this.state.hashtags
              }
              term={this.state.term}
              activeTab={this.state.activeTab}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
