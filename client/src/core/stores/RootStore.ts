import { action, autorun, observable } from 'mobx';
import { io, Socket } from 'socket.io-client';
import { PublicStore } from './PublicStore';
import { ToastsStore } from './ToastsStore';
import { TooltipStore } from './TooltipStore';

const updateEvents = [] as const;
type UpdateEvents = typeof updateEvents[number];

type AppLocalCache = {
  darkMode: boolean;
  menuCollapsed: boolean;
  language: 'fr' | 'en';
};

export class RootStore {
  @observable appLocalCache: AppLocalCache = JSON.parse(localStorage.getItem('settings') ?? '{}');

  private _updatesCount: Record<UpdateEvents, number> = {};
  @observable updatesCount: Record<UpdateEvents, number> = {};

  socket: Socket = io(`/ws`, { transports: ['websocket'] });

  publicStore: PublicStore;

  toastsStore: ToastsStore;
  tooltipStore: TooltipStore;

  constructor() {
    this.publicStore = new PublicStore(this);

    this.toastsStore = new ToastsStore();
    this.tooltipStore = new TooltipStore();

    this.initiateWebSocket();

    autorun(() => localStorage.setItem('settings', JSON.stringify(this.appLocalCache)));
  }

  private initiateWebSocket() {
    this.socket.emit('subscribe');
    for (const event of updateEvents) {
      this.socket.on(event, () => {
        this._updatesCount[event]++;
      });
    }
    setInterval(() => {
      for (const event of updateEvents) {
        this.updatesCount[event] = this._updatesCount[event];
      }
    }, 2000);
  }

  @action
  setDarkMode = (darkMode: boolean): void => {
    this.appLocalCache.darkMode = darkMode;
  };

  @action
  setLanguage = (lang: 'fr' | 'en'): void => {
    this.appLocalCache.language = lang;
  };
}

export const rootStore = new RootStore();
