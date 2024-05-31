import Image from "next/image";
import { ConnectButton, useActiveAccount, useConnect } from "thirdweb/react";
import thirdwebIcon from "@public/logo.jpg";
import { chain, client } from "./client";
import { LoginPayload } from "thirdweb/auth";
import { useEmail } from "../../ulti/customHook/useEmail";
import Login, { PDFEditor } from "./user/login";
import Loading, { CoolEffect } from "../../ulti/component";

export default function Home() {
  return (
    <main className="p-4 pb-10 min-h-[100vh] container max-w-screen-lg mx-auto">
      <div className="">
        <Header />
        <Login />
        {/* <PDFEditor texts={['Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam', 'Hiệu trưởng trường đại học quy nhơn', 'Bằng cử nhân', 'công nghệ thông tin', 'Ông ĐẶNG TRUNG HIẾU', 'Ngày 07 tháng 5 năm 2000', '2024', 'Giỏi', 'Chính Quy', 'Bình Định', ' ngày 30 tháng 7 năm 2024', ' PGS.TS Đỗ Ngọc Mỹ', '0012034', '17.2.101.36.003']} /> */}
      </div>
    </main >
  );
}

export function CustomConnectButton() {
  return (
    <ConnectButton
      client={client}
      chain={chain}
      connectModal={{
      }}
      appMetadata={{
        name: "Example App",
        url: "https://example.com",
      }}
    />
  )
}

function Header() {
  return (
    <header className="flex items-end mb-10">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[80px] "
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="pl-6 text-4xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        Certificate Management
        <span className="text-zinc-300 inline-block mx-1"> </span>
        <span className="inline-block -skew-x-6 text-blue-500"> QNU-B </span>
      </h1>

      <div className="pl-10 pb-4">
        <CoolEffect>
          <CustomConnectButton />
        </CoolEffect>
      </div>
    </header>
  );
}

function ArticleCard(props: {
  title: string;
  href: string;
  description: string;
}) {
  return (
    <a
      href={props.href + "?utm_source=next-template"}
      target="_blank"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </a>
  );
}
