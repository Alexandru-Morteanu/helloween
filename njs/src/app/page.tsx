import MenuBar from "@/components/MenuBar";
import NotLoggedIn from "@/components/NotLoggedIn";

export default function Main() {
  return (
    <>
      <MenuBar />
      <main className="flex justify-center">
        <NotLoggedIn />
      </main>
    </>
  );
}
