import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager: UserManager;
  user:any;

  constructor() { 
    this.manager = new UserManager(getClientSettings());
  }

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }


  startAuthentication=()=>{   
    return this.manager.signinRedirect();
  } 

  isLoggedIn(){
    let x = sessionStorage.getItem(environment.sessionStorage);
    if(x != null){
      return this.user != null;
    }
    else{
      return false;
    }
  }

  completeAuthentication(){
    return this.manager.signinRedirectCallback()
    .then(user => {
      this.user = user;
      this.setToken(this.user.access_token);
      this.setRefreshToken(this.user.refresh_token);
      return user;
    })    
  }

  setRefreshToken(token:string){
    sessionStorage.setItem('refreshToken', token);
  }

  setToken(token:string){
    sessionStorage.setItem('token', token);
    return;
  }

  refreshToken(){
    return this.manager.signinSilent()
      .then(user => {
        return user.access_token
    });
  }

  startLogOut(): Promise<void> {
    return this.manager.signoutRedirect();
  }
  
  completeSignOut(): Promise<void> {
    sessionStorage.removeItem(environment.sessionStorage) // <-------- change according to ENVIRONMENT
    sessionStorage.removeItem('token');
    return this.manager.signoutRedirectCallback().then(this.manager.removeUser);
  }

}

export function getClientSettings(): UserManagerSettings {
  return {
      //Identity Server host
      authority: 'https://localhost:5001',
      client_id: environment.clientId,
      client_secret:environment.client_secret,
      redirect_uri: environment.redirectUri,
      response_type:"code",
      scope:"openid profile api1 role offline_access",
      // filterProtocolClaims: true,
      // loadUserInfo: true,
      userStore: new WebStorageStateStore({ store: window.sessionStorage })
};
}
