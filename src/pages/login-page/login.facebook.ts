import {passport,User} from 'passport';
import {FacebookStrategy,Strategy} from 'passport-facebook';
import * as express from 'express';
class Profile{
    id:string;
    name:string;
    facebookName:string;
}
export class Facebook_Login extends Profile{
        public p=new Profile();
        private clientID="1783031188633144";
        private clienSecret="205654eec1f952b538f7d7a493751370";
        private callbackURL="http://localhost:8100/auth/facebook/callback";
    GetProfile(){
            passport.use(new FacebookStrategy({
            clientID: this.clientID,
            clientSecret: this.clienSecret,
            callbackURL: this.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            User.find({'ID':profile.id}, function(err, user) {
            if (err) { return done(err); }
            else{
                console.log(user);
                debugger;
            }
            });
        }
        )); 
    }
}