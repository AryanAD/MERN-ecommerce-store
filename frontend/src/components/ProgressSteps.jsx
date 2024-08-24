import { ImCheckmark } from "react-icons/im";

const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
    <div className="flex items-center justify-center mt-10 mb-5 space-x-4">
      <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
        <span className="flex items-center justify-center gap-1 px-4 py-2 text-green-500 bg-green-100 rounded-full">
          Login <ImCheckmark />
        </span>
        {/* <div className="mt-2 text-lg text-center">✅</div> */}
      </div>

      {step2 && (
        <>
          {step1 && <div className="h-0.5 w-[10rem] bg-green-500"></div>}
          <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
            <span className="flex items-center justify-center gap-1 px-4 py-2 text-green-500 bg-green-100 rounded-full">
              Shipping <ImCheckmark />
            </span>
            {/* <div className="mt-2 text-lg text-center">✅</div> */}
          </div>
        </>
      )}

      {step1 && step2 && step3 ? (
        <div className="h-0.5 w-[10rem] bg-green-500"></div>
      ) : (
        <div className={`${step3 ? "text-green-500" : "text-gray-5  00"}`}>
          <span
            className={`${
              !step3
                ? "ml-[10rem]"
                : "flex items-center justify-center gap-1 px-4 py-2 text-green-500 bg-green-100 rounded-full"
            }`}
          >
            Summary <ImCheckmark />
          </span>
          {step1 && step2 && step3 ? (
            <div className="mt-2 text-lg text-center">✅</div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressSteps;
