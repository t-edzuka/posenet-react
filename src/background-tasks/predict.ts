import {SinglePersonInterfaceConfig, load, PoseNet, Pose} from "@tensorflow-models/posenet";

// const imageScaleFactor = 0.50;
// const outputStride = 16;

async function loadModel(): Promise<PoseNet> {
    const model = await load();
    return model
}


const singlePersonConfig: SinglePersonInterfaceConfig = {flipHorizontal: false}

async function predict(image: HTMLImageElement | null, model: PoseNet): Promise<Pose | undefined> {
    const pose = await model.estimateSinglePose(image as HTMLImageElement, singlePersonConfig);
    return pose
}

async function predictMulti(image: HTMLImageElement | null, model: PoseNet): Promise<Pose[] | undefined> {
    const poses = await model.estimateMultiplePoses(image as HTMLImageElement, singlePersonConfig);
    return poses
}

export {predict, predictMulti, loadModel};





