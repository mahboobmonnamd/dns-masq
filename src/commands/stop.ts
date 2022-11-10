import { Listr } from 'listr2';
import { proxyConfig } from '../docker/config/proxy';
import { stopDockerContainer } from '../docker/stopContainer';

export const stop = async () => {
  const tasks = new Listr(
    [
      {
        title: 'Stopping proxy containers',
        task: async (ctx, task) => {
          stopDockerContainer(proxyConfig.name);
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
