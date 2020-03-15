import firebase from "firebase";
import { Cookbook, User } from "./TresLechesModels";

export class TresLechesServices { 
    private readonly cookbookRef: string = "cookbooks";
    private readonly usersRef: string = "users/";

    async registerUser(email: string, password: string): Promise<User> {
        let userAuth = await firebase.auth().createUserWithEmailAndPassword(email, password);
        let userId = userAuth.user?.uid || "";
        firebase.database().ref(this.usersRef + userId).set({username: email});
        return {userAuth: userAuth, cookbooksIds: []};
    }

    async signInUser(email: string, password: string): Promise<User> {
        let userAuth = await firebase.auth().signInWithEmailAndPassword(email, password);
        let user = {userAuth: userAuth, cookbooksIds: []}
        let userId = userAuth.user?.uid || "";
        firebase.database().ref(this.usersRef + userId).once("value").then((snapshot: firebase.database.DataSnapshot) => {
            let cookbooksIds = snapshot.val().cookbooksIds;
            if (user && cookbooksIds) {
                user.cookbooksIds = cookbooksIds;
            }            
        });
        return user;
    }

    addNewCookbook(cookbook: Cookbook, user: User): Promise<Cookbook> {
        let db = firebase.database();
        let userId = user.userAuth.user?.uid || "";
        let cookbookKey = db.ref(this.cookbookRef).push({...cookbook}).key;
        cookbookKey && user && user.cookbooksIds.push(cookbookKey);
        return db.ref(this.usersRef + userId).update({cookbooksIds: user.cookbooksIds}).then(() => cookbook);      
    }
}