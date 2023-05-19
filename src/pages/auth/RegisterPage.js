import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Register from "../../sections/auth/Register";
import { getRegistedUser } from "../../services/user";

export default function RegisterPage() {
  const { registeredToken } = useParams();
  const [registedUser, setRegisteredUser] = useState();
  const [existsError, setExistsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getRegisteredUserByToken = async () => {
      const user = await getRegistedUser(registeredToken);

      if (user.errorMessage) {
        setExistsError(true);
        setError(user.errorMessage);
      }

      setRegisteredUser(user);
    };

    getRegisteredUserByToken();
  }, []);

  return (
    <>
      <Helmet>
        <title> Registro | Plan de Clases</title>
      </Helmet>

      <Register
        user={registedUser}
        errorMessage={error}
        existsError={existsError}
        registeredToken={registeredToken}
      />
    </>
  );
}
