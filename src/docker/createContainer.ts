import Docker from 'dockerode';
import { Listr } from 'listr2';
import { getContainer } from './util';

const docker = new Docker();

export const createContainer = async (containerConfig) => {
  await new Listr(
    [
      {
        title: 'Check container exists',
        task: async (ctx) => {
          try {
            const container = await getContainer(containerConfig.name);
            if (container) ctx.skip = true;
          } catch (error: any) {
            if (error.code === 'ECONNREFUSED')
              throw new Error('Can not connect docker. Is docker running?');
            throw error;
          }
        },
      },
      {
        title: `Creating ${containerConfig.name}`,
        skip: (ctx): boolean => ctx.skip,
        task: () => docker.createContainer(containerConfig),
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
