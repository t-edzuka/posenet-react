import React from 'react';
import Webcam from "react-webcam";
import {Pose, PoseNet} from "@tensorflow-models/posenet";
import "@tensorflow/tfjs-backend-webgl"; // sample codeにはのっていないが必要 !!
import {loadModel, predictMulti} from "../background-tasks/predict";
import {DisplayPoseData} from "./DisplayPoseData";
import {LoadModelButton} from "./LoadModelButton";
import useInterval from "@use-it/interval";

const videoConstraints = {
    width: 480,
    height: 640,
}

const WebcamPose: React.FC = () => {
    const webcamRef = React.useRef<Webcam | null>(null);
    const imageRef = React.useRef<HTMLImageElement | null>(null);
    const [base64Url, setBase64Url] = React.useState<string>('');

    const [model, setModel] = React.useState<PoseNet | null>(null);
    const [poses, setPrediction] = React.useState<Pose[] | null>(null);

    const capture = React.useCallback(
        () => {
            const imgSrc = webcamRef.current?.getScreenshot() ?? "";
            setBase64Url(imgSrc);
        },
        [webcamRef]
    );

    const getEstimation = React.useCallback(async function () {
            const imageHTMLElement = imageRef.current;
            if (model) {
                const poses = await predictMulti(imageHTMLElement, model);
                setPrediction(poses || null);
            }
        },
        [imageRef, model]);

    async function _setModel() {
        model?.dispose();
        const _model = await loadModel();
        setModel(_model);
        console.log("Model loaded");
    }

    // 初回レンダリング時, modelを読み込む
    React.useEffect(() => {
        _setModel();
    }, []);

    // Every ms, capture data and estimate !
    useInterval(capture, 2000);

    //  POST data to local server received by fastAPI server app.
    // useInterval(async () => {
    //      const res = await ky.post('http://0.0.0.0:8081/poses/',
    //          {json: {message: poses}, retry:{ limit: 10,
    //                  methods: ['post'],
    //                  statusCodes: [503],},
    //              mode: 'cors',
    //              timeout:  20000
    //      });
    //  }, 2000);


    return (
        <>
            <h1>Pose Estimation by PoseNet</h1>
            <h2>This model can detect multiple human poses at the same time.</h2>
            <Webcam
                videoConstraints={videoConstraints}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                crossOrigin={"anonymous"}
            />


            <br/>

            <LoadModelButton model={model} setFn={_setModel}>
                Reload Model
            </LoadModelButton>


            <button onClick={capture}>Capture & Estimation</button>
            <br/>
            <DisplayPoseData poses={poses}>
                Estimation result
            </ DisplayPoseData>

            <img src={base64Url} crossOrigin={"anonymous"} ref={imageRef} alt={'captured'}
                 onLoad={async () => await getEstimation()}/>


        </>

    );
}

export {WebcamPose};