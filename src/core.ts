import * as T from 'three';

export namespace Core {
    interface SceneLoadable {
        load(): Promise<void>;
    }

    interface Updatable {
        update(): void;
    }

    interface Disposable {
        dispose(): void;
    }

    interface OptionablyRenderable {
        // Should be implemented only by root scenes
        render?(renderer: T.Renderer): void;
    }

    export interface Scene extends SceneLoadable, Updatable, Disposable, OptionablyRenderable {
        scene: T.Scene;
        camera: T.Camera;
    }

    type SceneKey = string;
    type SceneCreator = () => Scene;
    type SceneMapping = Record<SceneKey, SceneCreator>;

    export class SceneManager {
        protected renderer: T.Renderer;
        protected sceneMapping: SceneMapping;
        protected currentScene?: Scene;

        public constructor(renderer: T.Renderer, mapping: SceneMapping) {
            this.renderer = renderer;
            this.sceneMapping = mapping;
        }

        public async loadScene(key: SceneKey): Promise<void> {
            this.dispose();

            const createScene = this.sceneMapping[key];

            if (!createScene) {
                throw new Error(`Scene with key "${key}" was not defined`);
            }

            this.currentScene = createScene();
            
            await this.currentScene.load();
        }

        public update(): void {
            this.currentScene?.update();
        }

        public render(renderer: T.Renderer): void {
            if (this.currentScene?.render) {
                this.currentScene?.render(renderer);
            }
        }

        public dispose(): void {
            this.currentScene?.dispose();
        }
    }
}
