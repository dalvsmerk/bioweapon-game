import * as T from 'three';

import { Core } from '../core';

export class DemoScene implements Core.Scene {
    scene: T.Scene;
    camera: T.PerspectiveCamera;
    light: T.Light;
    cameraPivot: T.Object3D;
    angle: number;
    
    public constructor() {
        this.scene = new T.Scene();
        this.camera = new T.PerspectiveCamera(300, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.cameraPivot = new T.Object3D();
        this.light = new T.PointLight(0xffffff, 0.5, 1000);
        this.angle = 0;
    }

    public async load(): Promise<void> {
        const sphereGeometry = new T.SphereGeometry(0.05);
        const sphereMaterial = new T.MeshPhongMaterial({ color: 0xffff00 });
        const sphere = new T.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(0, -2.5, 0);
        this.scene.add(sphere);

        this.light.position.set(2, -2, 0);
        this.scene.add(this.light);

        const light2 = new T.PointLight(0xffffff, 0.5, 1000);
        light2.position.set(-2, -2, 0);
        this.scene.add(light2);

        const geometry = new T.BoxGeometry(1, 1, 1);
        const material = new T.MeshPhongMaterial({ color: 0x00ff00 });
        const cube = new T.Mesh(geometry, material);
        this.scene.add(cube);

        const planeGeometry = new T.PlaneGeometry(5, 5);
        const planeMaterial = new T.MeshLambertMaterial({ color: 0xffffff, side: T.DoubleSide });
        const plane = new T.Mesh(planeGeometry, planeMaterial);

        this.scene.add(plane);

        plane.position.set(0, 0.5, 0);
        plane.rotation.x = Math.PI / 2;

        this.scene.add(this.cameraPivot);
        this.cameraPivot.add(this.camera);
        cube.position.set(0, 0, 0);

        this.camera.position.set(5, -3, 0);
        this.camera.lookAt(this.cameraPivot.position);
    }

    public render(renderer: T.Renderer) {
        renderer.render(this.scene, this.camera);
    }

    public update(): void {
        const r = 4;
        
        this.light.position.x = r * Math.cos(this.angle);
        this.light.position.z = r * Math.sin(this.angle);

        this.angle += 0.05;

        const Y_AXIS = new T.Vector3(0, 1, 0);
        
        this.cameraPivot.rotateOnAxis(Y_AXIS, 0.005);
    }

    public dispose(): void {
        // TODO: Dispose all the 3D objects, disposed some for an example
        this.light.dispose();
    }
}
