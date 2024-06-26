import EventEmitter from "@/share/classes/EventEmitter";

type EventMap = Record<string, any>;
type EventKey<T extends EventMap> = string & keyof T;
type EventReceiver<T> = (params: T) => void;

interface Emitter<T extends EventMap> {
  on<K extends EventKey<T>>(eventName: K, listener: EventReceiver<T[K]>): void;
  off<K extends EventKey<T>>(eventName: K, listener: EventReceiver<T[K]>): void;
  emit<K extends EventKey<T>>(eventName: K, params: T[K]): void;
}

export default class Evented<T extends EventMap> implements Emitter<T> {
  private emitter = new EventEmitter();
  on<K extends EventKey<T>>(eventName: K, listener: EventReceiver<T[K]>) {
    this.emitter.on(eventName, listener);
  }
  off<K extends EventKey<T>>(eventName: K, listener: EventReceiver<T[K]>) {
    this.emitter.off(eventName, listener);
  }
  emit<K extends EventKey<T>>(eventName: K, params: T[K]) {
    this.emitter.emit(eventName, params);
  }
}
