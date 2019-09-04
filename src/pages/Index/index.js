import React from "react";
import { Carousel, Flex, Grid, WingBlank, NavBar, Icon } from "antd-mobile";
// import axios from 'axios'
import { getSwiper, getGroups, getNews } from "./api";
import Nav1 from "../../assets/images/nav-1.png";
import Nav2 from "../../assets/images/nav-2.png";
import Nav3 from "../../assets/images/nav-3.png";
import Nav4 from "../../assets/images/nav-4.png";
import "./index.scss";

const BaseURL = `http://localhost:8080`;
// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: "整租",
    path: "/home/list"
  },
  {
    id: 2,
    img: Nav2,
    title: "合租",
    path: "/home/list"
  },
  {
    id: 3,
    img: Nav3,
    title: "地图找房",
    path: "/map"
  },
  {
    id: 4,
    img: Nav4,
    title: "去出租",
    path: "/rent/add"
  }
];

class HomeIndex extends React.Component {
  state = {
    swiperData: [],
    groupData: [],
    newsData: [],
    imgHeight: 212,
    autoplay: false
  };
  loadSwiper = async () => {
    const { data } = await getSwiper();
    if (data.status === 200) {
      this.setState(
        () => {
          return { swiperData: data.body };
        },
        () => {
          this.setState(() => {
            return { autoplay: true };
          });
        }
      );
    }
  };
  loadGroup = async () => {
    const { data } = await getGroups();
    if (data.status === 200) {
      this.setState(() => {
        return { groupData: data.body };
      });
    }
  };
  loadNews = async () => {
    const { data } = await getNews();
    if (data.status === 200) {
      // console.log(data.body)
      this.setState(() => {
        return { newsData: data.body };
      });
    }
  };
  async componentDidMount() {
    this.loadSwiper();
    this.loadGroup();
    this.loadNews();
  }
  renderCarouse = () => {
    return this.state.swiperData.map(item => (
      <a
        key={item.id}
        href="http://www.itcast.com"
        style={{
          display: "inline-block",
          width: "100%",
          height: this.state.imgHeight
        }}
      >
        <img
          src={`${BaseURL}${item.imgSrc}`}
          alt="图片未显示"
          style={{ width: "100%", verticalAlign: "top" }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event("resize"));
            this.setState({ imgHeight: "auto" });
          }}
        />
      </a>
    ));
  };
  renderMenus = () => {
    return navs.map(item => (
      <Flex.Item
        key={item.id}
        className="nav"
        onClick={() => {
          this.props.history.push(item.path);
        }}
      >
        <img src={item.img} alt="图片未找到" />
        <p>{item.title}</p>
      </Flex.Item>
    ));
  };
  renderGrid = () => {
    const { groupData } = this.state;
    return (
      <Grid
        data={groupData}
        columnNum={2}
        square={false}
        activeStyle
        hasLine={false}
        renderItem={item => {
          return (
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img
                src={`http://localhost:8080${item.imgSrc}`}
                alt="图片无法显示"
              />
            </Flex>
          );
        }}
      />
    );
  };
  renderNews = () => {
    const { newsData } = this.state;
    return newsData.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img className="img" src={`${BaseURL}${item.imgSrc}`} alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ));
  };
  render() {
    const { autoplay, groupData } = this.state;
    return (
      <div>
        {/* 导航->按钮->进入城市列表 */}
        <NavBar
          mode="dark"
          rightContent={[
            <Icon 
            onClick={()=>{
                this.props.history.push('/citylist')
            }}
            key="0" type="ellipsis" style={{ marginRight: "16px" }} />,
          ]}
        >
          首页
        </NavBar>
        {/* 轮播图 */}
        <Carousel autoplay={autoplay} infinite>
          {this.renderCarouse()}
        </Carousel>
        {/* 菜单 */}
        <Flex>{this.renderMenus()}</Flex>
        {/* 租房小组 */}
        <div className="group">
          <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* 宫格 */}
          {this.renderGrid()}
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    );
  }
}

export default HomeIndex;
