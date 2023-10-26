import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import '../globals.css';

export const metadata = {
    'title': 'Threads',
    'description': 'I am creating a thread App using Next.js 13'
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={`${inter.className} bg-dark-1`}>
                <ClerkProvider>
                    {children}
                </ClerkProvider>
            </body>
        </html>
    );
}
