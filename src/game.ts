import * as T from 'three';
import { Core } from './core';
import { DemoScene } from './scenes/demo';
import { DemoModelScene } from './scenes/demo-model';

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
            'mc-cree-model': () => new DemoModelScene('low_poly_mccree', this.renderer),
            'cyberpunk-apt-model': () => new DemoModelScene('cyberpunk_micro-apartments', this.renderer),
        });
    }

    public async start(): Promise<void> {
        const self = this;

        await this.sceneManager.loadScene('cyberpunk-apt-model');

        // window.addEventListener('click', async () => {
        //     await this.sceneManager.loadScene('mc-cree-model');
        // });

        function animate() {
            requestAnimationFrame(animate);

            self.sceneManager.render();
            self.sceneManager.update();
        }

        animate();
    }
}
