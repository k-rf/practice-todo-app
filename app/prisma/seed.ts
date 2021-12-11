import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    if ((await prisma.todoStatus.count()) !== 0) {
        return;
    }

    await prisma.todoStatus.createMany({
        data: [
            {
                name: "DONE",
            },
            {
                name: "PENDING",
            },
        ],
    });
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
