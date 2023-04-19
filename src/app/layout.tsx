import GlobalContextProvider from "@/components/GlobalContext";
import "./globals.css";

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
                </main>
            </body>
        </html>
    );
}
