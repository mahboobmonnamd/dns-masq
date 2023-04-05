import Docker from 'dockerode';
import { Listr } from 'listr2';
import { getContainer } from './util';

const docker = Docker();

export const startDockerContainer = async (name: string) => {
  await new Listr(
    [
      {
        title: 'Check container exists',
        task: async (ctx) => {
          const container = await getContainer(name);
          if (!container) {
            ctx.skip = true;
            throw Error('Container does not exist');
          }
          if (container.State === 'running') {
            ctx.skip = true;
            return 'Container already running';
          }
          ctx.skip = false;
          return ctx;
        },
      },
      {
        title: `Starting ${name}`,
        skip: (ctx) => ctx.skip,
        task: async () => {
          try {
            const { Id: id } = await getContainer(name);
            await docker.getContainer(id).start();
          } catch (error: any) {
            const match = error.json.message.match(
              /Bind for 0\.0\.0\.0:(\d+): unexpected error \(Failure EADDRINUSE\)/,
            );
            if (match) throw new Error(`Port ${match[1]} is already in use.`);
            throw error;
          }
        },
      },
    ],
    {
      concurrent: false,
      rendererOptions: {
        showSubtasks: true,
        collapse: false,
      },
    },
  ).run();
};
