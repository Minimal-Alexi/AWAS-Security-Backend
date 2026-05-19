import createToken from "../utils/createToken";
export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    valuation: number;
    admin: boolean;
    password: string;


    constructor(id: number, firstName: string, lastName:string, email: string, password: string, valuation: number, admin: boolean) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.valuation = valuation;
        this.admin = admin;
    }

    toJSON() {
        return {
            session_id: createToken(this.id),
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        };
    }
}


