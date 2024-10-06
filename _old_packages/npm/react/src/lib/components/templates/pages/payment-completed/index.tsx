import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useAkello } from "@akello/react-hook";
import { useEffect } from "react";

export const PaymentCompleted = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const akello = useAkello();
  const session_id = searchParams.get('session_id');

  useEffect(() => {

  }, [])

  return (
    <div className="">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
            Congrats!
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 ">
          Your monthly subscription to Akello’s Individual Plan is now confirmed, and you can start unlocking the full potential of Akello today. Your card will be charged the monthly subscription rate on the first of each month, and you are free to cancel at any time. If you have any questions or need assistance, our support team is here to help.
          </p>
        </div>
      </div>
    </div>
  );

}

