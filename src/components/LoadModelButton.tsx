import React from "react";
import {PoseNet} from "@tensorflow-models/posenet";
/**
* ### ボタン押下によりモデルを読み込むコンポーネント, modelと読み込みのための関数を渡す.
* モデル読み込む実装はここにはない. モデルの読み込み実装は ../background-task を参照
*/

type Props = {
    children?: React.ReactNode;
    model: PoseNet | null | undefined;
    setFn: () => void;
}

export const LoadModelButton: React.FC<Props> = function (props: Props) {
    const {children, model, setFn} = props;
    return (
        <>
            <button onClick={() => setFn()}>
                {children}
            </button>
            <p>{model ? "Model is ready" : "Model is not ready."}</p>
        </>
    );
}
