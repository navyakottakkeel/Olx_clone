import { Modal, ModalBody } from "flowbite-react";
import React from "react";
import close from "../../assets/close.svg";
import google from "../../assets/google.png";
import { useAuth } from "../../context/AuthContext";

const Login = ({ toggleModal, status }) => {
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    const loggedInUser = await loginWithGoogle();
    if (loggedInUser) {
      toggleModal();
    }
  };

  return (
    <Modal
      show={status}
      onClose={toggleModal}
      size="md"
      popup
      position="center"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={toggleModal}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition hover:bg-gray-100"
        >
          <img src={close} alt="Close" className="w-5" />
        </button>

        {/* Top section */}
        <div className="px-8 pt-12 pb-5 text-center">
          <h2 className="text-2xl font-bold text-[#002f34]">Welcome to OLX</h2>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue buying and selling near you.
          </p>
        </div>

        <ModalBody className="bg-white">
          <div className="px-2 pb-6">
            {/* Google Login */}
            <div
              onClick={handleGoogleLogin}
              className="relative flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white transition hover:bg-gray-50 hover:shadow-sm"
            >
              <img src={google} alt="Google" className="w-6 absolute left-4" />

              <p className="text-sm font-semibold text-gray-700">
                Continue with Google
              </p>
            </div>

            {/* OR */}
            <div className="flex items-center gap-3 py-5">
              <div className="h-px flex-1 bg-gray-200"></div>

              <span className="text-xs font-medium text-gray-400">OR</span>

              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            {/* Email Login */}
            <p className="text-center font-bold text-sm underline underline-offset-4 cursor-pointer">
              Login with email
            </p>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default Login;
