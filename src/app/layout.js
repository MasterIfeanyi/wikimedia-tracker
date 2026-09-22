import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Wikimedia Contributions",
  description: "A tracker of my open-source contributions across Wikimedia projects like Wikinewsie and WikiEduDashboard.",
  openGraph: {
    title: "My Wikimedia Open-Source Work",
    description: "A tracker of my open-source contributions across Wikimedia projects like Wikinewsie and WikiEduDashboard.",
    images: [
      {
        url: "/wikimedia-og.png",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
