
export class ErrorMessages {

    static notFoundByIdMessage(resource: string, id: number) {
        return `${resource} with id ${id} was not founded`
    }

    static notFoundByStringMessage(resource: string, property: string, value: string) {
        return `${resource} with ${property} ${value} was not founded`
    }

    static mailAlreadyRegistered(){
        return `mail is already registered`
    }
}