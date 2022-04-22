import * as T from 'three';
import { Core } from './core';
import { DemoScene } from './scenes/demo';

export class Game {
    renderer: T.Renderer;
    sceneManager: Core.SceneManager;

    public constructor() {
        this.renderer = new T.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        document.body.appendChild(this.renderer.domElement);

        this.sceneManager = new Core.SceneManager(this.renderer, {
            'demo': () => new DemoScene(),
            'demo1': () => new DemoScene(),
            'demo2': () => new DemoScene(),
            'demo3': () => new DemoScene(),
            'demo4': () => new DemoScene(),
        });
    }

    public async start(): Promise<void> {
        const self = this;

        await this.sceneManager.loadScene('demo');

        window.addEventListener('click', async () => {
            await this.sceneManager.loadScene('demo1');
        });

        function animate() {
            requestAnimationFrame(animate);

            self.sceneManager.render(self.renderer);
            self.sceneManager.update();
        }

        animate();
    }
}
