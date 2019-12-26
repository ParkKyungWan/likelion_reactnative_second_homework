//WriteScreen.js
import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import WriteHeader from '../components/WriteHeader'
import uuid from 'uuid/v1';
import { TextInput, StyleSheet, Dimensions, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');
export default class WriteScreen extends React.Component {
    state = {
        inputtitle :'', //우리가 WriteScreen에서 사용할 변하는 값은 title과 content
        inputcontent : '',
        imageUri: '',

        }
        _showTitle = (value) => { //todoApp을 만들때 했던것 처럼 changeText가 발생하면
        // console.log(value) //입력된 Text를 value로 받아와 setState로 state값을 변경시켜준다
        this.setState({inputtitle:value})
        }
        _showContent = (value) =>{
        // console.log(value)
        this.setState({inputcontent:value})
        }
        _saveText = () =>{ //글을 저장하는 함수
            if(this.state.inputtitle !== ''){ //입력된 제목이 존재하면
            const id = uuid() //id값은 uuid()를 통해서 만들어줍니다
            const date = this._gettoday() //우리의 일기는 date값도 가지므로 메서드로 오늘의 date를 가져오겠습니다.
            const newpost = { //새로이 만들어질 일기객체를 생성합니다
            id : id, //id와 date는 위에서 가져온 값, title과 content는 state에서 가져옵니다
            title: this.state.inputtitle,
            content: this.state.inputcontent,
            date: date,
            imageUri: this.state.imageUri, //새로 작성하는 일기에 image 부분을 추가해 줍니다
            }
            this.setState( //그리고 글이 저장되면 state의 값을 다시 비워줍시다
            {
            inputtitle: '',
            inputcontent: '',
            imageUri: '', //새글 저장이 끝나면 imageUri도 초기화해서 다른 글을 받을 준비합니다
            }
            )
            //WriteScreen에서 생성한 object를 띄워주기위해서는 MainScreen으로 값을 넘겨줘야합니다
            //따라서 Detail Screen을 구현할때 사용했던 navigate의 2번째 parameter를 이용해서 넘겨줍니다
            this.props.navigation.navigate('MainScreen',{myparam :newpost})
            // console.log(newPost)
            }
            else{
            //else는 제목이 비어있는 경우이므로 저장버튼을 눌러도 그냥 MainScreen으로 이동만 합니다
            this.props.navigation.navigate('MainScreen')
            // console.log("이건 else")
            }
            }
            //오늘의 날짜를 불러오는 method입니다
            _gettoday = () => {
            //new Date를 이용해 날짜를 생성하고 get method를 이용해서 년,월,일을 뽑아왔습니다
            tyear = (new Date().getFullYear()).toString()
            tmonth = (new Date().getMonth() + 1).toString()
            tday = (new Date().getDate()).toString()
            // 우리의 Calendar Date형식에 맞춰 2019-9-5 가 아닌 2019-09-05 이렇게 뜨도록 해줍니다
            if (tmonth < 10) {
            tmonth = '0' + tmonth
            }
            if (tday < 10) {
            tday = '0' + tday
            }
            return (tyear + "-" + tmonth + "-" + tday)
            // console.log(tyear + "-" + tmonth + "-" + tday)
            }
            
static navigationOptions = {
tabBarIcon: ({ tintColor }) => (
<MaterialCommunityIcons name='lead-pencil' size={25} style={{ color: tintColor }} />
),
tabBarOnPress: ({ navigation }) => {
navigation.navigate('Write');
}
}
_selectImage = async() =>{
    // IOS의 경우에는 아래와 같이 사진의 접근권한을 요청합니다
    // 제가 IOS가 아니라 확인하지 못한점 죄송합니다 흑흑 ㅠㅠ
    // 안드로이드는 아래의 if문을 아예 적지 않으시는게 좋습니다
    // if (Constants.platform.ios) {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (status !== 'granted') {
    // alert('Sorry, we need camera roll permissions to make this work!');
    // }
    // }
    //await를 이용해서 ImagePicker가 image를 받아올때까지 기다려
    // result에 저장해줍니다
    let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true, //Editing옵션은 사진을 첨부할때 자르기 옵션 활성화여부입니다
    });
    this.setState({ imageUri: result.uri }); //ImagePicker로 뽑아온 return값중 uri를 뽑아내 저장합니다
    }
    
render() {
return (
<SafeAreaView style={styles.container}>
<View style={styles.contentContainer}>
<WriteHeader saveProps={this._saveText} selectImage = {this._selectImage} />
<TextInput
value = {this.state.inputtitle} 
onChangeText={this._showTitle}

placeholder="제목을 입력하세요"
style={styles.title}
returnKeyType="done" /> 
{this.state.imageUri ? <Image source={{ uri: this.state.imageUri }} style={{ width: 100, height: 100 }} /> : null}
<TextInput
value={this.state.inputcontent}
onChangeText={this._showContent}

placeholder="내용을 입력하세요"
multiline={true} 
style={styles.content}returnKeyType="done" />
</View>
</SafeAreaView>
)
}
}
const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
paddingTop:30,
},
contentContainer: {
width: width - 60,
},
title: {
marginVertical: 30, //margin을 위 아래로 주는 속성입니다
fontSize: 30,
paddingBottom: 12,
borderBottomWidth: 2,
},
content: {
fontSize: 20,
},
});
