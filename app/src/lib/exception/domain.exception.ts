export class DomainException extends Error {
    constructor(message?: string) {
        super(message);

        super.name = "Domain Exception";
    }
}
