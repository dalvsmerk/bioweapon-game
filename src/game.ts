import * as T from 'three';
import { DemoScene } from './demo';

export class Game {
    renderer: T.Renderer;

    public constructor() {
        this.renderer = new T.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        document.body.appendChild(this.renderer.domElement);
    }

    public async start(): Promise<void> {
        const demoScene = new DemoScene();
        const [scene, camera] = await demoScene.load();
        const self = this;

        function animate() {
            requestAnimationFrame(animate);

            self.renderer.render(scene, camera);
            demoScene.update();
        }

        animate();
    }
}
