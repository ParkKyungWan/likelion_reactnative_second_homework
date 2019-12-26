import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import WriteScreen from './screens/WriteScreen';
//BottomTabNavigator를 생성합니다. (이름처럼 아래부분에 탭을 통해 이동하는 Navigator입니다)
const BaseNavi = createBottomTabNavigator({
  MainScreen: {
  screen: MainScreen,
  },
  DetailScreen: {
  screen: DetailScreen,
  },
  WriteScreen: {
  screen: WriteScreen,
},
},
{
tabBarOptions:{
showLabel :false,
}
}
);
const BaseNavi2 = createStackNavigator( //Navigator를 만드는 방법은 BottomTab과 다르지 않죠?
{
Write : WriteScreen, //Write라는 이름이 사용되면 WriteScreen을 사용해주겠다
Tab: BaseNavi, //Tab이라는 이름이 사용되면 우리가 만들었던 TabNavi를 사용해주겠다
Detail : DetailScreen, //나중에 detailpage도 stack방식의 navi로 이동해줄예정입니다.
},
{
initialRouteName:'Tab', // 처음 보여줄 Page라고 생각하시면 되겠습니다 지금은 Tab이니까 TabNavi의 첫번째 Main이 떠요
mode : 'modal', // IOS의 경우 stack되는 모양을 card 와 modal 둘중 하나로 설정할수있슴다. 안드로이드는 무시해도 돼요
headerMode : 'none' //headermode를설정 안하시고 동작시켜보면 알겠지만 stack된 screen위에
} //header가 생긴 것을 볼수 있어요. 그 header에 뒤로가기가 있는데
//우리는 따로 header를 만들어 줄 예정이므로 'none'설정을 해줍시다
)


//App.js에서 Navigation을 사용하려면 createAppContainer을 이용해
//최상위 Navigation을 처리 해줘야 합니다. 지금은 BaseNavi하나이므로 BaseNavi를 처리해줍시다
const MyNavi = createAppContainer(BaseNavi2);
export default class App extends React.Component {
render(){
return (
<View style={styles.container}>
<MyNavi/>
</View>
);
}
}
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
//여기 정렬되어있는애들 지워야지 우리의 bottomnavi가 제대로 보입니다
},
});