"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { MdSettings } from "react-icons/md";
import { useEffect, useState } from "react";
import Settings from "@/components/ui/Settings";
import { getCategories } from "@/lib/utils";
import { Category } from "@/lib/types";

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
            <Button
                onClick={() => setSettingsOpen(true)}
                variant="secondary"
                brightness="dim"
                className="text-3xl absolute p-2 m-3 top-0 right-0"
            >
                <MdSettings />
            </Button>
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
