import * as T from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Core } from '../core';

export class DemoModelScene implements Core.Scene {
    scene: T.Scene;
    camera: T.PerspectiveCamera;
    controls: OrbitControls;
    modelName: string;
    model?: GLTF;

    public constructor(modelName: string, renderer: T.Renderer) {
        this.modelName = modelName;
        this.scene = new T.Scene();
        this.scene.background = new T.Color(0xeeeeee);

        this.camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(3, 5, 0);
        this.camera.lookAt(0, 5, 0);

        this.controls = new OrbitControls(this.camera, renderer.domElement);
    }

    public async load(): Promise<void> {
        const modelLoader = new GLTFLoader();

        const onLoad = (gltf: GLTF) => {
            this.model = gltf;

            this.scene.add(gltf.scene);
        };

        const onProgress = console.info;
        const onError = console.error;

        modelLoader.load(`/models/${this.modelName}/scene.gltf`, onLoad, onProgress, onError);
    }

    public render(renderer: T.Renderer) {
        renderer.render(this.scene, this.camera);
    }

    public update(): void {
        this.controls.update();
    }

    public dispose(): void {
        if (this.model) {
            this.scene.remove(this.model.scene);
        }
    }
}
