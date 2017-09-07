import React, { Component } from 'react';
import ButtonTemplate from '../../Utils/Components/ButtonTempate.component';
import MyFireBase from '../../Utils/AuthUtil';

class AuthComponent extends Component{

    componentWillMount(){
        MyFireBase.auth().getRedirectResult().then( (result) => {
            if(result.credential){
                this.props.setAuthProfile(result.credential.accessToken, result.user);
            }
        }).catch(
            (err) => {
                this.props.authError(err);
            }
        );
    }

    render(){
        console.log(this.props);
        let buttonText = (this.props.user? "Logout":"Login");
        console.log("ButtonText: "+buttonText);
        return (
            <ButtonTemplate
                OnClick={
                    () => {
                        console.log(this.props);
                        if(!this.props.user) {
                            console.log(MyFireBase.auth);
                            MyFireBase.auth().signInWithPopup(new MyFireBase.auth.GoogleAuthProvider()).then(
                                (result) => {
                                    this.props.setAuthProfile(result.credential, result.user);
                                }
                            ).catch(
                                (error) => {
                                    this.props.authError(error);
                                }
                            );
                        }else{
                            MyFireBase.auth().signOut().then(
                                () => { this.props.setAuthProfile(null, null); }
                            ).catch( (error) => {
                                this.props.authError(error);
                            });
                        }
                    }
                }
                text={buttonText} cssAttributes="btn-generic"/>
        )
    }
}

export default AuthComponent;




