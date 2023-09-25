export default () => {
  return (
    <>
      <div className="flex justify-center1 flex-col text-center border border-red-800 rounded-xl absolute bg-dark-matters-here">
        <h1 className="bg-red-800 rounded-tr-xl rounded-tl-xl animate-pulse">
          ⚠️ Welcome to HELL!
        </h1>
        <p className="m-4">
          In order to have access to this website, you need an Inorog Accout!
        </p>
        <div className="flex flex-row justify-evenly ">
          <p className="m-2 p-2 border-transparent border hover:border-red-600 transition-all rounded-xl">
            Get an account! 🔥
          </p>
          <p className="m-2 p-2 border-transparent border hover:border-red-600 transition-all rounded-xl">
            Log In 🩸
          </p>
        </div>
      </div>
    </>
  );
};
