import Spinner from "@/components/ui/Spinner";
import { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
    return (
        <div className="flex items-center gap-3">
            <Spinner />
        </div>
    );
};

export default Loading;
