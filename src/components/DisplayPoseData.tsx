import React from "react";
import {Pose} from "@tensorflow-models/posenet";

type Props = {
    poses:Pose[] | null | undefined;
}

export const DisplayPoseData:React.FC<Props> = function ({children, poses}) {
    return (
        <>
            <h3>{children}</h3>
            {poses ? poses.map((pose, i) => {
                        return (
                            <>
                                <h3>"Human id": {i}, "Whole Score": {pose.score.toFixed(3)}</h3>
                                <p key={i}>
                                    {
                                        pose.keypoints.map((keypoint, k) => {
                                            return (
                                                <>
                                                    <p>++++++{`part id: ${k}`}</p>
                                                    <p>part: {keypoint.part}</p>
                                                    <p>"part score": {keypoint.score.toFixed(2)}</p>
                                                    <p>x: {keypoint.position.x.toFixed(2)}</p>
                                                    <p>y: {keypoint.position.y.toFixed(2)}</p>
                                                    <p>+++++++++++++++++++++++</p>
                                                </>
                                            )
                                                ;
                                        })
                                    }
                                </p>
                            </>
                        );
                    }
                )

                :
                <div>No Pose</div>
            }

        </>
    );
}

