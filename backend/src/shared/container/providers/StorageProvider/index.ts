import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disk: DiskStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'DiskStorageProvider',
  providers.disk,
);
