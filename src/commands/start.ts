import { Listr } from 'listr2';
import { identifyArchitectureAndApplyDns } from '../dnsmasq';
import { pullImage } from '../docker/pullImage';
import { proxyConfig } from '../docker/config/proxy';
import { createContainer } from '../docker/createContainer';
import { startDockerContainer } from '../docker/startContainer';

export const start = async () => {
  new Listr(
    [
      {
        title: 'Setting up docker image and dns masq',
        task: async (ctx, task) =>
          task.newListr([
            {
              title: 'Apply dns masq',
              task: async () => await identifyArchitectureAndApplyDns(),
            },
            {
              task: async () => {
                await pullImage(proxyConfig.Image);
                await createContainer(proxyConfig);
                await startDockerContainer(proxyConfig.name);
              },
            },
          ]),
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
