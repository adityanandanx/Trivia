"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { MdSettings } from "react-icons/md";
import { useEffect, useState } from "react";
import Settings from "@/components/ui/Settings";
import { getCategories } from "@/lib/utils";
import { Category } from "@/lib/types";
import Image from "next/image";

export default function Home() {
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [highestScore, setHighestScore] = useState<string | null>(null);

    useEffect(() => {
        getCategories().then((cats) => {
            setCategories(cats);
        });
        const stored = localStorage.getItem("highestScore");
        if (stored) {
            setHighestScore(stored);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-7xl font-black">Trivia</h1>

            {/* highest score is like "5/10" so excluding "0/10" */}
            {/* {highestScore && highestScore[0] !== "0" ? (
                <h3 className="flex gap-2 opacity-50 text-sm">
                    Highest Score:
                    <span>{highestScore}</span>
                </h3>
            ) : null} */}
            <Link
                href="/random-question"
                autoFocus
                className="outline-none fixed inset-0"
            ></Link>
            <Button
                variant="secondary"
                brightness="dim"
                className="px-10 pointer-events-none"
            >
                Tap anywhere to start
            </Button>
            <div className="absolute top-0 right-0 flex items-center justify-center m-3 gap-3">
                <Button
                    onClick={() => setSettingsOpen(true)}
                    variant="secondary"
                    brightness="dim"
                    className="text-3xl p-2"
                >
                    <MdSettings />
                </Button>
                <Link
                    href="https://github.com/iMADi-ARCH/Trivia"
                    target="_blank"
                >
                    <Button
                        variant="secondary"
                        brightness="dim"
                        className="text-3xl p-2"
                    >
                        <Image
                            src={"/github-mark-white.svg"}
                            className="filter invert dark:invert-0 w-7 h-auto"
                            alt="github icon"
                            width={98}
                            height={96}
                        />
                    </Button>
                </Link>
            </div>
            {/* </Link> */}
            <Settings
                categories={categories}
                defaultOpen={true}
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
            />
        </div>
    );
}
