import GlobalContextProvider from "@/components/GlobalContext";
import "./globals.css";
import Link from "next/link";
import { AiTwotoneHeart } from "react-icons/ai";

export const metadata = {
    title: "Trivia",
    description: "Trivia app made with Next js 13 and Open Trivia API",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html className="w-full h-full" lang="en">
            <body className="relative w-full h-full min-h-screen bg-gradient-radial dark:to-zinc-900 dark:from-green-900 from-zinc-50 to-green-100 dark:text-zinc-50 text-zinc-900">
                <main className="px-5 md:px-0 max-w-3xl mx-auto w-full h-full flex flex-col gap-3 justify-center items-center">
                    <GlobalContextProvider>{children}</GlobalContextProvider>
                    <Link
                        className="absolute text-center bottom-0 py-3 text-xs text-zinc-900 dark:text-zinc-50 hover:opacity-100 opacity-50 transition-opacity"
                        href={"https://github.com/iMADi-ARCH"}
                        target="_blank"
                    >
                        Made with{" "}
                        <AiTwotoneHeart className="inline animate-lubDub text-red-500" />
                        <br /> by Aditya Nandan
                    </Link>
                </main>
            </body>
        </html>
    );
}
