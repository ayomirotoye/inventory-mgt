import HomeContainer from "../containers/Home";
import PrimaryButton from "../components/buttons/PrimaryButton";

export default function Home({}: any) {
  return (
    <HomeContainer>
      <div className="inline-flex">
        <button className="w-96 font-bold bg-primary-500 text-black rounded-r border-0 cursor-pointer">
          GreyStock
        </button>
        <button className="w-96 font-bold bg-primary-500 text-black rounded-r border-0 cursor-pointer">
          Stock
        </button>
        <button className="w-full font-bold bg-primary-500 text-black rounded-r border-0 cursor-pointer">
          Non-Stock
        </button>
        <button className="w-64 font-bold bg-primary-500 text-black rounded-r border-0 cursor-pointer">
          Stock
        </button>
      </div>
      {/* <div className="flex justify-center">
        <PrimaryButton
          buttonText="Accounts"
          extraDivStyles="w-full md:w-1/6 my-2"
          // onClicked={handleAddNewUser}
        />
      </div>
      <div className="flex justify-end">
        <PrimaryButton
          buttonText="Accounts"
          extraDivStyles="w-full md:w-1/6 my-2"
          // onClicked={handleAddNewUser}
        />
      </div> */}
    </HomeContainer>
  );
}
