
export class ErrorMessages {

    static notFoundByIdMessage(resource: string, id: number) {
        return `${resource} with id ${id} was not founded`
    }

    static notFoundByStringMessage(resource: string, property: string, value: string) {
        return `${resource} with ${property} ${value} was not founded`
    }

    static alreadyRegistered(registered: string) {
        return `${registered} is already registered`
    }
}