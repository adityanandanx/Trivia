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

    useEffect(() => {
        getCategories().then((cats) => {
            setCategories(cats);
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-7xl font-black">Trivia</h1>

            <Link href="/random-question" autoFocus className="outline-none">
                <Button variant="secondary" brightness="dim" className="px-10">
                    Tap here to start
                </Button>
            </Link>

            {/* <Link href="/settings" className="outline-none"> */}

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
                            className="filter invert dark:invert-0"
                            alt="github icon"
                            width={28}
                            height={28}
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
