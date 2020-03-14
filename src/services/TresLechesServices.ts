import firebase from "firebase";
import { Cookbook, User } from "./TresLechesModels";

export class TresLechesServices {
    private db: firebase.database.Database;
    private user: User | undefined;
    private userId: string = "";

    private readonly cookbookRef: string = "cookbooks";
    private readonly usersRef: string = "users/";

    constructor() {
        this.db = firebase.database();        
    }

    async registerUser(email: string, password: string) {
        let userAuth = await firebase.auth().createUserWithEmailAndPassword(email, password);
        this.user = {userAuth: userAuth, cookbooksIds: []}
        this.userId = userAuth.user?.uid || "";
        this.db.ref(this.usersRef + this.userId).set({username: email});
    }

    async openUser(email: string, password: string) {
        let userAuth = await firebase.auth().signInWithEmailAndPassword(email, password);
        this.user = {userAuth: userAuth, cookbooksIds: []}
        this.userId = userAuth.user?.uid || "";
        this.db.ref(this.usersRef + this.userId).once("value").then((snapshot: firebase.database.DataSnapshot) => {
            let cookbooksIds = snapshot.val().cookbooksIds;
            if (this.user && cookbooksIds) {
                this.user.cookbooksIds = cookbooksIds;
            }            
        });
    }

    addNewCookbook(cookbook: Cookbook): Promise<Cookbook> {
        let cookbookKey = this.db.ref(this.cookbookRef).push({...cookbook}).key;
        cookbookKey && this.user && this.user.cookbooksIds.push(cookbookKey);
        return this.db.ref(this.usersRef + this.userId).update({cookbooksIds: this.user?.cookbooksIds}).then(() => cookbook);      
    }
}