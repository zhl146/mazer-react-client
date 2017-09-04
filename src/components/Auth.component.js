import React, { Component } from 'react';
import ButtonTemplate from '../Utils/Components/ButtonTempate.component';

class AuthComponent extends Component{
    constructor(props){
        super(props);
        if(!props.profile && props.hash && props.id_token){
            props.setAuthHash(props.hash, props.id_token);
        }
    }

    OnClickHandler(){
        if(!this.props.profile){
            return () => {
                this.props.lock.magiclink();
                this.props.lock.emailcode( (error, profile, id_token, access_token, state, refresh_token) => {
                    if(!error){
                        this.props.setAuthProfile(profile);
                    }
                    else{
                        this.props.authError(error);
                    }
                });
            }
        }
        else{
            return () => {
                this.props.lock.logout();
            }
        }
    }



    render(){
        console.log(this.props);
        let buttonText = (this.props.profile? "Logout":"Login");
        console.log("ButtonText: "+buttonText);
        return (
            <ButtonTemplate
                OnClick={
                    function() {
                        console.log(this.props);
                        if(!this.props.profile) {
                            this.props.lock.magiclink();
                            this.props.lock.emailcode((error, profile, id_token, access_token, state, refresh_token) => {
                                if (!error) {
                                    this.props.setAuthProfile(profile);
                                }
                                else {
                                    this.props.authError(error);
                                }
                            });
                            console.log('done altering lock, should see pop-up');
                        }else{
                            this.props.lock.logout();
                        }
                    }.bind({props: this.props})
                }
                text={buttonText} cssAttributes="btn-generic"/>
        )
    }
}

export default AuthComponent;




