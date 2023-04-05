import { Listr } from 'listr2';
import { proxyConfig } from '../docker/config/proxy';
import { stopDockerContainer } from '../docker/stopContainer';
import { start } from './start';

export const restart = async () => {
  new Listr(
    [
      {
        title: 'Restart proxy',
        task: async () => {
          await stopDockerContainer(proxyConfig.name);
          await start();
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
