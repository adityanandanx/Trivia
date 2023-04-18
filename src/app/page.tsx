import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-7xl font-black">Trivia</h1>

            <Link href="/random-question" autoFocus className="outline-none">
                <Button
                    variant="secondary"
                    className="px-10 opacity-50 hover:opacity-100 transition-opacity"
                >
                    Tap here to start
                </Button>
            </Link>
        </div>
    );
}
