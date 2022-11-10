import { Listr } from "listr2";
import { getContainer } from "./util";
import Docker from "dockerode";

const docker = new Docker();

export const startDockerContainer = async (name: string) => {
  await new Listr(
    [
      {
        title: "Check container exists",
        task: async (ctx) => {
          const container = await getContainer(name);
          if (!container) {
            ctx.skip = true;
            throw Error("Container does not exist");
          }
          if (container.State === "running") {
            ctx.skip = true;
            return "Container already running";
          }
          ctx.skip = false;
        },
      },
      {
        title: `Starting ${name}`,
        skip: (ctx): boolean => ctx.skip,
        task: async () => {
          try {
            const { Id: id } = await getContainer(name);
            await docker.getContainer(id).start();
          } catch (err: any) {
            const match = err.json.message.match(
              /Bind for 0\.0\.0\.0:(\d+): unexpected error \(Failure EADDRINUSE\)/
            );
            if (match) throw new Error(`Port ${match[1]} is already in use.`);
            throw err;
          }
        },
      },
    ],
    {
      concurrent: false,
      rendererOptions: { showSubtasks: true, collapse: false },
    }
  ).run();
};
