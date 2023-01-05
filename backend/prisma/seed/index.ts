// dummy data
import { getDummyPost } from "./dummy";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.post.createMany({
    skipDuplicates: true,
    data: getDummyPost(),
  });

  console.log("생성된 게시글 개수 : ", alice.count);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
