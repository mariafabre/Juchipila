import firebase from "firebase";
import { TresLechesServices } from "./TresLechesServices";
import { User, Cookbook } from "./TresLechesModels";
import { observable, runInAction } from "mobx";

export class TresLechesSession {
    private static instance: TresLechesSession;
    public db: firebase.database.Database;
    @observable public user: User | undefined;
    public services: TresLechesServices;

    private constructor() {
        this.db = firebase.database();  
        this.services = new TresLechesServices();  
     }

    public static getInstance(): TresLechesSession {
        if (!TresLechesSession.instance) {
            TresLechesSession.instance = new TresLechesSession();
        }
        return TresLechesSession.instance;
    }

    public async signInUser(email: string, password: string): Promise<void> {
        try {
            const user = await this.services.signInUser(email, password);
            runInAction(() => this.user = user);
        } catch (error) {
            throw error;
        }
    }

    public async registerUser(email: string, password: string): Promise<void> {
        try {
            const user = await this.services.registerUser(email, password);
            runInAction(() => this.user = user);
        } catch (error) {
            throw error;
        }
    }

    public addNewCookbook(cookbook: Cookbook): Promise<Cookbook> {
        return this.user ? this.services.addNewCookbook(cookbook, this.user) : Promise.reject("User is not defined");
    }

    public updateCookbook(cookbook: Cookbook): Promise<Cookbook> {
        return this.services.updateCookbook(cookbook);
    }

    public async fetchUserCookbooks(): Promise<Cookbook[]> {
        let cookbooks: Cookbook[] = [];
        if (this.user) {
            for (let id of this.user.cookbooksIds) {
                cookbooks.push(await this.services.fetchCookbook(id));
            }
        }
    return cookbooks; 
    }
}