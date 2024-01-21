import Link from "next/link";

const NavBar = () => {
  return (
    <div className="h-20 border-b-2 flex items-center justify-between sticky top-0 z-50 bg-white transition-transform">
      <Link href="/" className="font-bold max-md:hidden text-2xl pl-10">
        Alabere Integrity Structured Solutions
      </Link>
      <Link href="/" className="ml-2 font-bold md:hidden text-2xl">
        A I S S
      </Link>
      <div className="max-sm:mr-2 sm:mr-10 flex gap-3 links text-base">
        <Link href="/">Home</Link>
        <Link href="/jobs">Job-Orders</Link>
        <Link href="/form">Create-Job</Link>
      </div>
    </div>
  );
};

export default NavBar;
