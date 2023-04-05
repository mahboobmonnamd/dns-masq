import Docker from 'dockerode';
import { Listr } from 'listr2';
import { Transform } from 'stream';
import { getImage } from './util';

const docker = new Docker();

const dockerPullStreamTransformer = () =>
  new Transform({
    objectMode: true,
    transform: (chunk, encoding, callback) => {
      try {
        // The chuck is one or more lines of JSON objects
        // Parse only the last line in the chunk
        const lines = chunk
          .toString()
          .split(/[\r\n]+/g)
          .filter((l) => !!l);
        const { id, status, progress = '' } = JSON.parse(lines[lines.length - 1]);

        callback(null, `${id}: ${status} ${progress}`);
      } catch (err) {
        // Return an empty string if the line received is not JSON
        callback(null, '');
      }
    },
  });

export const pullImage = async (image: string) => {
  await new Listr(
    [
      {
        title: 'validate image exsits',
        task: async (ctx) => {
          try {
            const existingImage = await getImage(image);
            if (existingImage) ctx.skip = true;
          } catch (error: any) {
            if (error.code === 'ECONNREFUSED')
              throw new Error('Can not connect docker. Is docker running?');
            throw error;
          }
        },
      },
      {
        title: `Pulling ${image}`,
        skip: (ctx) => ctx.skip,
        task: async () => {
          try {
            const stream = await docker.pull(image);
            return stream.pipe(dockerPullStreamTransformer());
          } catch (error: any) {
            if (error.code === 'ECONNREFUSED')
              throw new Error('Can not connect docker. Is docker running?');
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
