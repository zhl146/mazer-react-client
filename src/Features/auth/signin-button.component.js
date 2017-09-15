import React, { Component } from 'react';
import MyFireBase from '../../Utils/AuthUtil';

import { ButtonTemplate } from '../../Utils/Components/ButtonTempate.component';

export class SignInButton extends Component{

  componentDidMount(){
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
    let buttonText = (this.props.user? "Logout":"Login");
    return (
        <ButtonTemplate
            clickHandler={
              () => {
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
    );
  }
}

// TODO: move all of this call logic into actions, components shouldn't deal with implementation