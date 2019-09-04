import React from "react";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect
} from "react-router-dom";

import Home from "./pages/Home/index";
import Citylist from "./pages/Citylist/index";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">

          {/* Link */}
          {/* <Link to="/home">首页</Link>
          <Link to="/citylist">城市列表</Link> */}
          {/* Route */}
          <Route path="/home" component={Home}/>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/citylist" component={Citylist}/>
        </div>
      </Router>
    );
  }
}

export default App;

// 使用其他组件
// 使用路由
