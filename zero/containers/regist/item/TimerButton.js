/**
 * Created by zerowolf on 2018/4/3.
 */
import React,{Component} from 'react';
import PropTypes from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
export default class TimerButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount || 90,
            timerTitle: this.props.timerTitle || '获取验证码',
            counting: false,
            selfEnable: true,
        };
        this._shouldStartCountting = this._shouldStartCountting.bind(this)
        this._countDownAction = this._countDownAction.bind(this)
    }


    _countDownAction(){
        const codeTime = this.state.timerCount;
        this.interval = setInterval(() =>{
            const timer = this.state.timerCount - 1;
            console.log('timer'+timer);

            if(timer===0){
                this.interval&&clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                    timerTitle: this.props.timerTitle || '获取验证码',
                    counting: false,
                    selfEnable: true
                })
            }else{
                console.log("---- timer ",timer);
                this.setState({
                    timerCount:timer,
                    timerTitle: `重新获取(${timer}s)`,
                })
            }
        },1000)
    }
    _shouldStartCountting(shouldStart){
        if (this.state.counting) {return}
        if (shouldStart) {
            this._countDownAction()
            this.setState({counting: true,selfEnable:false})
        }else{
            this.setState({selfEnable:true})
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    render(){
        const {onClick,textStyle,enable,disableColor} = this.props
        const {counting,timerTitle,selfEnable} = this.state
        return (
            <TouchableOpacity activeOpacity={counting ? 1 : 0.8} onPress={()=>{
                if (!counting && enable && selfEnable) {
                    this.setState({selfEnable:false})
                    onClick(this._shouldStartCountting)
                };
            }}>
                <View style={{width:100, height:44,flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={[{fontSize: 16},textStyle,{color: ((!counting && enable && selfEnable) ? textStyle.color : disableColor || 'gray')}]}>{timerTitle}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
TimerButton.propTypes = {
    // style: PropTypes.object,
    // textStyle: Text.propTypes.style,
    // onClick: PropTypes.func,
    // disableColor: PropTypes.string,
    // timerTitle: PropTypes.string,
    // enable: PropTypes.oneOfType([PropTypes.bool,PropTypes.number])
    // enable: PropTypes.bool
};