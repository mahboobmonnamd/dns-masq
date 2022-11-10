import Docker from 'dockerode';
import { Listr } from 'listr2';
import { getContainer } from './util';

const docker = new Docker();

export const stopDockerContainer = async (name: string) => {
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
        },
      },
      {
        title: `Stopping ${name}`,
        task: async () => {
          const { Id: id, State: state } = await getContainer(name);
          const container = docker.getContainer(id);

          if (state === 'running') await container.stop();
          return container.remove();
        },
      },
    ],
    {
      concurrent: true,
      rendererOptions: { showSubtasks: true, collapse: false },
    },
  ).run();
};
