import { useEffect, useRef } from "react";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, SceneLoader, Color4, Ray, PointerEventTypes, Quaternion } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "@babylonjs/loaders/glTF/2.0/glTFLoader";

function GLBLoader({ modelPath, modelName, imageType, modelSize, positionAspect }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        // create a BabylonJS engine
        const canvas = canvasRef.current;
        const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

        // create a scene
        const scene = new Scene(engine);
        scene.clearColor = new Color4(0, 0, 0, 0);
        let mesh;
        // // load the GLB file
        SceneLoader.ImportMesh("", modelPath, modelName, scene, function (meshes) {
            // position and scale the mesh
            mesh = meshes[0];
            const scaleSize = modelSize ? modelSize : 10;
            const posit = positionAspect ? positionAspect : { x: -1, y: 0, z: -2.5 };
            mesh.position = new Vector3(posit.x, posit.y, posit.z);
            mesh.scaling = new Vector3(scaleSize, scaleSize, scaleSize);
            mesh.rotation = new Vector3(-0.5, 1.5, 0);
            mesh.setPivotPoint(new Vector3(0, 1, 0));

            // create a camera and light
            const camera = new ArcRotateCamera("camera", 0, 0.8, 2, new Vector3(0, 10, 0), scene);
            camera.attachControl(canvas, true);
            const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
            // start the scene
            let rotationDirection = 1;
            engine.runRenderLoop(function () {
                mesh.rotation.x += 0.0006 * rotationDirection;

                if (mesh.rotation.x >= -0.5) {
                    rotationDirection = -1;
                } else if (mesh.rotation.x <= -0.7) {
                    rotationDirection = 1;
                }
                scene.render();
            });
        });

        // enable BabylonJS inspector
        // if (process.env.NODE_ENV === "development") {
        //     scene.debugLayer.show();
        // }

        // We need this to find the postion on x,y,z axis ---------- NOTE: THIS IS FOR XYZ AXIS Detection
        // scene.onPointerObservable.add((pointerInfo) => {
        //     if (pointerInfo.type === PointerEventTypes.POINTERMOVE) {
        //         const pickInfo = scene.pick(pointerInfo.event.clientX, pointerInfo.event.clientY);
        //         if (pickInfo.hit && mesh) {
        //             mesh.position.x = pickInfo.pickedPoint.x;
        //             mesh.position.z = pickInfo.pickedPoint.z;
        //         }
        //     }
        // });

        // handle cursor movement & model movement ---------- NOTE: THIS IS FOR MODEL MOVEMENT
        // scene.onPointerObservable.add((pointerInfo) => {
        //     if (pointerInfo.type === PointerEventTypes.POINTERMOVE) {
        //         const pickInfo = scene.pick(pointerInfo.event.clientX, pointerInfo.event.clientY);
        //         if (pickInfo.hit && mesh) {
        //             const target = pickInfo.pickedPoint;
        //             const lookAtVector = target.subtract(mesh.position);
        //             lookAtVector.y = 0;
        //             const direction = Vector3.Normalize(lookAtVector);
        //             const axis = Vector3.Cross(Vector3.Forward(), direction);
        //             const angle = Math.acos(Vector3.Dot(Vector3.Forward(), direction));
        //             mesh.rotationQuaternion = Quaternion.RotationAxis(axis, angle);
        //         }
        //     }
        // });


        // handle window resize
        window.addEventListener("resize", function () {
            engine.resize();
        });

        // cleanup function
        return function cleanup() {
            window.removeEventListener("resize", function () {
                engine.resize();
            });
            engine.dispose();
        };
    }, []);

    return (
        <div className="h-auto w-full flex justify-start items-center">
            <canvas ref={canvasRef} className={`h-auto bg-transparent ${imageType ? imageType : 'w-1/2 rounded-xl'}`}></canvas>
        </div>
    );
}

export default GLBLoader;
