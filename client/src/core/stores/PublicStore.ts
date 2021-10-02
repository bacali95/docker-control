import { RootStore } from './RootStore';

export class PublicStore {
  constructor(private readonly rootStore: RootStore) {}
}
