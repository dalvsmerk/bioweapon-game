import * as T from 'three';

export class Game {
    public start() {
        const scene = new T.Scene();
        const camera = new T.PerspectiveCamera(75, window.innerWidth / window.innerWidth, 0.1, 1000);

        const renderer = new T.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const geometry = new T.BoxGeometry();
        const material = new T.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new T.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        }

        animate();
    }
}
