import MenuBar from "@/components/MenuBar/MenuBar";

export default function Main() {
  return (
    <>
      <MenuBar />
      <main className="flex content-center items-center">
        <form>
          <h1>Welcome to HELL!</h1>
          <p>
            In order to have access to this website, you need an Inorog Accout!
          </p>
          <div>
            <p>Get an account!</p>
            <p>Log In</p>
          </div>
        </form>
      </main>
    </>
  );
}
