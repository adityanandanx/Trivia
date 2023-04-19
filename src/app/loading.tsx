"use client";
import Spinner from "@/components/ui/Spinner";
import { shuffle } from "@/lib/utils";
import { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = ({}) => {
    const loadingPhrases = [
        "Painting a masterpiece",
        "Brewing a fresh pot of coffee",
        "Sharpening a set of knives",
        "Assembling a jigsaw puzzle",
        "Planting a vegetable garden",
        "Tuning a guitar",
        "Organizing a closet",
        "Building a sandcastle",
        "Folding a stack of laundry",
        "Mixing a cocktail",
    ];

    return (
        <div className="flex flex-col items-center gap-3">
            {shuffle(loadingPhrases)[0]} <Spinner />
        </div>
    );
};

export default Loading;
