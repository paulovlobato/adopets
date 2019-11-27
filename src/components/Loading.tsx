import React from "react";
import ReactLoading from "react-loading";
import { authAPI, setAccessKey, isAuthenticated } from "services/auth.service";
import { environment } from "environments/environment";
import { SignIn } from "pages/SignIn";
import { withRouter } from "react-router-dom";

class LoadingComponent extends React.Component {
  constructor(props) {
    super(props);

  }

  state = {
    done: undefined
  };

  loadAccessKey = async () => {
    let res = await authAPI.post("/session-request", {
      system_api_key: environment.API_KEY
    });

    if (res.data.status !== 200) {
      console.error(
        "FAILED TO GET ACCESS_KEY. PLEASE CHECK WITH YOUR SYS ADMIN"
      );
    } else {
      console.info("Access key succesfully loaded");
      setAccessKey(res.data.data.access_key);
      this.setState({ done: true });
    }
  };

  componentDidMount() {
    console.log("Loading API KEY...");
    
    // Prevents user from going back after logged in
    if (isAuthenticated()) {
      this.props["history"].replace("/home");
    } else {
      try {
        this.loadAccessKey();
      } catch (e) {
        console.error(e);
      }
    }
  }

  render() {
    return (
      <div className="App-header">
        {!this.state.done ? (
          <ReactLoading type={"bars"} color={"#808080"} />
        ) : (
          <SignIn />
        )}
      </div>
    );
  }
}

export const Loading = withRouter(LoadingComponent);