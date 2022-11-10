import { Listr } from 'listr2';
import { identifyArchitectureAndApplyDns } from '../dnsmasq';
import { proxyConfig } from '../docker/config/proxy';
import { createContainer } from '../docker/createContainer';
import { pullImage } from '../docker/pullImage';
import { startDockerContainer } from '../docker/startContainer';

export const start = async () => {
  const tasks = new Listr(
    [
      {
        title: 'Setting up docker image and dns masq',
        task: async (ctx, task) => {
          return task.newListr([
            {
              title: 'Apply dns masq',
              task: async (ctx, task) => {
                return await identifyArchitectureAndApplyDns();
              },
            },
            {
              //   pull docker image
              task: async () => {
                await pullImage(proxyConfig.Image);
                await createContainer(proxyConfig);
                await startDockerContainer(proxyConfig.name);
              },
            },
          ]);
          // start the container
        },
      },
    ],
    {
      concurrent: true,
      rendererOptions: { showSubtasks: true, collapse: false },
    },
  );

  try {
    const ctx = await tasks.run();
    console.log('🚀 ~ file: start.ts ~ line 39 ~ start ~ ctx', ctx);
  } catch (error) {
    console.log('🚀 ~ file: start.ts ~ line 34 ~ start ~ error', error);
  }
};
