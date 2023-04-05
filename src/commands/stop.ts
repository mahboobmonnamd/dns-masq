import { Listr } from 'listr2';
import { proxyConfig } from '../docker/config/proxy';
import { stopDockerContainer } from '../docker/stopContainer';

export const stop = async () => {
  new Listr(
    [
      {
        title: 'Restart proxy',
        task: async () => {
          await stopDockerContainer(proxyConfig.name);
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
