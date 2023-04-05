import { darwinDnsMasq } from './darwin';

export const identifyArchitectureAndApplyDns = () => {
  switch (process.platform) {
    case 'darwin':
      darwinDnsMasq();
      break;
    default:
      throw new Error(`${process.platform} platform not yet supported`);
  }
};
