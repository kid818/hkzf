import React from "react";
import { Link, Route } from "react-router-dom";
import { TabBar } from "antd-mobile";
import Index from "../Index";
import House from "../House";
import Profile from "../Profile";
import "../../assets/fonts/iconfont.css";
import "./index.css";
import {tabbarData} from "./tabbar.json"

class Home extends React.Component {
  state = {
    //取出当前url的path值->路由数据->location
    // selectedTab: "/home/index"
    selectedTab: this.props.location.pathname
  };
  renderTabBarItems = () => {
    return tabbarData.map(item => (
      <TabBar.Item
        title={item.title}
        key={item.id}
        icon={<i className={`iconfont ${item.icon}`}></i>}
        selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          // 切换组件->js代码->编程式导航
          this.props.history.push(item.path);
          this.setState({
            selectedTab: item.path
          });
        }}
      ></TabBar.Item>
    ));
  };
  render() {
    return (
      <div className="home">
        {/* Route */}
        <Route exact path="/home" component={Index}/>
        <Route path="/home/House" component={House}/>
        <Route path="/home/Profile" component={Profile}/>
        {/* Link */}
        {/* <Link to="/home/Index">首页</Link>
        <Link to="/home/House">找房</Link>
        <Link to="/home/Profile">我的</Link> */}
        {/* tabbar */}
        <div className="tabbar">
          <TabBar
            noRenderContent
            tabBarPosition="bottom"
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            {this.renderTabBarItems()}
          </TabBar>
        </div>
      </div>
    );
  }
}

export default Home;

{
  /* <TabBar.Item
title="首页"
key="Life"
icon={<i className="iconfont icon-ind"></i>}
selectedIcon={<i className="iconfont icon-ind"></i>}
selected={this.state.selectedTab === "/home/index"}
onPress={() => {
  // 切换组件->js代码->编程式导航
  this.props.history.push("/home/index");
  this.setState({
    selectedTab: "/home/index"
  });
}}
></TabBar.Item> */
}
