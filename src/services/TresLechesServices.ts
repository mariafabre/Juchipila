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
        let snapshot = await firebase.database().ref(this.usersRef + userId).once("value");
        let cookbooksIds = snapshot.val().cookbooksIds;
            if (user && cookbooksIds) {
                user.cookbooksIds = cookbooksIds;
            } 
        return user;
    }

    addNewCookbook(cookbook: Cookbook, user: User): Promise<Cookbook> {
        let db = firebase.database();
        let userId = user.userAuth.user?.uid || "";
        let cookbookKey = db.ref(this.cookbookRef).push({...cookbook}).key;
        cookbook.id = cookbookKey || cookbook.id;
        cookbookKey && user && user.cookbooksIds.push(cookbookKey);
        return db.ref(this.usersRef + userId).update({cookbooksIds: user.cookbooksIds}).then(() => cookbook);      
    }

    updateCookbook(cookbook: Cookbook): Promise<Cookbook> {
        let db = firebase.database();
        return db.ref(this.cookbookRef).child(cookbook.id).set({...cookbook}).then(() => cookbook);
    }

    async fetchCookbook(id: string): Promise<Cookbook> {
        let db = firebase.database();
        let cookbookSnapshot = await db.ref(this.cookbookRef).child(id).once("value");
        return {...cookbookSnapshot.val(), id: id} as Cookbook;
    }
}