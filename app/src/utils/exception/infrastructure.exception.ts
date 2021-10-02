export class InfrastructureException extends Error {
    constructor(message?: string) {
        super(message);

        super.name = "Infrastructure Exception";
    }
}
