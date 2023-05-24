//file to encapsulate all models used throughout this application

export interface IUser {
    id: string,
    email: string,
    password: string,
    name: string,
    token: string
}

export interface ILogin {
    email: string,
    password: string
}

export interface IRegister {
    email: string,
    name: string,
    password: string
}


export interface IProducts {
    id: string;
    name: string;
    caption: string;
    description: string;
    image: string;
    history: string;
    historyImage: string;
    price: number;
    stock: number;
    tags: string;
    country: string;
}
export interface IToken {
    token: string;
}
export interface ICart {
    items: number;
    id: string;
    name: string;
    price: number;
    image: string;
}