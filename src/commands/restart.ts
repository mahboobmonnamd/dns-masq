import { Listr } from 'listr2';
import { proxyConfig } from '../docker/config/proxy';
import { createContainer } from '../docker/createContainer';
import { startDockerContainer } from '../docker/startContainer';
import { stopDockerContainer } from '../docker/stopContainer';
import { start } from './start';

export const restart = async () => {
  await new Listr([
    {
      title: 'Restart Proxy',
      task: async () => {
        await stopDockerContainer(proxyConfig.name);
        await start();
        // await createContainer(proxyConfig);
        // await startDockerContainer(proxyConfig.name);
      },
    },
  ]).run();
};
