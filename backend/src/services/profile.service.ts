import { Injectable } from "@nestjs/common";

@Injectable()

export class ProfileService {

    profile() {
        return {
            fullname: "Matheus Henrique Michels Chiapetti",
            username: "mhchiapetti",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus repellendus at in dolorem ad nemo, cupiditate earum modi facere molestias quasi vero accusantium quaerat dolore ducimus nobis eaque quo tempora.",
            createdAt: "2022-08-13"
        }

    }

}