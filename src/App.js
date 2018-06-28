import React, { Component } from 'react';
import createReactClass from 'create-react-class';
import axios from 'axios';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  NavigatorIOS,
  TouchableWithoutFeedback,
  WebView
} from 'react-native';

var ALIS_RECENT_URL = "https://alis.to/api/articles/recent?limit=5";
var ALIS_ARTICLES_URL = "https://alis.to/api/articles/";

class App extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{
          component: AlisRecentList,
          title: 'AlisRecent',
      }}/>
    );
  }
}

// 新規記事一覧リスト
var AlisRecentList = createReactClass({
  getInitialState: function() {
    return {
      items: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.items}
        renderRow={this.renderItem}
        style={styles.listView}/>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  },

  renderItem: function(item, sectionID, rowID) {
    return (
      <TouchableWithoutFeedback  onPress={() => this.onPressed(item)}>
        <View style={styles.container}>
          <Image
            source={{uri: item.eye_catch_url}}
            style={styles.thumbnail}/>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.name}>{item.user_id}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  },

  // APIコール
  fetchData: function() {
    axios.get(ALIS_RECENT_URL)
    .then(res => {
      this.setState({
        items: this.state.items.cloneWithRows(res.data.Items),
        loaded: true,
      });
    });
  },

  //イベント
  onPressed: function(item) {
    this.props.navigator.push({
      title: item.title,
      component: AlisRecentItemView,
      passProps: { url: ALIS_ARTICLES_URL + item.article_id }
    })
  },
});

// 記事閲覧View
var AlisRecentItemView = createReactClass({
  render: function() {
    return (
      <WebView
        url={this.props.url}/>
    )
  }
});

// スタイル
var styles = StyleSheet.create({
  navigator: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    margin: 8,
    textAlign: 'left',
  },
  name: {
    fontSize: 12,
    margin: 8,
    textAlign: 'left',
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 2,
  },
  listView: {
    backgroundColor: '#FFFFFF',
  },
});

export default App;