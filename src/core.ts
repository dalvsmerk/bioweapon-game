import * as T from 'three';

export namespace Core {
    interface SceneLoadable {
        load(): Promise<[T.Scene, T.Camera]>;
    }

    interface Updatable {
        update(): void;
    }

    export interface Scene extends SceneLoadable, Updatable {
        scene: T.Scene;
        camera: T.Camera;
    }
}
